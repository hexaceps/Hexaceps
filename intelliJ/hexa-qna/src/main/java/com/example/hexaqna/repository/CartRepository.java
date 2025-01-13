package com.example.hexaqna.repository;

import com.example.hexaqna.domain.Cart;
import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.Product;
import com.example.hexaqna.dto.CartDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    //사용자의 memberId를 통해 Cart를 알아낸다.
//    @Query("select c from Cart c where c.memberId = :memberId")
//    public Optional<Cart> getCartOfMember(@Param("memberId") Long memberId);

//    @Query("select new com.example.hexaqna.dto.CartDTO(c.cartId, c.category, c.memberId.id, c.productId.productId, c.amount, c.productSize, c.regAt)" +
//            " from Cart c" +
//            " where c.memberId.id = :memberId" +
//            " order by c.cartId desc")
//    public List<CartDTO> getItemsOfCartDTOByMemberId(@Param("memberId") Long memberId);

    @Query("select new com.example.hexaqna.dto.CartDTO(" +
            " c.cartId, c.memberId.id, c.memberId.name, c.memberId.address, c.memberId.phoneNumber," +
            " c.productId.productId, c.productId.category, c.productId.productBrand, c.productId.productName, c.productId.price, c.productId.productSize," +
            " c.amount, c.regAt, null )" +
            " from Cart c" +
            " where c.memberId.id = :memberId" +
            " order by c.cartId desc")
    List<CartDTO> getItemsOfCartDTOByMemberId(@Param("memberId") Long memberId);

    // 사용자 ID 조회 후 카드에 들어간 이미지리스트 가져오기 위한 처리
    @Query("select pi.fileName from ProductImage pi where pi.product.productId = :productId")
    List<String> findImageFilesByProductId(@Param("productId") Long productId);

    //사용자의 userId와 productId로 해당 장바구니 아이템을 알아내는 기능
    @Query("select c " +
            " from Cart c " +
            "where " +
            "c.memberId.id = :memberId and c.productId.productId = :productId")
    Cart getItemOfProductId(@Param("memberId") Long memberId, @Param("productId") Long productId);

//    //cartId를 이용해서 장바구니를 알고 싶을 때
//    @Query("select c " +
//            "from Cart c" +
//            " where " +
//            "c.cartId = :cartId")
//    public int getCartFromItem(@Param("cartId") int cartId);
//
//    //특정한 장바구니의 번호만으로 해당 장바구니의 모든 장바구니 아이템을 조회하는 기능
//    @Query("select " +
//            "new com.example.hexaqna.dto.CartDTO(c.cartId, c.category, c.memberId, c.productId, c.amount, c.size, c.regAt)" +
//            "from " +
//            "Cart c" +
//            " where " +
//            "c.cartId = :cartId" +
//            " order by c.cartId desc")
//    public List<CartDTO> getItemsOfCartDTOByCart(@Param("cartId") int cartId);

    @Query("SELECT m FROM HexaMember m WHERE m.id = :memberId")
    HexaMember getMemberById(@Param("memberId") Long memberId);

    @Query("SELECT p FROM Product p WHERE p.productId = :productId")
    Product getProductById(@Param("productId") Long productId);

    @Query("SELECT p.category FROM Product p WHERE p.productId = :productId")
    String getCategoryByProductId(@Param("productId") Long productId);


}
