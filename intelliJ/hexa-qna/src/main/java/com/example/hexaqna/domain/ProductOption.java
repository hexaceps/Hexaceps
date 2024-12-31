package com.example.hexaqna.domain;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductOption {

    private String size;

    private int size_price;

    private int size_stock;
}
