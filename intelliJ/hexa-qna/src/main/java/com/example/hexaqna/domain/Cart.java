package com.example.hexaqna.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"categoryId", "userId", "productId"})
@Table(name = "cart")
public class Cart {
    //관계는 DB 연결하면서 주석 처리 풀 예정, 관계로 연결된 테이블의 자료형도 데이터베이스 이름으로 전환할 예정
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private int cartId; //카트 아이디

    @ManyToOne
    @Column(nullable = false, length = 4)
    @JoinColumn(name = "category_id")
    private Product categoryId; //카테고리 아이디

    @OneToOne
    @Column(nullable = false, length = 50)
    @JoinColumn(name = "user_id")
    private HexaMember userId; //사용자 아이디

    @ManyToOne
    @Column(nullable = false, length = 100)
    @JoinColumn(name = "product_id")
    private Product productId; //제품 아이디

    @Column(nullable = false)
    private int amount; //제품 수량

    private int size; //제품 사이즈

    @Column(name = "reg_at")
    private LocalDate regAt; //장바구니 제품 등록 날짜

    public void setSize(int size) {
        this.size = size;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
