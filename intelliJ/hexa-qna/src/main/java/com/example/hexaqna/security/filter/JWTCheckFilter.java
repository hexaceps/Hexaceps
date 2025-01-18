package com.example.hexaqna.security.filter;


import com.example.hexaqna.dto.GoogleMemberDTO;
import com.example.hexaqna.dto.KakaoMemberDTO;
import com.example.hexaqna.dto.MemberDTO;
import com.example.hexaqna.util.JWTUtil;
import com.google.gson.Gson;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
public class JWTCheckFilter extends OncePerRequestFilter {

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        if(request.getMethod().equals("OPTIONS")) {
            return true;
        }

        String path = request.getRequestURI();
        if (path.equals("/api/member/login")) {
            return true;
        }

        if (path.equals("/api/member/")) {
            return true;
        }

        if (path.startsWith("/api/")) {
            return true;
        }

        if (path.equals("/api/member/kakao")) {
            return true;
        }

        if (path.equals("/api/member/google")) {
            return true;
        }

        if(path.startsWith("/api/product/view/")) {
            return true;
        }

        log.info("체크url {}", path);
        return false;
    }




    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("doFilterInternal : 검증중 ");

        String authHeaderStr = request.getHeader("Authorization");


        try {
            String accessToken = authHeaderStr.substring(7); // 'Bearer ' 부분 제거
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);
            log.info("JWT claims: {}", claims);

            String email = (String) claims.get("email");
            String password = (String) claims.get("password");
            String nickname = (String) claims.get("nickname");
            int socialYn = (int) claims.getOrDefault("socialYn", 0);  // 기본값은 0 (일반 회원)

            List<String> roleNames = (List<String>) claims.get("roleNames");
            if (roleNames == null) {
                roleNames = new ArrayList<>();
            }

            // 구글 회원, 카카오 회원, 일반 회원 구분 처리
            if (socialYn == 2) { // 구글 회원
                // 구글 로그인 회원 처리
                GoogleMemberDTO googleMemberDTO = new GoogleMemberDTO(email,  password,  roleNames);
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(googleMemberDTO, null, googleMemberDTO.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } else if (socialYn == 1) { // 카카오 회원
                // 카카오 로그인 회원 처리
                KakaoMemberDTO kakaoMemberDTO = new KakaoMemberDTO(email, password, nickname, socialYn, roleNames);
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(kakaoMemberDTO, password, kakaoMemberDTO.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } else { // 일반 회원
                // 일반 회원 처리
                MemberDTO memberDTO = new MemberDTO();
                memberDTO.setEmail(email);
                memberDTO.setPassword(password);
                memberDTO.setNickname(nickname);
                memberDTO.setRoleNames(roleNames);

                log.info("일반 멤버? {}", memberDTO);

                // 일반 회원의 인증 정보 설정
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(memberDTO, password, memberDTO.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }

            filterChain.doFilter(request, response); // 통과

        } catch (Exception e) {
            log.info("에러 발생: {}", e.getMessage());
            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "기간이 만료되었습니다."));
            response.setContentType("application/json; charset=UTF-8");
            PrintWriter printWriter = response.getWriter();
            printWriter.println(msg);
            printWriter.close();
        }
    }
}
