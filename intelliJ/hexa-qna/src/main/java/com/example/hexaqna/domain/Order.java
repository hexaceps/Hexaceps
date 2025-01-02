package com.example.hexaqna.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "order_")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    private String orderNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private HexaMember member; // HexaMember와 연결

    private Long cartId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;    // `product`만 사용, `productId`는 제거

    private int productPrice;

    private int totalPrice;

    private String orderStatus;

    private LocalDateTime createdAt;

    private int productQuantity;

    @PrePersist
    public void generateOrderNumber() {
        if (this.orderNumber == null) {
            this.orderNumber = "ORD-" + System.currentTimeMillis();
        }
    }
}
