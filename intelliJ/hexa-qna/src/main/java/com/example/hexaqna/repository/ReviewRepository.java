package com.example.hexaqna.repository;

import com.example.hexaqna.domain.Review;
import com.example.hexaqna.dto.ReviewDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    // 특정 사용자 ID 조회
    @Query("select new com.example.hexaqna.dto.ReviewDTO(r.reviewId, r.member.id, r.product.productId, r.subject, r.reply, r.starRating, r.createAt, r.uploadPicture)" +
            " from Review r" +
            " where r.member.id = :memberId" +
            " order by r.reviewId desc")
    List<ReviewDTO> getReviewByMemberId(@Param("memberId") Long memberId);

    // 특정 상품 ID 조회
    @Query("select new com.example.hexaqna.dto.ReviewDTO(r.reviewId, r.member.id, r.product.productId, r.subject, r.reply, r.starRating, r.createAt, r.uploadPicture)" +
            " from Review r" +
            " where r.product.productId = :productId" +
            " order by r.reviewId desc")
    List<ReviewDTO> getReviewByProductId(@Param("productId") Long productId);

}