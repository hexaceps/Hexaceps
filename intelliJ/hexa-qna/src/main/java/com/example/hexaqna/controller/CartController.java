package com.example.hexaqna.controller;

import com.example.hexaqna.dto.CartDTO;
import com.example.hexaqna.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/product/cart")
public class CartController {
    public final CartService cartService;

    //장바구니 아이템의 추가 / 수정
    @PostMapping("/")
    public List<CartDTO> changeCart(@RequestBody CartDTO cartDTO){
        log.info("changeCart () 추가 시작, 상품정보 : " + cartDTO.getProductId());
        if (cartDTO.getProductId() == null) {
            throw new IllegalArgumentException("유효하지 않은 상품 ID입니다.");
        }
        if(cartDTO.getAmount() <= 0){
            return cartService.remove(cartDTO.getCartId());
        }
        return cartService.addOrModify(cartDTO);
    }

    //사용자 장바구니 목록
    //@PreAuthroize("hasAnyRole('USER')")
    @GetMapping("/m/{memberId}")
    public List<CartDTO> getCartItems(@PathVariable("memberId") Long memberId){
        if (memberId == null || memberId <= 0) {
            throw new IllegalArgumentException("유효하지 않은 사용자 ID입니다.");
        }
        log.info("인증된 사용자 아이디는? {}", memberId);
        return cartService.getCartItems(memberId);
    }

    //장바구니 아이템 삭제
    @DeleteMapping("/{cartId}")
    public List<CartDTO> removeFromCart(@PathVariable("cartId") int cartId){
        if (cartId <= 0) {
            throw new IllegalArgumentException("유효하지 않은 카트 ID입니다.");
        }
        log.info("삭제할 장바구니 번호는? {}", cartId);
        return cartService.remove(cartId);
    }
}