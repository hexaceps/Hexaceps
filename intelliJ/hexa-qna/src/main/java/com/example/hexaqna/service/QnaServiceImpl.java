package com.example.hexaqna.service;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.Qna;
import com.example.hexaqna.dto.MemberDTO;
import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.dto.PageResponseDTO;
import com.example.hexaqna.dto.QnaDTO;
import com.example.hexaqna.repository.QnaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class QnaServiceImpl implements QnaService {

    private final QnaRepository qnaRepository;


    @Override
    public QnaDTO get(Long qno) {
        Optional<Qna> result = qnaRepository.findById(qno);
        Qna qna = result.orElseThrow();
        return entityToDTO(qna);
    }

    @Override
    public QnaDTO getPno(Long qno) {
        Optional<Qna> result = qnaRepository.findById(qno);
        Qna qna = result.orElseThrow();
        return entityToDTO(qna);
    }


    @Override
    public Long registerQ(QnaDTO dto) {
        Qna qna = dtoToEntity(dto);
        qna.setProduct_id(dto.getProduct_id());
        qna.setMember_id(dto.getMember_id());
        qna.setQna_Date(LocalDateTime.now());
        qna.setReply("");
        qna.setReply_at(0);
        Qna result = qnaRepository.save(qna);
        return result.getQno();
    }


    @Override
    public void registerR(QnaDTO dto) {
        Optional<Qna> reply = qnaRepository.findById(dto.getQno());

        Qna qna = reply.orElseThrow();
        qna.setReply(dto.getReply());
        qna.setReply_at(1);
        qna.setReply_Date(LocalDateTime.now());
        qna.setReply_id("관리자");


        qnaRepository.save(qna);
    }


    @Override
    public void modify(QnaDTO dto) {
        Optional<Qna> result = qnaRepository.findById(dto.getQno());

        Qna qna = result.orElseThrow();

        qna.setSubject(dto.getSubject());
        qna.setContent(dto.getContent());
        qna.setPassword(dto.getPassword());
        qna.setSecret(dto.getSecret());
        qna.setReply(dto.getReply());
        qna.setReply_at(dto.getReply_at());
        qna.setReply_Date(dto.getReply_Date());
        qna.setQna_Date(dto.getQna_Date());

        qnaRepository.save(qna);
    }


    @Override
    public void remove(Long qno) {
        qnaRepository.deleteById(qno);
    }


    @Override
    public PageResponseDTO<QnaDTO> getlist(PageRequestDTO pageRequestDTO, Long pno) {

        //가져온다, Qna의 리스트
        Page<Qna> result = qnaRepository.findByProductPno(pno, PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(), Sort.by("qna_Date").descending()));

        List<QnaDTO> dtoList = result.getContent().stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());

        return PageResponseDTO.<QnaDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(result.getTotalElements())
                .build();
    }
}
