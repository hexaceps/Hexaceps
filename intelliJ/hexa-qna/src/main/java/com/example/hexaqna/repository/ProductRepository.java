package com.example.hexaqna.repository;

import com.example.hexaqna.domain.Product;
import com.example.hexaqna.repository.search.ProductSearch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductRepository extends JpaRepository <Product, Long> , ProductSearch {
    //상품조회
    @EntityGraph(attributePaths = "imageList")  //같이 처리하고 싶은 것
    @Query("select p from Product p where p.pno = :pno")
    Optional<Product> selectOne(@Param("pno") Long pno);


    //상품목록이 나올때 이미지도 같이 나와야 한다.
    //selectList
    @Query("select p, pi from Product p left join p.imageList pi where pi.ord = 0")
    Page<Object[]> selectList(Pageable pageable);
}
