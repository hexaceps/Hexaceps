package com.example.hexaqna.service;

import com.example.hexaqna.dto.CartDTO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
class CartServiceImplTest {

    @Autowired private CartService cartService;
    @Test
    void 장바구니랜덤30개추가() {

        for (int i = 1; i < 31; i++) {
            Long randomProductId = (long) (Math.random() * 30) + 1;
            Long randomMemberId = (long) (Math.random() * 30) + 1;
            CartDTO cartDTO = CartDTO.builder()
                    .productId(randomProductId)
                    .memberId(randomMemberId)
                    .amount(1)
                    .build();
            cartService.addOrModify(cartDTO);
        }
    }
}