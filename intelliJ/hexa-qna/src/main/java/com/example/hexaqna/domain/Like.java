package com.example.hexaqna.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table (name = "like_item")
@Getter
@Setter
@JsonIgnoreProperties({"memberId", "productId"})
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
   // @JsonBackReference("memberReference")
    private HexaMember member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productId")
   // @JsonBackReference("productReference")
    private Product product;

    private int count = 0;

}
