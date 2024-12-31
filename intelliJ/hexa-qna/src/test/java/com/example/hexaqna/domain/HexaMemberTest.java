package com.example.hexaqna.domain;

import com.example.hexaqna.repository.HexaMemberRepository;
import com.example.hexaqna.repository.ProductRepository;
import com.example.hexaqna.repository.QnaRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j

class HexaMemberTest {

    @Autowired
    HexaMemberRepository MemberRepository;
    @Autowired
    QnaRepository qnaRepository;
    @Autowired
    ProductRepository productRepository;

    @Test
    void qna추가하기(){
        HexaMember member = MemberRepository.getById(3l);
        Product product = productRepository.getById(1l);
        Qna qna = Qna.builder()
                .member_id(member)
                .product_id(product)
                .subject("1111")
                .content("1111")
                .password("1111")
                .secret(1)
                .qna_Date(LocalDateTime.now())
                .reply_id("관리자")
                .reply_at(0)
                .build();
        qnaRepository.save(qna);
    }


    @Test
    void 추가하기 () {

        HexaMember hexaMember = HexaMember.builder()
                .email("admin@hexa.com")
                .name("master")
                .password("1234")
                .phoneNumber("1234-1234")
                .address("뉴욕")
                .newsletter(0)
                .social_yn(0)
                .nickname("master")
                .activate_yn("Y")
                .rank("9")
                .create_Date(LocalDateTime.now())
                .build();
        hexaMember.addRole(MemberRole.USER);
        hexaMember.addRole(MemberRole.ADMIN);
        hexaMember.addRole(MemberRole.MANAGER);
        MemberRepository.save(hexaMember);
    }


}