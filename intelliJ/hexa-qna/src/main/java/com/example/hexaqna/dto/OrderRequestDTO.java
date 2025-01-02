package com.example.hexaqna.dto;

import lombok.Data;

@Data
public class OrderRequestDTO {
    private Long memberId; // 요청에서 받을 memberId
    private Long cartId;   // 요청에서 받을 cartId
}
