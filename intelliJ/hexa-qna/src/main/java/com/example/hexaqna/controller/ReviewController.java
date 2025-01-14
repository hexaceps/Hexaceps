package com.example.hexaqna.controller;

import com.example.hexaqna.dto.ReviewDTO;
import com.example.hexaqna.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/product/review")
@RequiredArgsConstructor
@Slf4j
public class ReviewController {

    private final ReviewService reviewService;

    // 전체 리스트 호출
    @GetMapping("/list")
    public List<ReviewDTO> getReviewList() {
        log.info("getReviewList() 컨트롤러 호출");
        List<ReviewDTO> reviewDTOList = reviewService.getAllReviews();
        return reviewDTOList;
    }

    // 리뷰 조회 ? 쿼리로 reviewId, memberId, productId
    @GetMapping("/")
    public List<ReviewDTO> getReviewListById(@RequestParam(value = "reviewId", required = false) Long reviewId,
                                       @RequestParam(value = "memberId", required = false) Long memberId,
                                       @RequestParam(value = "productId", required = false) Long productId ) {
        log.info("getReviewListById() 컨트롤러 호출");
        log.info("받은 값 {memberId : "+memberId+", productId : "+productId+", reviewId : "+reviewId);
        if (reviewId != null && memberId == null && productId == null) { // ReviewId로 남긴 리뷰 전체 조회
            Optional<ReviewDTO> review = reviewService.getReviewById(reviewId);
            List<ReviewDTO> reviewDTOList = review.map(Collections::singletonList).orElseGet(Collections::emptyList);
            return reviewDTOList;
        } else if (memberId != null && reviewId == null && productId == null) { // MemberId로 남긴 리뷰 전체 조회
            List<ReviewDTO> reviewDTOList = reviewService.getReviewByMemberId(memberId);
            return reviewDTOList;
        } else if (productId != null && reviewId == null && memberId == null) { // ProductId로 남긴 리뷰 전체 조회
            List<ReviewDTO> reviewDTOList = reviewService.getReviewByProductId(productId);
            return reviewDTOList;
        } else {
            return Collections.emptyList(); // 빈 리스트로 리턴
        }
    }

    // 리뷰 생성
    @PostMapping("/") // 파일이름은 multipartFile 으로 필드값 넣을것
    public Map<String, Long> createReview(@ModelAttribute ReviewDTO reviewDTO,
                                          @RequestParam(value = "multipartFile", required = false) MultipartFile multipartFile) throws IOException {
        log.info("createReview() 컨트롤러 호출");
        log.info("memberID 조회 (컨트롤러에서) : "+ reviewDTO.getMemberId()+", productID : "+ reviewDTO.getProductId());
        ReviewDTO savedReviewDTO = reviewService.createReview(reviewDTO, multipartFile);
        Long reviewId = savedReviewDTO.getReviewId();

        return Map.of("result", reviewId);
    }

    //리뷰 수정(업데이트)
    @PutMapping("/{reviewId}")
    public ReviewDTO updateReview(@PathVariable("reviewId") Long reviewId,
                                                  @ModelAttribute ReviewDTO reviewDTO,
                                                  @RequestParam(value = "multipartFile", required = false)
                                                  MultipartFile multipartFile) throws IOException {
        log.info("updateReview() 컨트롤러 호출");
        ReviewDTO updatedReview = reviewService.updateReview(reviewId, reviewDTO , multipartFile);
        if(updatedReview == null) {
            return null;
        }
        return updatedReview;
    }

    //리뷰 삭제
    @DeleteMapping("/{reviewId}")
    public Map<String, String> deleteReview(@PathVariable("reviewId") Long reviewId) {
        log.info("deleteReview() 컨트롤러 호출");
        reviewService.removeReview(reviewId);
        return Map.of("result", "success");
    }
}
