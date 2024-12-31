package com.example.hexaqna.service;

import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.dto.PageResponseDTO;
import com.example.hexaqna.dto.ProductDTO;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ProductService {
    //상품리스트
    PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO);

    //상품추가
    Long register(ProductDTO productDTO);

    //조회기능
    ProductDTO get(Long pno);

    //수정하기
    void modify(ProductDTO productDTO);

    //삭제하기
    void remove(Long pno);
}
