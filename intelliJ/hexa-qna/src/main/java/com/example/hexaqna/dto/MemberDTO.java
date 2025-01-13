package com.example.hexaqna.dto;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.MemberAgree;
import com.example.hexaqna.domain.ProductImage;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MemberDTO {

    private Long id;

    private String name;

    private String password;

    private String email;

    private String phoneNumber;

    private String address;

    private int newsletter;

    private int socialYn;

    private String nickname;

    private String activateYn;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime create_Date;

    private String rank;

    private List<String> roleNames = new ArrayList<>();

    private List<MemberAgreeDTO> memberAgrees;


    public MemberDTO(String email, String password, List<String> roleNames) {
        this.email = email;
        this.password = password;
        this.roleNames = roleNames;
    }

    // getAuthorities() 메서드 구현
    public List<GrantedAuthority> getAuthorities() {
        return roleNames.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }

}

