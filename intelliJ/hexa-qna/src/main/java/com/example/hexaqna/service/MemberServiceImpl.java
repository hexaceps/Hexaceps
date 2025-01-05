package com.example.hexaqna.service;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.MemberAgree;
import com.example.hexaqna.dto.MemberAgreeDTO;
import com.example.hexaqna.dto.MemberDTO;
import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.dto.PageResponseDTO;
import com.example.hexaqna.repository.HexaMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final HexaMemberRepository memberRepository;


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

        member.setPassword(dto.getPassword());
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
        if (member != null && member.getPassword().equals(password)) {
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



}








