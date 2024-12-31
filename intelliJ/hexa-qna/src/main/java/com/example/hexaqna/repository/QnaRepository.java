package com.example.hexaqna.repository;

import com.example.hexaqna.domain.Qna;
import com.example.hexaqna.repository.search.QnaSearch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QnaRepository extends JpaRepository<Qna, Long>, QnaSearch {
    @Query("SELECT q FROM Qna q WHERE q.product_id.pno = :pno")
    Page<Qna> findByProductPno(@Param("pno") Long pno, Pageable pageable);
}
