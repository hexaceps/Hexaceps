package com.example.hexaqna.service;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.MemberAgree;
import com.example.hexaqna.domain.MemberRole;
import com.example.hexaqna.dto.*;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.FetchType;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public interface MemberService {

    //조회기능
    MemberDTO get(Long id);


    //    등록하기
    Long register(MemberDTO dto);

    //    수정하기
    void modify(MemberDTO dto);

    //    삭제하기
    void remove(Long id);

   boolean auth(String email, String password);

    PageResponseDTO<MemberDTO> getlist(PageRequestDTO pageRequestDTO);


    KakaoMemberDTO getKakaoMember(String accessToken);

    GoogleMemberDTO getGoogleMember(String accessToken);

    //java8버전부터는 default기능이 추가되어 기본기능을 설정해 줄 수 있다.
    //qna 엔티티를 DTO로 변환
    default MemberDTO entityToDTO(HexaMember member){

        MemberDTO memberDTO = MemberDTO.builder()
                .id(member.getId())
                .email(member.getEmail())
                .name(member.getName())
                .password(member.getPassword())
                .phoneNumber(member.getPhoneNumber())
                .address(member.getAddress())
                .newsletter(member.getNewsletter())
                .socialYn(member.getSocialYn())
                .nickname(member.getNickname())
                .activateYn(member.getActivateYn())
                .rank(member.getRank())
                .create_Date(member.getCreate_Date())
                .roleNames(member.getMemberRoleList().stream()
                        .map(role -> role.name())
                        .collect(Collectors.toList()))
                .memberAgrees(member.getMemberAgrees().stream()
                        .map(agree -> MemberAgreeDTO.builder()
                                .an1(agree.isAn1())
                                .an2(agree.isAn2())
                                .an3(agree.isAn3())
                                .as1(agree.isAs1())
                                .as2(agree.isAs2())
                                .build())
                        .collect(Collectors.toList()))
                .build();

        return memberDTO;
    }

    //qna DTO를 엔티티로 변환
    default HexaMember dtoToEntity(MemberDTO memberDTO){
        HexaMember member = HexaMember.builder()
                .id(memberDTO.getId())
                .email(memberDTO.getEmail())
                .name(memberDTO.getName())
                .password(memberDTO.getPassword())
                .phoneNumber(memberDTO.getPhoneNumber())
                .address(memberDTO.getAddress())
                .newsletter(memberDTO.getNewsletter())
                .socialYn(memberDTO.getSocialYn())
                .nickname(memberDTO.getNickname())
                .activateYn(memberDTO.getActivateYn())
                .rank(memberDTO.getRank())
                .create_Date(LocalDateTime.now())
                .memberRoleList(List.of(MemberRole.USER))
                .build();


        return member;
    }

    default KakaoMemberDTO entityToDTOKakao(HexaMember member){
        KakaoMemberDTO dto = new KakaoMemberDTO(
                member.getEmail(),
                member.getPassword(),
                member.getNickname(),
                member.getSocialYn(),
                member.getMemberRoleList().stream().map(memberRole -> memberRole.name()).collect(Collectors.toList())
        );
        return  dto;
    }

}

