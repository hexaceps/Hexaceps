package com.example.hexaqna.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ProductSiteLink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productProductId")
    private Long id;

    private String siteLink;

    private int siteOrd; // 0 = hexaceps, 1 = kream, 2 = stockx, 3 = amazon

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prductId")
    private Product product;
    // site sorting 순서 정리
    public void setSiteOrd(int siteOrd) {
        this.siteOrd = siteOrd;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}