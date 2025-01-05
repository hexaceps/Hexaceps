package com.example.hexaqna.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentId")
    private Long paymentId;

    private String paymentNumber;
    private String paymentType; // 카드, 계좌이체
    private String paymentVender; // 우리, 하나, 국민, 카카오, 토스, 기타
    private LocalDateTime paymentDate;
    private String paymentStatus; // 결제대기, 결재중, 결제완료, 결제실패, 예외

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    @JsonBackReference("memberReference")
    private HexaMember member;

    private String name;
    private String email;
    private String phoneNumber;
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productId")
    @JsonBackReference("productReference")
    private Product product;

    private String productName;
    private String productBrand;
    private int size;
    private int price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderId")
    @JsonBackReference("orderReference")
    private Order order;

    private int productQuantity;
    private int productPrice;
    private int totalPrice;

}
