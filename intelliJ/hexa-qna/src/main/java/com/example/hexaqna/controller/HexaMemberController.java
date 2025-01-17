package com.example.hexaqna.controller;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.Like;
import com.example.hexaqna.dto.*;
import com.example.hexaqna.repository.HexaMemberRepository;
import com.example.hexaqna.repository.LikeRepository;
import com.example.hexaqna.service.MemberService;
import com.example.hexaqna.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/member")
public class HexaMemberController {
    private final MemberService memberService;
    private final HexaMemberRepository memberRepository;
    private final LikeRepository likeRepository;
    private final PasswordEncoder passwordEncoder;

    private static final String GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginForm loginForm) {
        log.info("Attempting login for email: {}", loginForm.getEmail());
        log.info("Password: {}", loginForm.getPassword());

        boolean isAuthenticated = memberService.auth(loginForm.getEmail(), loginForm.getPassword());
        if (isAuthenticated) {
            String email = loginForm.getEmail();
            HexaMember member = memberRepository.getWithRoles(loginForm.getEmail());
            String nickname = member.getNickname();
            List<LikeDTO>  like = likeRepository.findByMemberId(member.getId());

            log.info("Login successful for {}", loginForm.getEmail());
            String accessToken = JWTUtil.generateToken(Map.of("email", loginForm.getEmail()), 60);
            String refreshToken = JWTUtil.generateToken(Map.of("email", loginForm.getEmail()), 60 * 24); // 예: 24시간 유효
            Map<String, Object> response = new HashMap<>();
            response.put("success", "success");
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);
            response.put("email", email);
            response.put("like", like); // List<LikeDTO> 직접 반환
            return response;
        } else {
            log.warn("Login failed for {}", loginForm.getEmail());
            return Map.of("error", "Invalid credentials");
        }
    }


    //조회
    //http://localhost:8080/api/member/1
    @GetMapping("/{id}")
    public MemberDTO get(@PathVariable("id") Long id) {
        return memberService.get(id);
    }

    @GetMapping("/e/{email}")
    public HexaMember getEmail(@PathVariable("email") String email) {
        return memberRepository.getMemberInfo(email);
    }


    //리스트
    @GetMapping("/list")
    public PageResponseDTO<MemberDTO> list(PageRequestDTO pageRequestDTO) {
        log.info("list...{}", pageRequestDTO);
        return memberService.getlist(pageRequestDTO);
    }

    @PostMapping("/check/{email}")
    public Map<String , String > chekcEmail(@PathVariable("email") String email){
        HexaMember emailCheck = memberRepository.getWithRoles(email);
        log.info("멤버가져오나? {}",emailCheck);
        if(emailCheck == null) {
            return Map.of("success","success");
        } else {
        return Map.of("error","error");
    }
        }

    @PostMapping("/check-password")
    public ResponseEntity<?> checkPassword(@RequestBody Map<String, String> request) {
        String inputPassword = request.get("inputPassword"); // 클라이언트에서 보낸 비밀번호
        String encodedPassword = request.get("encodedPassword"); // DB에 저장된 암호화된 비밀번호

        if (passwordEncoder.matches(inputPassword, encodedPassword)) {
            return ResponseEntity.ok("비밀번호가 일치합니다.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 일치하지 않습니다.");
        }
    }


    //post방식 - json형식으로 받고 return타입을 json형식으로 해줘야 한다.
    @PostMapping("/")
    public Map<String, Long> register(@RequestBody MemberDTO memberDTO){
        log.info("MemberDTO {}", memberDTO);

            Long id = memberService.register(memberDTO);
            return Map.of("id", id);
    }



    //수정, put방식으로 처리, 결과는 json으로
    @PutMapping("/{id}")
    public Map<String, String> modify(@PathVariable("id") Long id, @RequestBody MemberDTO memberDTO) {
        //수정하기 전 안전하게 id값을 넣어준다.
        memberDTO.setId(id);
        log.info("수정 {}", memberDTO);

        memberService.modify(memberDTO);
        return Map.of("RESULT","SUCCESS");
    }

    //삭제
    @DeleteMapping("/{id}")
    public Map<String, String> remove(@PathVariable("id") Long id) {
        log.info("삭제 {}", id);
        memberService.remove(id);
        return Map.of("RESULT", "SECCESS");
    }


    @GetMapping("/kakao")
    public Map<String, Object> getMemberFromkakao(@RequestHeader("Authorization") String authorization) {
        // "Bearer <accessToken>" 형태로 전달되므로, "Bearer "를 제외한 토큰만 추출
        String accessToken = authorization.substring(7);
        log.info("react에서 가져온 access Token {}", accessToken);
        KakaoMemberDTO kakaoMember = memberService.getKakaoMember(accessToken);

        Map<String, Object> claims = kakaoMember.getClaims();
        String jwtAccessToken = JWTUtil.generateToken(claims, 60);
        String jwtRefreshToken = JWTUtil.generateToken(claims, 60 * 24);

        claims.put("accessToken", jwtAccessToken);
        claims.put("refreshToken", jwtRefreshToken);
        return claims;
    }





    

    @PutMapping("/modify")
    public Map<String, String> modify(@RequestBody MemberDTO memberDTO) {
        memberService.modify(memberDTO);
        return Map.of("RESULT", "MODIFIED");
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody LoginRequest loginRequest) {
        try {
            GoogleMemberDTO googleMember = memberService.getGoogleMember(loginRequest.getAccessToken());

            HexaMember socialYn = memberRepository.getWithRoles(googleMember.getEmail());
            googleMember.setSocialYn(socialYn.getSocialYn());
            List<LikeDTO>  like = likeRepository.findByMemberId(socialYn.getId());

            log.info("뭐냐?? 소셜{}",googleMember.getSocialYn());
            log.info("뭐냐?? like{}",like);

            String accessToken = JWTUtil.generateToken(Map.of("email", googleMember.getEmail()), 60);
            String refreshToken = JWTUtil.generateToken(Map.of("email", googleMember.getEmail()), 60 * 24); // 예: 24시간 유효
            Map<String, Object> response = Map.of(
                    "accessToken", accessToken,
                    "refreshToken", refreshToken,
                    "email", googleMember.getEmail(),
                    "roles", googleMember.getRoleNames(),
                    "socialYn", googleMember.getSocialYn(),
                    "like", like
            );
            log.info("구글 최종값 {}",response);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error during Google login", e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/emaillist")
    public List<String> getEmail(){
        List<String> emails = memberRepository.fineEmail();

        return emails;

    }
}
