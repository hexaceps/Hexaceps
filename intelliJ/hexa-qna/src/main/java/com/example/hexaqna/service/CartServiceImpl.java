package com.example.hexaqna.service;

import com.example.hexaqna.domain.Cart;
import com.example.hexaqna.dto.CartDTO;
import com.example.hexaqna.repository.search.CartRepository;
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
        String userId = cartDTO.getUserId();
        String productId = cartDTO.getProductId();
        String categoryId = cartDTO.getCategoryId();
        int amount = cartDTO.getAmount();
        int size = cartDTO.getSize();
        Integer cartId = cartDTO.getCartId();

        if(cartId != null){
            Cart cart = cartRepository.findById(cartId)
                    .orElseThrow(() -> new IllegalArgumentException("Cart not found for ID: " + cartId));
            cart.setAmount(amount);
            cart.setSize(size);
            cartRepository.save(cart);
            return getCartItems(userId);
        }

        //장바구니 아이템 번호가 없는 경우
        //사용자의 카트(장바구니) 만들기
        //이미 동일한 상품이 담긴 적이 있을 수 있으므로 일단 가져온다.
        Cart cart = cartRepository.getItemOfProductId(userId, productId);
        if(cart == null){
            //장바구니 카트에 해당 상품이 없다는 뜻, 상품을 찾아서 카트 아이템에 담음
            //Product product = Product.builder().pno(pno).build();
            //cart = Cart.builder().product(product).cart(cart).qty(qty).build();
            Cart newCart = Cart.builder()
                    .userId(userId)
                    .productId(productId)
                    .categoryId(categoryId)
                    .amount(amount)
                    .size(size)
                    .regAt(LocalDate.now())
                    .build();
            cartRepository.save(newCart);
        }else{
            //동일한 상품이 카트 아이템 리스트에 있다는 것, 수량만 변경한다.
            cart.setAmount(amount);
            cart.setSize(size);
            cartRepository.save(cart);
        }

        return getCartItems(userId);
    }

    //모든 장바구니 아이템 목록
    @Override
    public List<CartDTO> getCartItems(String userId) {
        return cartRepository.getItemsOfCartDTOByUserId(userId);
    }

    //아이템 삭제
    @Override
    public List<CartDTO> remove(Integer cartId){
        //카트 아이템 삭제
        if (!cartRepository.existsById(cartId)) {
            throw new IllegalArgumentException("Cart not found for ID: " + cartId);
        }
        cartRepository.deleteById(cartId);
        return cartRepository.getItemsOfCartDTOByCart(cartId);
    }
}
