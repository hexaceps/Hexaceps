package com.example.hexaqna.dto;

import lombok.Data;

@Data
public class OrderResponseDTO {
    private Long orderId;
    private String orderNumber;
    private Long memberId;
    private String memberName;
    private String memberEmail;
    private String memberPhoneNumber;
    private String memberAddress;
    private Long cartId;
    private Long productId;
    private int productPrice = 0; // 기본값 설정
    private int totalPrice = 0;  // 기본값 설정
    private String orderStatus = "PENDING"; // 기본값 설정
    private int productQuantity = 0; // 기본값 설정
    private String productName;
    private String productBrand;

    // Getters and setters
}
