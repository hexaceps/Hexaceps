package com.example.hexaqna.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productSiteId")
    private Long id;

    private String fileName;
    private int ord; // 0 이 대표 이미지, 원하는 번호만 볼수 있게 ordering

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productId")
    private Product product;

    public void setOrd(int ord) {
        this.ord = ord;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}