package com.example.hexaqna.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
public class CartDTO {
    private int cartId;

    private String categoryId;

    private String userId;

    private String productId;

    private int amount;

    private int size;

    private LocalDate regAt;

    private String fileName;

    //이미지를 포함한 다른 항목들은 DB 연결하면서 추가할 예정,

    public CartDTO(int cartId, String categoryId, String userId, String productId, int amount, int size, LocalDate regAt, String fileName) {
        this.cartId = cartId;
        this.categoryId = categoryId;
        this.userId = userId;
        this.productId = productId;
        this.amount = amount;
        this.size = size;
        this.regAt = regAt;
        this.fileName = fileName;
    }
}
