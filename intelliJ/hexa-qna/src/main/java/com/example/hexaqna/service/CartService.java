package com.example.hexaqna.service;

import com.example.hexaqna.dto.CartDTO;

import java.util.List;

public interface CartService {
    // 장바구니 추가, 변경
    List<CartDTO> addOrModify(CartDTO cartReqeustDTO);

    // 멤버로 장바구니 리스트 조회
    List<CartDTO> getCartItems(Long memberId);

    // 카트아이디로 장바구니 조회
    CartDTO getCartItem(Long cartId);

    // 장바구니 삭제
    List<CartDTO> remove(int cartId);
}

