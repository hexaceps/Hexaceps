package com.example.hexaqna.domain;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductImageURL {

    private String imageURL;

    private int ord1;

    public void setOrd1(int ord1) {
        this.ord1 = ord1;
    }


}
