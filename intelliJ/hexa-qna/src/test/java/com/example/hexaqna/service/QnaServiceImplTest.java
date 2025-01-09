package com.example.hexaqna.service;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.Product;
import com.example.hexaqna.dto.QnaDTO;
import com.example.hexaqna.repository.HexaMemberRepository;
import com.example.hexaqna.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class QnaServiceImplTest {

    @Autowired private QnaService qnaService;
    @Autowired private HexaMemberRepository hexaMemberRepository;
    @Autowired private ProductRepository productRepository;

    @Test
    void QNA생성하기() {
        Optional<HexaMember> member = hexaMemberRepository.findById(2L);
        Optional<Product> product = productRepository.findById(160L);
        QnaDTO qnaDTO = QnaDTO.builder()
                .qnaDate(LocalDateTime.now())
                .memberId(member.get())
                .productId(product.get())
                .subject("포장이 엉망인데요??")
                .content("이걸 판다고?? 뷁")
                .password("1111")
                .secret(1)
                .qnaDate(LocalDateTime.now())
                .replyAt(0)
                .build();

        qnaService.registerQ(qnaDTO);

    }
}