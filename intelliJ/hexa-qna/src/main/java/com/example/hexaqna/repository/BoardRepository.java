package com.example.hexaqna.repository;

import com.example.hexaqna.domain.Board;
import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.dto.BoardDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    // 카테고리 별 게시판 검색
    Page<Board> findByCategory(String category, Pageable pageable);

    // 제목 또는 내용 검색 (category param 추가 해서 뷰단에서 고정으로 구현 해야됨)
    @Query("select b from Board b where b.category = :category and (b.title like  %:keyword% or b.content like %:keyword%)")
    Page<Board> searchByCategoryAndKeyword(@Param("category") String category, @Param("keyword") String keyword, Pageable pageable);

    // 조회수 증가
    @Modifying
    @Query("update Board b set b.count = b.count + 1 where b.id = :id")
    void incrementCount(@Param("id") Long id);

    // 키워드 검색 및 필터링
    @Query("SELECT b FROM Board b " +
            "WHERE (b.title LIKE %:keyword% OR b.content LIKE %:keyword% OR b.tags LIKE %:keyword%) " +
            "AND (:category IS NULL OR b.category = :category) " +
            "AND (:isActive IS NULL OR b.isActive = :isActive)")
    List<BoardDTO> searchWithFilters(
            @Param("keyword") String keyword,
            @Param("category") String category,
            @Param("isActive") Boolean isActive
    );

    @Query("SELECT m FROM HexaMember m WHERE m.id = :memberId")
    HexaMember getMemberById(@Param("memberId") Long memberId);
}