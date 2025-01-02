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

@SpringBootTest
@Slf4j
public class CartRepositoryTest {
    @Autowired
    CartRepository cartRepository;

    @Test
    void 멤버cart가져오기(){
        HexaMember member = cartRepository.getMemberById(1L);
        cartRepository.getItemsOfCartDTOByMemberId(member.getId());
    }

    @Transactional
    @Commit
    @Test
    void 장바구니만들기(){

        // 사용자가 전송하는 정보
        Long memberId = 1L;
        Long productId = 2L;
        int amount = 10;

        // HexaMember와 Product 엔티티 조회
        HexaMember member = cartRepository.getMemberById(memberId);  // 조회하는 방식으로 수정
        Product product = cartRepository.getProductById(productId);  // 조회하는 방식으로 수정

        String categoryName = product.getCategory();

        int productSize = product.getSize() != null ? Integer.parseInt(product.getSize()) : 0;

        // 만일 기존에 사용자의 장바구니 아이템이 있었다면
        Cart cart = cartRepository.getItemOfProductId(memberId, productId);

        if(cart != null){
            cart.setSize(productSize);
            cart.setAmount(amount);
            cartRepository.save(cart);
        } else {
            Cart newCart = Cart.builder()
                    .memberId(member)  // HexaMember 객체 설정
                    .productId(product)  // Product 객체 설정
                    .category(categoryName)
                    .amount(amount)
                    .size(productSize)
                    .regAt(LocalDate.now())
                    .build();
            cartRepository.save(newCart);
        }

    }

    @Test
    @Commit
    public void 장바구니아이템수량수정(){
        Long cartId = 2L;
        int amount = 3;
        Optional<Cart> result = cartRepository.findById(cartId);
        Cart cart = result.orElseThrow();
        cart.setAmount(amount);
        log.info("제품 수량{}", amount);
        cartRepository.save(cart);
    }

    @Transactional
    @Test
    public void 장바구니아이템목록보기(){
        Long memberId = 1L;
        List<CartDTO> cartDTOList = cartRepository.getItemsOfCartDTOByMemberId(memberId);

        for(CartDTO dto : cartDTOList){
            log.info("장바구니 아이템 목록 {}", dto);
        }
    }

    @Test
    public void 장바구니아이템삭제(){
        Long cartId = 2L; // Long 타입으로 변경

        // 삭제
        cartRepository.deleteById(cartId);
        log.info("Deleted cart item with ID: {}", cartId);

    }
}
