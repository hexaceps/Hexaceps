package com.example.hexaqna.domain;


import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberAgree {

    private boolean an1;

    private boolean an2;

    private boolean an3;

    private boolean as1;

    private boolean as2;
}
