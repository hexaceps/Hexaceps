package com.example.hexaqna.dto;

import lombok.Data;

@Data
public class OrderResponseDTO {
    private Long orderId;
    private String orderNumber;
    private Long memberId;
    private Long cartId;
    private Long productId;
    private String productName;
    private int productPrice;
    private int totalPrice;
    private String orderStatus;
    private int productQuantity;
}
