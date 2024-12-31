package com.example.hexaqna.repository.search;

import com.example.hexaqna.domain.Cart;
import com.example.hexaqna.dto.CartDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    //사용자의 userId를 통해 Cart를 알아낸다.
    @Query("select c from Cart c where c.userId = :userId")
    public Optional<Cart> getCartOfMember(@Param("userId") String userId);

    //특정 사용자의 userId를 통해서 해당 사용자의 모든 장바구니 아이템을 조회하는 기능
    @Query("select " +
            "new com.example.hexaqna.dto.CartDTO(c.cartId, c.categoryId, c.userId, c.productId, c.amount, c.size, c.regAt)" +
            "from " +
            "Cart c" +
            " where " +
            " c.userId = :userId" +
            " order by c.cartId desc")
    public List<CartDTO> getItemsOfCartDTOByUserId(@Param("userId") String userId);

    //사용자의 userId와 productId로 해당 장바구니 아이템을 알아내는 기능
    @Query("select c " +
            " from Cart c " +
            "where " +
            "c.userId = :userId and c.productId = :productId")
    public Cart getItemOfProductId(@Param("userId") String userId, @Param("productId") String productId);

    //cartId를 이용해서 장바구니를 알고 싶을 때
    @Query("select c " +
            "from Cart c" +
            " where " +
            "c.cartId = :cartId")
    public Integer getCartFromItem(@Param("cartId") Integer cartId);

    //특정한 장바구니의 번호만으로 해당 장바구니의 모든 장바구니 아이템을 조회하는 기능
    @Query("select " +
            "new com.example.hexaqna.dto.CartDTO(c.cartId, c.categoryId, c.userId, c.productId, c.amount, c.size, c.regAt)" +
            "from " +
            "Cart c" +
            " where " +
            "c.cartId = :cartId" +
            " order by c.cartId desc")
    public List<CartDTO> getItemsOfCartDTOByCart(@Param("cartId") Integer cartId);
}
