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
    @PostMapping("/change")
    public List<CartDTO> changeCart(@RequestBody CartDTO cartDTO){
        log.info("장바구니 추가 후 확인 || cartId {}", cartDTO.getCartId());
        log.info("장바구니 추가 후 확인 || productId {}", cartDTO.getProductId());
        log.info("장바구니 추가 후 확인 || productAmount {}", cartDTO.getAmount());
        log.info("장바구니 추가 후 확인 || productSize {}", cartDTO.getProductSize());

        if (cartDTO.getProductId() == null) {
            throw new IllegalArgumentException("상품 아이디를 찾을 수 없습니다 null exception");
        }
        if(cartDTO.getAmount() <= 0){
            log.info("amount 수량이 0이하로 되어 있어 장바구니에서 삭제");
            return cartService.remove(cartDTO.getCartId());
        }
        List<CartDTO> cartDTOList = cartService.addOrModify(cartDTO);
        log.info("장바구니 추가 (또는) 수정이 완료 되었습니다. 사용자에 담긴 장바구니 리스트 : ", cartDTOList.size());
        return cartDTOList;
    }

    //사용자 장바구니 목록
    //@PreAuthroize("hasAnyRole('USER')")
    //@GetMapping("items")
    @GetMapping("/m/{memberId}")
    public List<CartDTO> getCartItemsByMemberId(@PathVariable("memberId") Long memberId){
        //String userId = principal.getName();
        //log.info("인증된 사용자 아이디는? {}", userId);
        if (memberId == null || memberId <= 0) {
            throw new IllegalArgumentException("유효하지 않은 사용자 ID입니다.");
        }
        log.info("인증된 사용자 아이디는? {}", memberId);
        return cartService.getCartItems(memberId);
    }

    @GetMapping("/c/{cartId}")
    public CartDTO getCartItemByCartId(@PathVariable("cartId") Long cartId){
        CartDTO cartItem = cartService.getCartItem(cartId);
        return cartItem;
    }

    //장바구니 아이템 삭제
    @DeleteMapping("/delete/{cartId}")
    public List<CartDTO> removeFromCart(@PathVariable("cartId") int cartId){
        if (cartId <= 0) {
            throw new IllegalArgumentException("유효하지 않은 카트 ID입니다.");
        }
        log.info("삭제할 장바구니 번호는? {}", cartId);
        return cartService.remove(cartId);
    }

}
