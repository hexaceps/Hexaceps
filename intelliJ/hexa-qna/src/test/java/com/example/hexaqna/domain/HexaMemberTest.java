package com.example.hexaqna.domain;

import com.example.hexaqna.repository.HexaMemberRepository;
import com.example.hexaqna.repository.ProductRepository;
import com.example.hexaqna.repository.QnaRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

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
    @Autowired
    PasswordEncoder passwordEncoder;


    @Test
    void qna추가하기(){
        HexaMember member = MemberRepository.getById(1l);
        Product product = productRepository.getById(1l);
        Qna qna = Qna.builder()
                .memberId(member)
                .productId(product)
                .subject("1111")
                .content("1111")
                .password("1111")
                .secret(1)
                .qnaDate(LocalDateTime.now())
                .replyId("관리자")
                .replyAt(0)
                .build();
        qnaRepository.save(qna);
    }


    @Test
    void 추가하기 () {

        HexaMember hexaMember = HexaMember.builder()
                .email("admin@hexa.com")
                .name("master")
                .password(passwordEncoder.encode("1234"))
                .phoneNumber("1234-1234")
                .address("뉴욕")
                .newsletter(0)
                .socialYn(0)
                .nickname("master")
                .activateYn("Y")
                .rank("9")
                .create_Date(LocalDateTime.now())
                .build();
        hexaMember.addRole(MemberRole.USER);
        hexaMember.addRole(MemberRole.ADMIN);
        hexaMember.addRole(MemberRole.MANAGER);
        MemberRepository.save(hexaMember);
    }


}