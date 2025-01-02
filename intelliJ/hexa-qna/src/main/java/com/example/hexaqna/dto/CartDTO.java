package com.example.hexaqna.dto;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.Product;
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

    private Product category;

    private HexaMember memberId;

    private Product productId;

    private int amount;

    private int size;

    private LocalDate regAt;

}
