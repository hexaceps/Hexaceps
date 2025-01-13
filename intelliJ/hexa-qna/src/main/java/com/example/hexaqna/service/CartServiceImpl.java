package com.example.hexaqna.service;

import com.example.hexaqna.domain.Cart;
import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.Product;
import com.example.hexaqna.dto.CartDTO;
import com.example.hexaqna.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;

    @Override
    public List<CartDTO> addOrModify(CartDTO cartDTO) {
        if (cartDTO.getMemberId() == null || cartDTO.getProductId() == null) {
            throw new IllegalArgumentException("memberId, productId problem : Member or Product cannot be null");
        }
        Long memberId = cartDTO.getMemberId(); // 수정된 getter 사용
        Long productId = cartDTO.getProductId();// 수정된 getter 사용

        // Product 정보 조회
        Product product = cartRepository.getProductById(productId);
        if (product == null) {
            throw new IllegalArgumentException("Product not found for ID: " + productId);
        }

        // CartDTO에 size와 category 추가 (Product에서 값 가져오기)
        cartDTO.setProductSize(product.getProductSize());
        cartDTO.setCategory(product.getCategory());

        Cart cart = cartRepository.getItemOfProductId(memberId, productId);

        if (cart == null) { // 새로운 Cart 생성
            cart = toEntity(cartDTO);
            cartRepository.save(cart);
        } else { // 기존 Cart 수정
            cart.setAmount(cartDTO.getAmount());
            cart.setProductSize(cartDTO.getProductSize());
            cart.setCategory(cartDTO.getCategory());
            cartRepository.save(cart);
        }
        List<CartDTO> cartItemList = getCartItems(memberId);
        return cartItemList;
    }

    private Cart toEntity(CartDTO dto) {
        HexaMember member = cartRepository.getMemberById(dto.getMemberId());
        Product product = cartRepository.getProductById(dto.getProductId());
        return Cart.builder()
                .cartId(dto.getCartId())
                .memberId(member) // HexaMember 객체 필요
                .productId(product) // Product 객체 필요
                .category(dto.getCategory()) // Product 객체 필요
                .amount(dto.getAmount())
                .productSize(dto.getProductSize())
                .regAt(dto.getRegAt() != null ? dto.getRegAt() : LocalDate.now())
                .build();
    }

    //모든 장바구니 아이템 목록
    @Override
    public List<CartDTO> getCartItems(Long memberId) {
        List<CartDTO> cartDTOList = cartRepository.getItemsOfCartDTOByMemberId(memberId);

        for (CartDTO list : cartDTOList) {
            List<String> imageList = cartRepository.findImageFilesByProductId(list.getProductId());
            list.setImageName(imageList);
        }
        return cartDTOList;
    }

    @Override
    public CartDTO getCartItem(Long cartId) {
        Optional<Cart> cartInfo = cartRepository.findById(cartId);
        Cart cart = cartInfo.orElseThrow();
        CartDTO cartDTO = CartDTO.builder()
                .cartId(cart.getCartId())
                .productId(cart.getProductId().getProductId())
                .memberId(cart.getMemberId().getId())
                .amount(cart.getAmount())
                .productSize(cart.getProductSize())
                .category(cart.getCategory())
                .price(cart.getProductId().getPrice())
                .productBrand(cart.getProductId().getProductBrand())
                .address(cart.getMemberId().getAddress())
                .name(cart.getMemberId().getName())
                .phoneNumber(cart.getMemberId().getPhoneNumber())
                .build();
        return cartDTO;
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
