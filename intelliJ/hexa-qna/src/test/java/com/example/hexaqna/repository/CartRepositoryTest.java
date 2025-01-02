package com.example.hexaqna.repository;

import com.example.hexaqna.domain.Cart;
import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.Product;
import com.example.hexaqna.dto.CartDTO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@Slf4j
public class CartRepositoryTest {
    @Autowired
    CartRepository cartRepository;

    @Test
    void 멤버cart가져오기(){
        Long memberId = 1L;
        List<CartDTO> cartDTOList = cartRepository.getItemsOfCartDTOByUserId(memberId);
        assertNotNull(cartDTOList);
        log.info("Member's cart items: {}", cartDTOList);
    }

    @Transactional
    @Commit
    @Test
    void 장바구니만들기(){

        // 사용자가 전송하는 정보
        Long memberId = 1L;
        Long productId = 2L;
        Long categoryId = 3L;  // categoryId는 Product 엔티티의 id로 수정
        int size = 270;
        int amount = 2;

        // HexaMember와 Product 엔티티 조회
        HexaMember member = cartRepository.getMemberById(memberId);  // 조회하는 방식으로 수정
        Product product = cartRepository.getProductById(productId);  // 조회하는 방식으로 수정
        Product category = cartRepository.getProductById(categoryId);  // 카테고리도 Product로 수정

        // 만일 기존에 사용자의 장바구니 아이템이 있었다면
        Cart cart = cartRepository.getItemOfProductId(memberId, productId);

        if(cart != null){
            cart.setSize(size);
            cart.setAmount(amount);
            cartRepository.save(cart);
        } else {
            Cart newCart = Cart.builder()
                    .memberId(member)  // HexaMember 객체 설정
                    .productId(product)  // Product 객체 설정
                    .category(category)  // 카테고리 설정
                    .amount(amount)
                    .size(size)
                    .regAt(LocalDate.now())
                    .build();
            cartRepository.save(newCart);
        }

    }

    @Test
    @Commit
    public void 장바구니아이템수량및사이즈수정(){
        Long cartId = 3L;
        int size = 285;
        int amount = 1;
        Optional<Cart> result = cartRepository.findById(cartId);
        Cart cart = result.orElseThrow();
        cart.setSize(size);
        cart.setAmount(amount);
        log.info("제품 사이즈{}", size);
        log.info("제품 수량{}", amount);
        cartRepository.save(cart);
    }

    @Test
    public void 장바구니아이템목록보기(){
        Long memberId = 1L;
        List<CartDTO> cartDTOList = cartRepository.getItemsOfCartDTOByUserId(memberId);

        for(CartDTO dto : cartDTOList){
            log.info("장바구니 아이템 목록 {}", dto);
        }
    }

    @Test
    public void 장바구니아이템삭제후장바구니조회(){
        Long cartId = 3L; // Long 타입으로 변경

        // 삭제
        cartRepository.deleteById(cartId);
        log.info("Deleted cart item with ID: {}", cartId);

        // 사용자 전체 장바구니 조회
        Long memberId = 1L; // memberId 지정
        List<CartDTO> cartDTOList = cartRepository.getItemsOfCartDTOByUserId(memberId);

        assertNotNull(cartDTOList);
        for (CartDTO dto : cartDTOList) {
            log.info("Remaining cart item: {}", dto);
        }
    }
}
