package com.example.hexaqna.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class LikeServiceTest {

    @Autowired private LikeService likeService;
    @Test
    void 좋아요추가() {
        for (int i = 51; i < 55; i++) {
            Long memberId = (long) i;
            for (int j = 91; j < 105; j++) {
                Long productId = (long) j;
                likeService.addLike(memberId, productId);
            }
        }
    }
}