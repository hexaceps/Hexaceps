package com.example.hexaqna.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
public class KakaoMemberDTO extends User{


        private String email, password, nickname;

        private int socialYn;

        private List<String> roleNames = new ArrayList<>();
        private List<LikeDTO> like = new ArrayList<>(); // 추가



    // 우리는 그냥 문자로 권한을 받으면 되지만 시큐리티느 객체로 받아야한다. 그래서 new SimpleGrantedAuthortu("ROLE_"+ str) 문자 객체로 생성해준다
        public KakaoMemberDTO(String email, String password, String nickname, int socialYn, List<String> roleNames) {
            super(email, password, roleNames.stream().map(str -> new SimpleGrantedAuthority("ROLE_" + str)).collect(Collectors.toList()
            ));

            this.email = email;
            this.password = password;
            this.nickname = nickname;
            this.socialYn = socialYn;
            this.roleNames = roleNames;
        }

        //JWT문자열을 만들어서 데이터를 주고 받는다
        //JWT문자열의 내용물을 크레임스(Claims)

        public Map<String, Object> getClaims() {
//        new HashMap<>();
            Map<String, Object> dataMap = new HashMap<>();

            dataMap.put("email", email);
            dataMap.put("password", password);
            dataMap.put("nickname", nickname);
            dataMap.put("socialYn", socialYn);
            dataMap.put("roleNames", roleNames);
            dataMap.put("like", like); // 추가

            return dataMap;
        }





    }




