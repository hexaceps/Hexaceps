package com.example.hexaqna.dto;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
public class GoogleMemberDTO extends User {
    private String sub;
    private String name;
    private String email;
    private String password;
    private String picture;
    private int socialYn ;

    private List<String> roleNames = new ArrayList<>();

    public GoogleMemberDTO(String email, String password, List<String> roleNames) {
        super(email,password,roleNames.stream().map(str -> new SimpleGrantedAuthority("ROLE_" + str)).collect(Collectors.toList()));
        this.email = email;
        this.password = password;
        this.roleNames = roleNames;
    }



    // UserDetails 메서드 구현


    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // getClaims() 메서드 추가
    public Map<String, Object> getClaims() {
        Map<String, Object> claims = Map.of(
                "email", this.email,
                "name", this.name,
                "picture", this.picture
        );
        return claims;
    }
}