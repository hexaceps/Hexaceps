package com.example.hexaqna.controller;


import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.Product;
import com.example.hexaqna.domain.Qna;
import com.example.hexaqna.dto.*;
import com.example.hexaqna.repository.HexaMemberRepository;
import com.example.hexaqna.repository.ProductRepository;
import com.example.hexaqna.repository.QnaRepository;
import com.example.hexaqna.service.MemberService;
import com.example.hexaqna.service.QnaService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/qna")
public class QnaController {

    private final QnaService qnaService;
    private final QnaRepository qnaRepository;
    private final HexaMemberRepository memberRepository;
    private final ProductRepository productRepository;

    //조회
    //http://localhost:8080/api/qna/1
    @GetMapping("/{qno}")
    public QnaDTO get(@PathVariable("qno") Long qno) {
        return qnaService.get(qno);
    }



    //멤버별리스트
    @GetMapping("/idList/{id}")
    public PageResponseDTO<QnaDTO> listId(PageRequestDTO pageRequestDTO,
                                          @PathVariable("id") Long id) {
        log.info("list...{}", pageRequestDTO);
        return qnaService.getlistId(pageRequestDTO,id);
    }


    //상품별리스트
    @GetMapping("/list/{productId}")
    public PageResponseDTO<QnaDTO> list(PageRequestDTO pageRequestDTO,
                                        @PathVariable("productId") Long productId) {
        log.info("list...{}", pageRequestDTO);
        return qnaService.getlist(pageRequestDTO,productId);
    }





    //post방식 - json형식으로 받고 return타입을 json형식으로 해줘야 한다.

    @PostMapping("/q/{productId}/{id}")
    public Map<String, Long> registerQ(@PathVariable("productId") Long productId, @PathVariable("id") Long id,
                                       @RequestBody QnaDTO qnaDTO){
    try{
        log.info("QnaDTO {}", qnaDTO);
        HexaMember member = memberRepository.findById(id).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();
        log.info("member {}",member);
        log.info("product {}",product);
        qnaDTO.setProductId(product);
        qnaDTO.setMemberId(member);
        Long qno = qnaService.registerQ(qnaDTO);
        return Map.of("QNO", qno);
    } catch (Exception e) {
        log.error("Error during Qna registration", e);
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Server error", e);
    }
    }







    //post방식 - json형식으로 받고 return타입을 json형식으로 해줘야 한다.


    @PutMapping("/r/{qno}")
    public Map<String, Long> registerR( @PathVariable("qno") Long qno,
                                        @RequestBody QnaDTO qnaDTO){
        Qna qna = qnaRepository.findById(qno).orElseThrow();  // This fetches the entity immediately
        log.info("기존멤버보기  {}",qna);
        qnaDTO.setMemberId(qna.getMemberId());
        qnaDTO.setProductId(qna.getProductId());

        qnaDTO.setQno(qno);

        qnaService.registerR(qnaDTO);
        return Map.of("QNO", qno);
    }





    //수정, put방식으로 처리, 결과는 json으로
    @PutMapping("/{qno}")
    public Map<String, String> modify(@PathVariable("qno") Long qno, @RequestBody QnaDTO qnaDTO) {
        //수정하기 전 안전하게 qno값을 넣어준다.
        qnaDTO.setQno(qno);
        log.info("수정 {}", qnaDTO);
        qnaService.modify(qnaDTO);
        return Map.of("RESULT","SUCCESS");
    }

    //삭제
    @DeleteMapping("/{qno}")
    public Map<String, String> remove(@PathVariable("qno") Long qno) {
        log.info("삭제 {}", qno);
        qnaService.remove(qno);
        return Map.of("RESULT", "SECCESS");
    }


    @PostMapping("/checkPw/{qno}")
    public Map<String, String> pwCheck(@PathVariable("qno") Long qno ,@RequestBody PwForm pwForm) {
        log.info("Attempting login for {}", pwForm.getPassword());
        Qna qna = qnaRepository.findById(qno).orElseThrow();
        boolean isAuthenticated = (qna.getPassword().equals(pwForm.getPassword()));

        if (isAuthenticated) {
            log.info("비번 같음 {}", pwForm.getPassword());
            return Map.of("success", "success");
        } else {
            log.warn("비번 다름 {}", pwForm.getPassword());
            return Map.of("error", "error");
        }
        }
    }

