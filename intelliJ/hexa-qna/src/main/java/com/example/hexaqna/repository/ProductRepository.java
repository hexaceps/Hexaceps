package com.example.hexaqna.repository;

import com.example.hexaqna.domain.Product;
import com.example.hexaqna.repository.search.ProductSearch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductRepository extends JpaRepository <Product, Long> , ProductSearch {
    // 상품 조회
    @EntityGraph(attributePaths = "imageList")  // 같이 처리하고 싶은 것
    @Query("select p from Product p where p.productId = :productId")
    Optional<Product> selectOne(@Param("productId") Long productId);

    //
    @Query("select p, pi from Product p left join p.imageList pi where pi.ord = 0 and p.category = :category")
    Page<Object[]> selectFilter(@Param("category") String category, Pageable pageable);

    //상품목록이 나올때 이미지도 같이 나와야 한다. <-- http://localhost:8010/api/product/list 조회 사용 (올드)
    //selectList
    // @Query("select p, pi from Product p left join p.imageList pi where pi.ord = 0")
    // Page<Object[]> selectList(Pageable pageable);

    // 상품 조회 제대로 안될때
    @Query("select p from Product p join fetch p.imageList join fetch p.siteList where p.productId = :productId")
    Optional<Product> findByProductId(@Param("productId") Long productId);

    // /api/product/list 조회시에 사용할 상품 조회 쿼리 <-- http://localhost:8010/api/product/list 조회 사용 (뉴)
    @Query("select p, pi, sl from Product p" +
            " left join p.imageList pi" +
            " left join p.siteList sl")
    Page<Object[]> findBySelectImageAndSiteList (Pageable pageable);
}
