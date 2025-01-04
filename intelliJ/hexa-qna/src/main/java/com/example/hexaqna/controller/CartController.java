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
@RequestMapping("/api/cart")
public class CartController {
    public final CartService cartService;

    //장바구니 아이템의 추가 / 수정
    @PostMapping("/change")
    public List<CartDTO> changeCart(@RequestBody CartDTO cartDTO){
        //현재 사용자를 찍어보자
        //log.info("현재 인증된 사용자: {}", principal.getName());
        log.info("카트 아이디? {}", cartDTO.getCartId());
        log.info("카트 아이템? {}", cartDTO.getProductId());
        log.info("제품 수량: {}", cartDTO.getAmount());
        log.info("제품 사이즈: {}", cartDTO.getProductSize());
        //if(!Objects.equals(principal.getName(), cartDTO.getUserId())){
        //    throw new IllegalStateException("인증된 사용자와 요청 정보가 일치하지 않습니다.");
        //}

        if (cartDTO.getProductId() == null) {
            throw new IllegalArgumentException("유효하지 않은 제품 ID입니다.");
        }

        if(cartDTO.getAmount() <= 0){
            return cartService.remove(cartDTO.getCartId());
        }
        return cartService.addOrModify(cartDTO);
    }

    //사용자 장바구니 목록
    //@PreAuthroize("hasAnyRole('USER')")
    //@GetMapping("items")
    @GetMapping("/{memberId}")
    public List<CartDTO> getCartItems(@PathVariable("memberId") Long memberId){
        //String userId = principal.getName();
        //log.info("인증된 사용자 아이디는? {}", userId);
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
