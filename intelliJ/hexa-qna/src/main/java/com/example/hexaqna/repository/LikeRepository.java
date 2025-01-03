package com.example.hexaqna.repository;

import com.example.hexaqna.domain.Like;
import com.example.hexaqna.dto.LikeDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    // 특정 사용자 ID로 찜 목록 조회
    @Query("select new com.example.hexaqna.dto.LikeDTO(l.likeId, l.member.id, l.product.productId, l.count)" +
            " from Like l" +
            " where l.member.id = :memberId" +
            " order by l.likeId desc ")
    List<LikeDTO> findByMemberId(@Param("memberId") Long memberId);

    // 특정 사용자와 상품의 찡 상태 확인
    @Query("select l from Like l where l.product.productId = :productId and l.member.id = :memberId")
    Optional<Like> findByProductIdAndMemberId(@Param("productId") Long productId, @Param("memberId") Long memberId);

    // 특정 상품의 카운트 확인
    @Query("select count(l.product.productId) " +
            " from Like l " +
            " where l.product.productId = :productId")
    int countByProductId(@Param("productId") Long productId);
}