package com.example.hexaqna.controller;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.dto.LoginForm;
import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.dto.PageResponseDTO;
import com.example.hexaqna.dto.MemberDTO;
import com.example.hexaqna.repository.HexaMemberRepository;
import com.example.hexaqna.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/member")
public class HexaMemberController {
    private final MemberService memberService;
    private final HexaMemberRepository memberRepository;


    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginForm loginForm) {
        log.info("Attempting login for {}", loginForm.getEmail());

        boolean isAuthenticated = memberService.auth(loginForm.getEmail(), loginForm.getPassword());

        if (isAuthenticated) {
            log.info("Login successful for {}", loginForm.getEmail());
            return Map.of("success", "success");
        } else {
            log.warn("Login failed for {}", loginForm.getEmail());
            return Map.of("error", "error");
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



}
