package com.example.hexaqna.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"memberId", "productId"})
@JsonIgnoreProperties({"member_id", "product_id"})
public class Cart {
    //관계는 DB 연결하면서 주석 처리 풀 예정, 관계로 연결된 테이블의 자료형도 데이터베이스 이름으로 전환할 예정
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private int cartId; //카트 아이디

    @Column(name = "category")
    private String category; //카테고리

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id")
    private HexaMember memberId; //사용자 아이디

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product productId; //제품 아이디

    @Column
    private int amount; //제품 수량

    @Column
    private int productSize; //제품 사이즈

    @Column(name = "reg_at")
    private LocalDate regAt; //장바구니 제품 등록 날짜

    public void setMemberId(HexaMember memberId) {
        this.memberId = memberId;
    }

    public void setProductId(Product productId) {
        this.productId = productId;
    }

    public void setProductSize(int productSize) {
        this.productSize = productSize;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public void setCategory(String category){this.category = category;}


}
