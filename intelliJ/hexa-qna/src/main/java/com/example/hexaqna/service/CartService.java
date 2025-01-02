package com.example.hexaqna.service;

import com.example.hexaqna.dto.CartDTO;

import java.util.List;

public interface CartService {
    public List<CartDTO> addOrModify(CartDTO cartDTO);

    public List<CartDTO> getCartItems(Long memberId);

    //아이템 삭제
    public List<CartDTO> remove(int cartId);
}

