package com.example.hexaqna.repository;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.Like;
import com.example.hexaqna.dto.LikeDTO;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    // 특정 사용자 ID로 찜 목록 조회
    @Query("select new com.example.hexaqna.dto.LikeDTO(" +
            "l.likeId, " +
            "l.member.id, " +
            "l.product.productId, " +
            "l.product.productName, " +
            "l.product.price, " +
            "l.count, " +
            "NULL) " + // 이미지 리스트는 나중에 처리
            "from Like l where l.member.id = :memberId")
    List<LikeDTO> findByMemberId(@Param("memberId") Long memberId);



    // 위에 사용자 ID로 찜 목록 조회 후 이미지 리스트를 가져 오기 위한 처리
    @Query("select pi.fileName from ProductImage pi where pi.product.productId = :productId")
    List<String> findImageFilesByProductId(@Param("productId") Long productId);




    // 특정 사용자와 상품의 찡 상태 확인
    @Query("select l from Like l where l.product.productId = :productId and l.member.id = :memberId")
    Optional<Like> findByProductIdAndMemberId( @Param("memberId") Long memberId , @Param("productId") Long productId);

    // 특정 상품의 카운트 확인
    @Query("select count(l.product.productId) " +
            " from Like l " +
            " where l.product.productId = :productId")
    int countByProductId(@Param("productId") Long productId);
}