package com.example.hexaqna.service;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.MemberAgree;
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
                        .map(agree -> Arrays.asList(agree.isAn1(), agree.isAn2(), agree.isAn3(), agree.isAs1(), agree.isAs2())) // 예시로 Boolean 값을 리스트로 변환
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

        List<MemberAgree> memberAgrees = memberDTO.getMemberAgrees().stream()
                .map(agree -> new MemberAgree(agree.get(0), agree.get(1), agree.get(2), agree.get(3), agree.get(4))) // 예시로 Boolean 리스트를 MemberAgree 객체로 변환
                .collect(Collectors.toList());

        member.setMemberAgrees(memberAgrees);
        return member;
    }

}

