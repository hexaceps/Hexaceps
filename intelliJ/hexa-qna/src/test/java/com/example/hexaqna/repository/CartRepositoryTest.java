package com.example.hexaqna.repository;

import com.example.hexaqna.domain.Cart;
import com.example.hexaqna.dto.CartDTO;
import com.example.hexaqna.repository.search.CartRepository;
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
        String userId = "JiHyeokHan";
        cartRepository.getItemsOfCartDTOByUserId(userId);
    }

    @Transactional
    @Commit
    @Test
    void 장바구니만들기(){

        //사용자가 전송하는 정보
        String userId = "HyeongjunHan";
        String productId = "IzenSnickers";
        String categoryId = "ABCD";
        int size = 270;
        int amount = 2;

        //만일 기존에 사용자의 장바구니 아이템이 있었다면
        Cart cart = cartRepository.getItemOfProductId(userId, productId);

        if(cart != null){
            cart.setSize(size);
            cart.setAmount(amount);
            cartRepository.save(cart);
        }else{
            Cart newCart = Cart.builder()
                    .userId(userId)
                    .productId(productId)
                    .categoryId(categoryId)
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
        Integer cartId = 3;
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
        String userId = "HyeongjunHan";
        List<CartDTO> cartDTOList = cartRepository.getItemsOfCartDTOByUserId(userId);

        for(CartDTO dto : cartDTOList){
            log.info("장바구니 아이템 목록 {}", dto);
        }
    }

    @Test
    public void 장바구니아이템삭제후장바구니조회(){
        //장바구니 아이템 번호
        Integer cartId = 3;
        //장바구니 아이템 찾기
        cartRepository.deleteById(cartId);
        List<CartDTO> cartDTOList = cartRepository.getItemsOfCartDTOByCart(cartId);
        for(CartDTO dto : cartDTOList){
            log.info("장바구니 아이템 목록 {}", dto);
        }
    }
}
