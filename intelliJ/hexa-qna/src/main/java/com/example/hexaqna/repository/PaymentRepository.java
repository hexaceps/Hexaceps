package com.example.hexaqna.repository;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.Order;
import com.example.hexaqna.domain.Payment;
import com.example.hexaqna.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // memberId로 Payment 내역 조회 하기
    @Query("select p from Payment p where p.member.id = :memberId order by p.paymentDate desc")
    List<Payment> findPaymentsByMemberId(@Param("memberId") Long memberId);

    // orderId 로 주문 정보, 사용자 정보, 상품 정보를 조회 (paymentDTO 생성을 위해서 필요함)
    @Query("SELECT o.member.id, o.product.productId, o.product.productName, o.product.productBrand, o.product.price, o.product.productSize, " +
            "m.name, m.email, m.address, m.phoneNumber, " +
            "o.productQuantity, o.totalPrice, o.productPrice " +
            "FROM Order o " +
            "JOIN o.member m " +
            "JOIN o.product p " +
            "WHERE o.orderId = :orderId")
    String[] findAllDetailsByOrderId(@Param("orderId") Long orderId);

    @Query("select c.memberId.id from Cart c where c.cartId = :cartId")
    Long findMemberIdByCartId(@Param("cartId") Long cartId);


    // findAllDetailsByOrderId 로 통합

    // orderId로 memberId, productId 가져오기
    @Query("select o.member.id as getMemberId, o.product.productId as getProductId" +
            " from Order o " +
            " where o.orderId = :orderId")
    Long[] findMemberIdAndProductIdByOrderId(@Param("orderId") Long orderId);

    // productId 정보로 product에 필요한 정보 가져오기
    @Query("select p from Product p where p.productId = :productId")
    Product findProductInfoByProductId(@Param("productId") Long productId);

    // memberId 정보로 HexaMember에 필요한 정보 가져오기
    @Query("select m from HexaMember m where m.id = :memberId")
    HexaMember findMemberInfoByMemberId(@Param("memberId") Long memberId);

    // orderId 정보로 Order 필요한 정보 가져오기
    @Query("select o from Order o where o.orderId = :orderId")
    Order findOrderInfoByOrderId(@Param("orderId") Long orderId);

}