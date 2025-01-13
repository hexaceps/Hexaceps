package com.example.hexaqna.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@ToString(exclude = {"product"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductSiteLink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productImgId")
    private Long id;

    private String siteLink;

    private int siteOrd; // 0 = hexaceps, 1 = kream, 2 = stockx, 3 = amazon

    private int sitePrice;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productId")
    @JsonBackReference("product-site")
    private Product product;

    // site sorting 순서 정리
    public void setSiteOrd(int siteOrd) {
        this.siteOrd = siteOrd;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}