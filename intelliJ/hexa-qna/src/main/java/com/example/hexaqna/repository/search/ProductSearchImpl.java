package com.example.hexaqna.repository.search;


import com.example.hexaqna.domain.*;
import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.dto.PageResponseDTO;
import com.example.hexaqna.dto.ProductDTO;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.JPQLQuery;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;
import java.util.Objects;

@Slf4j
public class ProductSearchImpl extends QuerydslRepositorySupport implements ProductSearch {


    public ProductSearchImpl() {
        super(Product.class);
    }

    @Override
    public PageResponseDTO<ProductDTO> searchList(PageRequestDTO pageRequestDTO) {
        log.info("ProductSearchImpl? 동작하고 있어?");

        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("pno").descending()
        );
        QProduct product = QProduct.product;
        QProductImage productImage = QProductImage.productImage;
        QProductOption productOption = QProductOption.productOption;

        //jpql쿼리를 뽑는다. product로 부터 query를 뽑는다
        JPQLQuery<Product> query = from(product);

        //상품인데 이미지가 없을 수도 있으므로 leftjoin
        query.leftJoin(product.imageList, productImage);


        //where 조건 추가, 이미지는 0번째 것만 가져와
        query.where(productImage.ord.eq(0));
       // query.where(ProductImageURL..eq(0));

        //페이징처리
//        getQuerydsl().applyPagination(pageable,query);
        Objects.requireNonNull(getQuerydsl()).applyPagination(pageable, query);

//        List<Product> productList1 = query.fetch();

//        만약 상품과 상품이미지를 뽑고 싶으면
        /*


        long count = query.fetchCount();

//        log.info("상품리스트1 {}", productList1);
//        log.info("상품리스트2 {}", productList2);
*/
        return null;

    }
}
