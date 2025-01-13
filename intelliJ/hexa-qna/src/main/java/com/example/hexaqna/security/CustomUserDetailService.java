package com.example.hexaqna.security;


import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.dto.GoogleMemberDTO;
import com.example.hexaqna.dto.KakaoMemberDTO;
import com.example.hexaqna.dto.MemberAgreeDTO;
import com.example.hexaqna.dto.MemberDTO;
import com.example.hexaqna.repository.HexaMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Slf4j
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final HexaMemberRepository hexaMemberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.info("시큐리티가 사용자 정보조회를 처리하는가? {}", email);

        // 사용자 정보 조회
        HexaMember member = hexaMemberRepository.getWithRoles(email);

        // 사용자가 존재하지 않을 경우 예외 처리
        if (member == null) {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + email);
        }

        // 공통 로직: 역할 정보 생성
        List<String> roleNames = member.getMemberRoleList().stream()
                .map(Enum::name) // Enum을 문자열로 변환
                .collect(Collectors.toList());

        // 일반 로그인 처리
        if ( member.getSocialYn() == 0) {
            return (UserDetails) createMemberDTO(member, roleNames);
        }

        // Google 로그인 처리
        if (member.getSocialYn() == 2) {
            return createGoogleMemberDTO(member, roleNames);
        }

        // Kakao 로그인 처리
        if (member.getSocialYn() == 1) {
            return createKakaoMemberDTO(member, roleNames);
        }

        // 기타 소셜 로그인의 경우 예외 처리
        throw new UsernameNotFoundException("알 수 없는 소셜 로그인 유형: " + member.getSocialYn());
    }

    // 일반 사용자 DTO 생성
    private MemberDTO createMemberDTO(HexaMember member, List<String> roleNames) {
        return MemberDTO.builder()
                .id(member.getId())
                .name(member.getName())
                .password(member.getPassword())
                .email(member.getEmail())
                .phoneNumber(member.getPhoneNumber())
                .address(member.getAddress())
                .newsletter(member.getNewsletter())
                .socialYn(member.getSocialYn())
                .nickname(member.getNickname())
                .activateYn(member.getActivateYn())
                .create_Date(member.getCreate_Date())
                .rank(member.getRank())
                .roleNames(roleNames)
                .memberAgrees(member.getMemberAgrees() != null ?
                        member.getMemberAgrees().stream()
                                .map(agree -> new MemberAgreeDTO(
                                        agree.isAn1(),
                                        agree.isAn2(),
                                        agree.isAn3(),
                                        agree.isAs1(),
                                        agree.isAs2()))
                                .collect(Collectors.toList()) :
                        Collections.emptyList()) // memberAgrees가 null이면 빈 리스트로 처리
                .build();
    }

    // Google 사용자 DTO 생성
    private GoogleMemberDTO createGoogleMemberDTO(HexaMember member, List<String> roleNames) {
        GoogleMemberDTO googleMemberDTO = new GoogleMemberDTO(
                member.getEmail(),
                member.getPassword(),
                roleNames
        );
        googleMemberDTO.setName(member.getName());
        //googleMemberDTO.setPicture(member.getProfileImage());
        return googleMemberDTO;
    }

    // Kakao 사용자 DTO 생성
    private KakaoMemberDTO createKakaoMemberDTO(HexaMember member, List<String> roleNames) {
        return new KakaoMemberDTO(
                member.getEmail(),
                member.getPassword(),
                member.getNickname(),
                member.getSocialYn(),
                roleNames
        );
    }
}
