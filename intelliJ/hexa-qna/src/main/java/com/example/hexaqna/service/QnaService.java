package com.example.hexaqna.service;

import com.example.hexaqna.domain.Qna;
import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.dto.PageResponseDTO;
import com.example.hexaqna.dto.QnaDTO;

import java.time.LocalDateTime;

public interface QnaService {
    //조회기능
    QnaDTO get(Long qno);

    QnaDTO getPno(Long qno);

    //    등록하기
    Long registerQ(QnaDTO dto);
    void registerR(QnaDTO dto);

    //    수정하기
    void modify(QnaDTO dto);

    //    삭제하기
    void remove(Long qno);


    PageResponseDTO<QnaDTO> getlist(PageRequestDTO pageRequestDTO, Long productId);
    PageResponseDTO<QnaDTO> getlistId(PageRequestDTO pageRequestDTO, Long id);


    //java8버전부터는 default기능이 추가되어 기본기능을 설정해 줄 수 있다.
    //qna 엔티티를 DTO로 변환
    default QnaDTO entityToDTO(Qna qna){

        QnaDTO qnaDTO = QnaDTO.builder()
                .qno(qna.getQno())
                .memberId(qna.getMemberId())
                .subject(qna.getSubject())
                .content(qna.getContent())
                .password(qna.getPassword())
                .secret(qna.getSecret())
                .qnaDate(qna.getQnaDate())
                .reply(qna.getReply())
                .replyAt(qna.getReplyAt())
                .replyDate(qna.getReplyDate())
                .replyId(qna.getReplyId())
                .productId(qna.getProductId())
                .build();
        return qnaDTO;
    }

    //qna DTO를 엔티티로 변환
    default Qna dtoToEntity(QnaDTO qnaDTO){
        Qna qna = Qna.builder()
                .subject(qnaDTO.getSubject())
                .content(qnaDTO.getContent())
                .password(qnaDTO.getPassword())
                .secret(qnaDTO.getSecret())
                .qnaDate(LocalDateTime.now())
                .reply(qnaDTO.getReply())
                .replyAt(qnaDTO.getReplyAt())
                .replyId(" ")
                .build();
        return qna;
    }



}