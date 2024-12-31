package com.example.hexaqna.domain;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductImage {

    private String fileName;

    //각 이미지마다 번호지정, 원하는 번호만 볼수있도록(대표이미지)
    private int ord;

    //이미지순서
    public void setOrd(int ord) {
        this.ord = ord;
    }
}
