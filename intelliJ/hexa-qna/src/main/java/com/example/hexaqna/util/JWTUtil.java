package com.example.hexaqna.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

import javax.crypto.SecretKey;
import java.io.UnsupportedEncodingException;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Map;

@Slf4j
public class JWTUtil {

    //JWT 의 서명을 생성할 때 사용하는 비밀 키, 최소 256비트(32자 이상)가 필요
    //HMAC-SHA 알고리즘을 사용
    //32자 이상 만들고자 아래의 임의의 키를 생성
    private static String key ="1234567890123456789012345678901234567890";

    //JWT 문자열 생성을 위한 generateToken() 메서드
    //입력으로 전달된 valueMap 과 유효시간(min)을 바탕으로 JWT를 생성
    //valueMap 은 JWT 의 클레임(Claims)입니다. 예를들어, 사용자 정보 같은 데이터를 담을수 있습니다.
    public static String generateToken(Map<String, Object> valueMap, int min){
        //비밀키
        SecretKey key =null;

        //hmacShaKeyFor, 비밀키를 HMAC-SHA 알고리즘을 키로 변환
        try {
          key =  Keys.hmacShaKeyFor(JWTUtil.key.getBytes("UTF-8"));
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }

        String jwtStr = Jwts.builder()
                .setHeader(Map.of("typ", "JWT"))//JWT 의 헤더를 설정
                .setClaims(valueMap)
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))//발급시간
                .setExpiration(Date.from((ZonedDateTime.now().plusMinutes(min).toInstant())))//만료시간
                .signWith(key)//HMAC-SHA 알고리즘으로 서명을 만듬
                .compact();//JWT 를 직렬화 하여 최종 문자열로 반환

        return jwtStr;
    }

    //검증을 위한 validateToken()
    // 입력값 token은 검증 대상의 JWT 문자열
    public static Map<String, Object> validateToken(String token){
        //토큰의 클레임 데이터를 저장할 변수, 클레임은 토큰에 담긴 정보(key-value 쌍)으로 이루어짐
        Map<String , Object> claim = null;
        //비밀키
        SecretKey key =null;

        //JWT 생성 시 사용한 키와 동일해야 함
        try {
            key= Keys.hmacShaKeyFor(JWTUtil.key.getBytes("UTF-8"));

            claim = Jwts.parserBuilder()//JWT 문자열을 파싱하는 객체를 빌드
                    .setSigningKey(key)//JWT 의 서명을 검증하기 위해 사용할 비밀 키를 설정
                    .build()
                    .parseClaimsJws(token)//입력받은 JWT 문자열을 파싱하여 유효성을 확인, 서명이 유효한지, 토큰이 만료되지 않았는지 확인
                    .getBody();//검증이 성공하면 토큰의 페이로드(Payload) 부분에 포함된 클레임 데이터를 반환

        } catch (MalformedJwtException malformedJwtException) {
            throw new CustomJWTException("MalFormed");//토큰이 잘못된 형식으로 작성된 경우
        }catch (ExpiredJwtException expiredJwtException) {
            throw new CustomJWTException("Expired");//토큰이 만료되었거나, 만료시간이 잘못된 경우
        }catch (InvalidClaimException invalidClaimException) {
            throw new CustomJWTException("Invalid");//JWT 처리 중, 클레임 값이 특정 검증 조건을 충족하지 않을 때
        }catch (JwtException jwtException) {
            throw new CustomJWTException("JWTError");//JMT 생성, 검증, 또는 파싱 과정에서 발생할 수 있는 다양한 문제
        }catch (Exception e) {
            throw new CustomJWTException("Error");
        }

        return claim;
    }
}
