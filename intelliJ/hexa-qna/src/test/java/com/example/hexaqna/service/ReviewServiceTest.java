package com.example.hexaqna.service;

import com.example.hexaqna.dto.ReviewDTO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class ReviewServiceTest {

    @Autowired private ReviewService reviewService;

    @Test
    void 리뷰400개저장() {
        String[] subjectList = {"이번 딜 정말 싸게 산거 같아요", "중고 상품이지만 만족합니다", "해외 배송이라고 알고 있는데, 생각보다 엄청 빠르네요", "싸게 잘 샀습니다. 나중에 가치가 오르길 기대 해요", "드디어 구했네요!! 그동안 엄청 찾아 다녔어요", "HEXACEPS 각성하라!! 너무 가격이 착하다!!"};
        String[] replyList = {"감사합니다 고객님!!", "앞으로도 자주 찾아주세요 :)", "다음달에 더 많은 상품을 섭외 하겠습니다", "항상 고객님을 위한 HEXACEPS가 되겠습니다"};
        for (int i = 11; i < 31; i++) { // 멤버
            for (int j = 21; j < 41; j++) { // 상품
                Random random = new Random();
                ReviewDTO reviewDTO =  ReviewDTO.builder()
                        .subject(subjectList[random.nextInt(subjectList.length)])
                        .reply(replyList[random.nextInt(replyList.length)])
                        .productId((long)j)
                        .memberId((long)i)
                        .starRating((int)(Math.random()*5) + 1) // 별점
                        .uploadPicture("sampleReviewImage_00"+j+".jpg")
                        .createAt(LocalDateTime.now())
                        .build();

                try {
                    reviewService.createReview(reviewDTO, null);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}