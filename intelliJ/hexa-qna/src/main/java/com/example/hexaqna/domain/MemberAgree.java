package com.example.hexaqna.domain;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberAgree {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long aid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId", nullable = false)
    @JsonBackReference("memberAgreeReference")
    private HexaMember member;

    private boolean an1;
    private boolean an2;
    private boolean an3;
    private boolean as1;
    private boolean as2;
}