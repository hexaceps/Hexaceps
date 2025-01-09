package com.example.hexaqna.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartDTO {

    private int cartId;

    private Long memberId;
    private String name;
    private String address;
    private String phoneNumber;

    private Long productId;
    private String category;
    private String productBrand;
    private String productName;
    private int price;
    private int productSize;

    private int amount;
    private LocalDate regAt;

    private List<String> imageName;

}
