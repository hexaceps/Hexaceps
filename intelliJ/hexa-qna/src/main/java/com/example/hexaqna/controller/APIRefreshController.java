package com.example.hexaqna.controller;


import com.example.hexaqna.util.CustomJWTException;
import com.example.hexaqna.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class APIRefreshController {

    @RequestMapping("/api/member/refresh")
    public Map<String, Object> refresh(@RequestHeader("Authorization") String authHeader, @RequestParam("refreshToken") String refreshToken){

        //refreshToken 이 없음
        if(refreshToken == null){
            throw new CustomJWTException("Null_Refresh");
        }

        //authHeader 가 없거나 Bearer 이렇게 오는게 7자가 안되면 이상한 것이기에 이를 예외처리
        if(authHeader == null || authHeader.length()<7){
            throw new CustomJWTException("Invalid_String");  //잘못된 문자이거나 값이 없음
        }

        String accessToken = authHeader.substring(7);

        /*
        //Access 토큰이 만료되지 않았다면, 그대로 사용
        if(!checkExpiredToken(accessToken)){
            return Map.of("accessToken",accessToken,"refreshToken",refreshToken);
        }*/

        //Refresh 토큰 검증
        Map<String, Object> claims = JWTUtil.validateToken(refreshToken);
        log.info("refresh ... claims: {}", claims);

        //새로운 accessToken 발행
        String newAccessToken = JWTUtil.generateToken(claims, 60);

        //refreshToken 의 시간을 검사해서 다시 발행할지, 아닐지를 결정
         //String newRefreshToken = checkTime((Integer) claims.get("exp"))? JWTUtil.generateToken(claims,60*24) : refreshToken;

       String newRefreshToken = JWTUtil.generateToken(claims, 60 * 24);

        return Map.of("accessToken",newAccessToken, "refreshToken",newRefreshToken);

    }

    //시간이 1시간 미만으로 남았는지 체크, true 를 반환하면 1시간 미만을 남았음
    private boolean checkTime(Integer exp) {
        //JWT (JSON Web Token 에서 가져온 exp 클레임은 Unix 타임스탬프로 표현되고 JUnix 타임스탬프는 초단위로 시간을 나타냄
        // 자바의 Date 는 system.currentTimeMillis()의 밀리초단위로 시간을 다룬다.
        //따라서 JUnix 값에 *1000을 더해야 자바의 시간(밀리초) 단위로 표현이가능하다
        Date expDate = new Date((long) exp * (1000));

        //현재 시간과의 차이 계산
        long gap = expDate.getTime() - System.currentTimeMillis();

        //분단위 계산
        long leftMin = gap / (1000 * 60);

        //1시간 미만으면 true로 반환해라
        return leftMin < 60;

    }

    //만료 되었는지 검사, true면 만료됨, false면 아직 만료되지 않음
    private boolean checkExpiredToken(String accessToken) {
        try {
            JWTUtil.validateToken(accessToken);
            return false;
        } catch (CustomJWTException ex) {
            if (ex.getMessage().equals("Expired")) {
                return true;
            }  throw ex;
        }
    }
}
