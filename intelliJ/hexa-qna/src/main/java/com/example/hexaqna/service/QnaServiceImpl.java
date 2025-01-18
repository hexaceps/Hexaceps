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
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
        qna.setProductId(dto.getProductId());
        qna.setMemberId(dto.getMemberId());
        qna.setQnaDate(LocalDateTime.now());
        qna.setReply("");
        qna.setReplyAt(0);
        Qna result = qnaRepository.save(qna);
        return result.getQno();
    }


    @Override
    public void registerR(QnaDTO dto) {
        Optional<Qna> reply = qnaRepository.findById(dto.getQno());

        Qna qna = reply.orElseThrow();
        qna.setReply(dto.getReply());
        qna.setReplyAt(1);
        qna.setReplyDate(LocalDateTime.now());
        qna.setReplyId("관리자");


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
        qna.setReplyAt(dto.getReplyAt());
        qna.setReplyDate(dto.getReplyDate());
        qna.setQnaDate(dto.getQnaDate());

        qnaRepository.save(qna);
    }


    @Override
    public void remove(Long qno) {
        qnaRepository.deleteById(qno);
    }


    @Override
    public PageResponseDTO<QnaDTO> getlist(PageRequestDTO pageRequestDTO, Long productId) {

        //가져온다, Qna의 리스트
        Page<Qna> result = qnaRepository.findByProductProductID(productId,
                PageRequest.of(pageRequestDTO.getPage() - 1,
                        pageRequestDTO.getSize(), Sort.by("qnaDate").descending()));

        log.info("값은? {}",result);
        List<QnaDTO> dtoList = result.getContent().stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
        log.info("값은? {}",dtoList);
        return PageResponseDTO.<QnaDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(result.getTotalElements())
                .build();
    }





    @Override
    public PageResponseDTO<QnaDTO> getlistId(PageRequestDTO pageRequestDTO, Long id) {

        //가져온다, Qna의 리스트
        Page<Qna> result = qnaRepository.findByMemberID(id,
                PageRequest.of(pageRequestDTO.getPage() - 1,
                        pageRequestDTO.getSize(), Sort.by("qnaDate").descending()));

        log.info("값은? {}",result);
        List<QnaDTO> dtoList = result.getContent().stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
        log.info("값은? {}",dtoList);
        return PageResponseDTO.<QnaDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(result.getTotalElements())
                .build();
    }
}
