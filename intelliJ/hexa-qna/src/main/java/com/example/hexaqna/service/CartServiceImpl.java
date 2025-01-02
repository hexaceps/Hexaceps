package com.example.hexaqna.service;

import com.example.hexaqna.domain.Cart;
import com.example.hexaqna.domain.Product;
import com.example.hexaqna.dto.CartDTO;
import com.example.hexaqna.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;

    @Override
    public List<CartDTO> addOrModify(CartDTO cartDTO) {
        if (cartDTO.getMemberId() == null || cartDTO.getProductId() == null) {
            throw new IllegalArgumentException("Invalid data: Member or Product cannot be null");
        }
        Long memberId = cartDTO.getMemberId().getId(); // 수정된 getter 사용
        Long productId = cartDTO.getProductId().getProductId();// 수정된 getter 사용

        // Product 정보 조회
        Product product = cartRepository.getProductById(productId);
        if (product == null) {
            throw new IllegalArgumentException("Product not found for ID: " + productId);
        }

        // CartDTO에 size와 category 추가 (Product에서 값 가져오기)
        cartDTO.setSize(Integer.parseInt(product.getSize()));
        cartDTO.setCategory(product.getCategory());

        Cart cart = cartRepository.getItemOfProductId(memberId, productId);

        if (cart == null) {
            // 새로운 Cart 생성
            cart = toEntity(cartDTO);
            cartRepository.save(cart);
        } else {
            // 기존 Cart 수정
            cart.setAmount(cartDTO.getAmount());
            cart.setSize(cartDTO.getSize());
            cart.setCategory(cartDTO.getCategory());
            cartRepository.save(cart);
        }

        return getCartItems(memberId);
    }

    private Cart toEntity(CartDTO dto) {
        return Cart.builder()
                .cartId(dto.getCartId())
                .memberId(dto.getMemberId()) // HexaMember 객체 필요
                .productId(dto.getProductId()) // Product 객체 필요
                .category(dto.getCategory()) // Product 객체 필요
                .amount(dto.getAmount())
                .size(dto.getSize())
                .regAt(dto.getRegAt() != null ? dto.getRegAt() : LocalDate.now())
                .build();
    }

    //모든 장바구니 아이템 목록
    @Override
    public List<CartDTO> getCartItems(Long memberId) {
        return cartRepository.getItemsOfCartDTOByMemberId(memberId);
    }

    //아이템 삭제
    @Override
    public List<CartDTO> remove(int cartId){
        Long cartIdLong = (long) cartId;
        if (!cartRepository.existsById(cartIdLong)) {
            throw new IllegalArgumentException("Cart not found for ID: " + cartId);
        }

        cartRepository.deleteById(cartIdLong);
        return cartRepository.getItemsOfCartDTOByMemberId(cartIdLong);
    }
}
