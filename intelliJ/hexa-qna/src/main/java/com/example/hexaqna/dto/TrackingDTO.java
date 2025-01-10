package com.example.hexaqna.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TrackingDTO {

    private Long id;
    private Long paymentId; // id 를 받아서 payment 객체로 저장
    private String trackingId;
    private String status;
    private LocalDateTime updateDate;
    private String company;
    private String step;
    private String location;
}
