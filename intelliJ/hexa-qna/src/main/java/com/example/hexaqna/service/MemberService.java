package com.example.hexaqna.service;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.MemberRole;
import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.dto.PageResponseDTO;
import com.example.hexaqna.dto.MemberDTO;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.FetchType;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
                .social_yn(member.getSocial_yn())
                .nickname(member.getNickname())
                .activate_yn(member.getActivate_yn())
                .rank(member.getRank())
                .create_Date(member.getCreate_Date())
                .roleNames(member.getMemberRoleList().stream()
                        .map(role -> role.name())
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
                .social_yn(memberDTO.getSocial_yn())
                .nickname(memberDTO.getNickname())
                .activate_yn(memberDTO.getActivate_yn())
                .rank(memberDTO.getRank())
                .create_Date(LocalDateTime.now())
                .memberRoleList(List.of(MemberRole.USER))
                .build();
        return member;
    }

}

