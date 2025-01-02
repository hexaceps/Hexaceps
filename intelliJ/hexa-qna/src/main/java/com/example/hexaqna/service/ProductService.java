package com.example.hexaqna.service;

import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.dto.PageResponseDTO;
import com.example.hexaqna.dto.ProductDTO;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ProductService {
    // 상품리스트
    PageResponseDTO<ProductDTO> getProductList(PageRequestDTO pageRequestDTO);

    PageResponseDTO<ProductDTO> getProductFiterList(PageRequestDTO pageRequestDTO, String category);

    // 상품추가
    Long registerNewProduct(ProductDTO productDTO);

    // 상품 추가 제대로 안되면, 아래 사용
    @Transactional
    Long addNewProduct(ProductDTO productDTO);

    // 조회기능
    ProductDTO getProductById(Long productId);

    // 수정하기
    void modify(ProductDTO productDTO);

    // 삭제하기
    void remove(Long productId);
}
