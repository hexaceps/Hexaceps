package com.example.hexaqna.service;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.Product;
import com.example.hexaqna.domain.Review;
import com.example.hexaqna.dto.ReviewDTO;
import com.example.hexaqna.repository.HexaMemberRepository;
import com.example.hexaqna.repository.ProductRepository;
import com.example.hexaqna.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final HexaMemberRepository hexaMemberRepository;
    private final ProductRepository productRepository;
    private final String uploadDir = "upload/review";

    // 리뷰 작성하는 서비스 로직 (사진은 필수가 아닌 선택적으로 처리 함)
    public ReviewDTO createReview(ReviewDTO reviewDTO, @RequestParam(value = "multipartFile", required = false) MultipartFile multipartFile) throws IOException {
        Review reviewDAO = dtoToEntity(reviewDTO); // Dto > entity 변환
        reviewDAO.setCreateAt(LocalDateTime.now());

        // 업로드 사진 처리
        if(multipartFile != null && !multipartFile.isEmpty()) {
            String fileName = multipartFile.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, multipartFile.getBytes());
            reviewDAO.setUploadPicture(filePath.toString());
        } else {
            reviewDAO.setUploadPicture("nofile.png");
            log.info("시간이 없어서 파일은 안올리 거예요...");
        }

        Review saveReview = reviewRepository.save(reviewDAO);
        return  entityToDTO(saveReview);// entity > dto 변환하여 반환
    }

    // 전체 리뷰 조회
    public List<ReviewDTO> getAllReviews() {
        List<Review> reviewList = reviewRepository.findAll();
        List<ReviewDTO> reviewDTOList = new ArrayList<>();
        for (Review review : reviewList) {
            reviewDTOList.add(entityToDTO(review));
        }
        return reviewDTOList;
    }

    // MemberId로 남긴 리뷰 전체 조회
    public List<ReviewDTO> getReviewByMemberId(Long memberId) {
        return reviewRepository.getReviewByMemberId(memberId);
    }

    // ProductId로 남긴 리뷰 전체 조회
    public List<ReviewDTO> getReviewByProductId(Long productId) {
        return reviewRepository.getReviewByProductId(productId);
    }

    // Review Id로 조회
    public Optional<ReviewDTO> getReviewById(Long reviewId) {
        return reviewRepository.findById(reviewId).map(this::entityToDTO);
    }

    // 리뷰수정(업데이트)
    public ReviewDTO updateReview(Long id, ReviewDTO reviewDTO, @RequestParam(value = "multipartFile", required = false) MultipartFile multipartFile) throws  IOException {
        Optional<Review> reviewInfo = reviewRepository.findById(id);
        if(reviewInfo.isPresent()) {
            Review review = reviewInfo.get();
            // review.setSubject(reviewDTO.getSubject());
            review.setReply(reviewDTO.getReply());
            review.setCreateAt(LocalDateTime.now());

            // 업로도된 사진 처리
            if (multipartFile != null && !multipartFile.isEmpty()){
                String fileName = multipartFile.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, multipartFile.getBytes());
                review.setUploadPicture(filePath.toString());
            }

            Review updatedReview = reviewRepository.save(review);
            return  entityToDTO(updatedReview);
        }
        return null;
    }

    // 리뷰 삭제
    public void removeReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }

    // DTO > Entity 변환
    private Review dtoToEntity(ReviewDTO reviewDTO){
        log.info("멤버ID : ", hexaMemberRepository.findById(reviewDTO.getMemberId()).get());
        log.info("상품ID : ", productRepository.findById(reviewDTO.getProductId()).get());
        Review review = new Review();
        review.setMember(hexaMemberRepository.findById(reviewDTO.getMemberId()).get());
        review.setProduct(productRepository.findById(reviewDTO.getProductId()).get());
        review.setSubject(reviewDTO.getSubject());
        review.setReply(reviewDTO.getReply());
        review.setStarRating(reviewDTO.getStarRating());
        review.setCreateAt(reviewDTO.getCreateAt());
        review.setUploadPicture(reviewDTO.getUploadPicture());
        return review;
    }

    // Entity > DTO 변환
    private ReviewDTO entityToDTO(Review review){
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setReviewId(review.getReviewId());
        reviewDTO.setMemberId(review.getMember().getId());
        reviewDTO.setProductId(review.getProduct().getProductId());
        reviewDTO.setSubject(review.getSubject());
        reviewDTO.setReply(review.getReply());
        reviewDTO.setStarRating(review.getStarRating());
        reviewDTO.setCreateAt(review.getCreateAt());
        reviewDTO.setUploadPicture(review.getUploadPicture());
        return reviewDTO;
    }


}
