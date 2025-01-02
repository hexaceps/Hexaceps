package com.example.hexaqna.dto;

import lombok.*;

import java.time.LocalDate;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartDTO {
    private int cartId;

    private String category;

    private Long memberId;

    private Long productId;

    private int amount;

    private int size;

    private LocalDate regAt;

}
