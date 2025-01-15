package com.example.hexaqna.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {

    private Long paymentId;
    private String paymentNumber;
    private String paymentType; // 카드, 계좌이체
    private String paymentVender; // 우리, 하나, 국민, 카카오, 토스, 기타
    private LocalDateTime paymentDate;
    private String paymentStatus; // 결제대기, 결재중, 결제완료, 결제실패, 예외

    private Long memberId;
    private String name;
    private String email;
    private String phoneNumber;
    private String address;

    private Long productId;
    private String productName;
    private String productBrand;
    private int size;
    private int price;
    private String productImage;

    private Long orderId;
    private int productQuantity;
    private int productPrice;
    private int totalPrice;

    private String transferNumber;

}
