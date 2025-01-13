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
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productSiteId")
    private Long id;

    private String fileName;
    private int ord; // 0 이 대표 이미지, 원하는 번호만 볼수 있게 ordering

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productId")
    @JsonBackReference("product-image")
    private Product product;

    public void setOrd(int ord) {
        this.ord = ord;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}