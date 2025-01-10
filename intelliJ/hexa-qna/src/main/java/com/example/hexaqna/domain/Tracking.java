package com.example.hexaqna.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Tracking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paymentId")
    private Payment payment; // Payment 정보 가져다 쓸 예정

    private String trackingId;
    private String status; // 배송 상태
    private LocalDateTime updateDate; // 업데이트
    private String company; // 배송회사
    private String step; // 배송 단계
    private String location;// 현재 위치
}
