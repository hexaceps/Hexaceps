package com.example.hexaqna.service;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.MemberAgree;
import com.example.hexaqna.domain.MemberRole;
import com.example.hexaqna.dto.*;
import com.example.hexaqna.repository.HexaMemberRepository;
import com.example.hexaqna.repository.LikeRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final HexaMemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final LikeRepository likeRepository;
    private static final String GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";



    @Override
    public MemberDTO get(Long id) {
        Optional<HexaMember> result = memberRepository.findById(id);
        HexaMember member = result.orElseThrow();
        return entityToDTO(member);
    }


    @Override
    public Long register(MemberDTO dto) {
        log.info("dto {}", dto);
        log.info("Received memberAgrees: {}", dto.getMemberAgrees());
        String encodedPassword = passwordEncoder.encode(dto.getPassword());
        dto.setPassword(encodedPassword);
        dto.setActivateYn("1");
        HexaMember member = dtoToEntity(dto);
        log.info("Member entity to be saved: {}", member);

        List<MemberAgree> memberAgrees = new ArrayList<>();
        for (MemberAgreeDTO agree : dto.getMemberAgrees()) {
            MemberAgree memberAgree = MemberAgree.builder()
                    .an1(agree.isAn1())
                    .an2(agree.isAn2())
                    .an3(agree.isAn3())
                    .as1(agree.isAs1())
                    .as2(agree.isAs2())
                    .member(member)
                    .build();
            memberAgrees.add(memberAgree);
        }
        member.setMemberAgrees(memberAgrees);
        HexaMember result = memberRepository.save(member);
        return result.getId();
    }


    @Override
    public void modify(MemberDTO dto) {
        Optional<HexaMember> result = memberRepository.findById(dto.getId());

        HexaMember member = result.orElseThrow();

        member.setName(dto.getName());
        member.setPassword(passwordEncoder.encode(dto.getPassword()));
        member.setPhoneNumber(dto.getPhoneNumber());
        member.setAddress(dto.getAddress());
        member.setNewsletter(dto.getNewsletter());
        member.setNickname(dto.getNickname());
        member.setRank(dto.getRank());
        member.setSocialYn(dto.getSocialYn());
        member.setActivateYn(dto.getActivateYn());

        memberRepository.save(member);
    }

    @Override
    public void remove(Long id) {
        memberRepository.deleteById(id);
    }

    @Override
    public boolean auth(String email, String password) {
        HexaMember member = memberRepository.getWithRoles(email);
        if (member != null && passwordEncoder.matches(password, member.getPassword())) {
            return true;
        }
        return false;
    }


    @Override
    public PageResponseDTO<MemberDTO> getlist(PageRequestDTO pageRequestDTO) {
        //가져온다, Qna의 리스트
        Page<HexaMember> result = memberRepository.searchMember(pageRequestDTO);

        List<MemberDTO> dtoList = result.get().map(member -> entityToDTO(member)).collect(Collectors.toList());

        PageResponseDTO<MemberDTO> responseDTO = PageResponseDTO.<MemberDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(result.getTotalElements())
                .build();

        return responseDTO;
    }


    @Override
    public GoogleMemberDTO getGoogleMember(String accessToken) {
        GoogleUserInfoDTO googleUserInfo = getGoogleUserInfoFromToken(accessToken);
        HexaMember existingMember = memberRepository.getWithRoles(googleUserInfo.getEmail());

        if (existingMember != null) {
            return new GoogleMemberDTO(existingMember.getEmail(), existingMember.getPassword(),
                    existingMember.getMemberRoleList().stream().map(MemberRole::name).collect(Collectors.toList()));
        }

        HexaMember newMember = makeGoogleMember(googleUserInfo);
        memberRepository.save(newMember);
        return new GoogleMemberDTO(newMember.getEmail(), newMember.getPassword(),
                newMember.getMemberRoleList().stream().map(MemberRole::name).collect(Collectors.toList()));
    }

    private GoogleUserInfoDTO getGoogleUserInfoFromToken(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(GOOGLE_USER_INFO_URL, HttpMethod.GET, entity, String.class);
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to fetch user info from Google");
        }

        return parseGoogleUserInfo(response.getBody());
    }

    private GoogleUserInfoDTO parseGoogleUserInfo(String userInfo) {
        try {
            return new ObjectMapper().readValue(userInfo, GoogleUserInfoDTO.class);
        } catch (Exception e) {
            log.error("Error parsing Google user info", e);
            throw new RuntimeException("Failed to parse Google user info", e);
        }
    }

    private HexaMember makeGoogleMember(GoogleUserInfoDTO googleUserInfo) {
        String tempPassword = passwordEncoder.encode(makeTempPassword());
        HexaMember member = HexaMember.builder()
                .email(googleUserInfo.getEmail())
                .name(googleUserInfo.getName())
                .password(tempPassword)
                .socialYn(2)
                .build();
        member.addRole(MemberRole.USER);
        return member;
    }





    @Override
    public KakaoMemberDTO getKakaoMember(String accessToken) {
        KakaoUserInfoDTO kakaoUserInfo = getNicknameFromKakaoAccessToken(accessToken);
        //토큰을 가져오나? 카카오 인포 code.code_api.dto.KakaoUserInfoDTO@2f3eb741
        log.info("카카오 인포 {}",kakaoUserInfo);

        Optional<HexaMember> result = memberRepository.getHexaMemberByKakaoId(kakaoUserInfo.getId());
        //기존 회원 경우 DTO로 변환 후 반환
        if(result.isPresent()){
            KakaoMemberDTO memberDTO = entityToDTOKakao(result.get());
            // Like 정보 추가
            List<LikeDTO> likeList = likeRepository.findByMemberId(result.get().getId());
            memberDTO.setLike(likeList);
            log.info("중복인데? {}",String.valueOf(memberDTO));
            return memberDTO;
        }
        //새로운 회원인 경우, 비밀번호 임의로 생성
        HexaMember socialMember = makeKakaoMember(kakaoUserInfo.getId(), kakaoUserInfo.getNackname());
        memberRepository.save(socialMember);
        KakaoMemberDTO memberDTO = entityToDTOKakao(socialMember);
        log.info("뭐가나와 ? {}",String.valueOf(socialMember));

        return memberDTO;
    }


    //id와 nickname을 뽑아내는 메서드
    private KakaoUserInfoDTO getNicknameFromKakaoAccessToken(String accessToken) {
        String kakaoGetUserURL = "https://kapi.kakao.com/v2/user/me";

        if(accessToken == null){
            throw new RuntimeException("Access Token is null");
        }
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer "+ accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<Object> entity = new HttpEntity<>(headers);

        //실제로 보내야 한다. UriComponentsBuilder를 사용한다.
        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(kakaoGetUserURL).build();

        //이때 나오는 정보가 LinkedHashMap 형태로 나온다.  { 안에 다시{가 있는 중첩 구문에 사용된다.{id=3846982796, connected_at=2024-12-23T06:29:31Z, properties={nickname=설재훈}, kakao_account={profile_nickname_needs_agreement=false, profile={nickname=설재훈, is_default_nickname=false}}} 이렇게 있어서 nickname 사용가능.
        ResponseEntity<LinkedHashMap> response = restTemplate.exchange(
                uriBuilder.toString(),
                HttpMethod.GET,
                entity,
                LinkedHashMap.class
        );
        log.info("response {}", response);

        //사용자 정보에서 아이디를 가져오자, nickname =설재훈 , id =3846982796
        LinkedHashMap<String, LinkedHashMap> bodyMap = response.getBody();
        String id = String.valueOf(bodyMap.get("id"));

        log.info("body {}", bodyMap);
        log.info("id {}", id);

        LinkedHashMap<String, String> properties = bodyMap.get("properties");
        String nickname = properties.get("nickname");
        log.info("properties {}", properties);
        log.info("nickname {}", nickname);

        return new KakaoUserInfoDTO(id, nickname);
    }

    //해당 닉네임을 가진 회원이 없다면 새로운 회원을 추가할 때 임의의 비밀번호를 만든다.
    private  String makeTempPassword(){
        StringBuffer buffer = new StringBuffer();

        for(int i =0 ; i <10; i++){
            buffer.append( (char) ((int)(Math.random()*55)+65));
        }
        return buffer.toString();
    }

    //소셜회원 만들기
    private HexaMember makeKakaoMember(String id, String nickname){
        String tempPassword = makeTempPassword();
        log.info("tempPassword: " + tempPassword);

        //회원만들기
        HexaMember member = HexaMember.builder()
                .email(id + "@aaa.com")
                .name("kakako"+id)
                .password(passwordEncoder.encode(tempPassword))
                .nickname(nickname)
                .socialYn(1)
                .kakaoId(id)
                .build();
        member.addRole(MemberRole.USER);
        return member;

    }



}








