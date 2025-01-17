package com.example.hexaqna.service;

import com.example.hexaqna.domain.MemberRole;
import com.example.hexaqna.dto.MemberAgreeDTO;
import com.example.hexaqna.dto.MemberDTO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@Slf4j
class MemberServiceImplTest {

    @Autowired MemberServiceImpl memberService;
    @Test
    void 멤버생성() {
        String[] si = {"서울특별시 ", "경기도 수원시 ", "경기도 성남시 ", "대전광역시 ", "부산광역시 "};
        String[] gu = {"북구 ", "동구 ", "남구 "};
        String[] gil = {"세종대왕로 ", "차범근로 ", "하나로 ", "케로로 ", "전통모란시장로 "};
        String[] firstName = {"민구", "석구", "민형", "순영", "선영", "미르", "영자", "진", "모란"};
        String[] lastName = {"손", "김", "이", "차", "박", "정", "설", "한"};
        String[] ranName = {"STAR_", "MARS_", "BANANA_", "LAP_", "MBTI_"};

        for (int i = 1; i < 91; i++){
            String address = (si[(i-1) % si.length]) + (gu[(i-1) % gu.length]) + (gil[(i-1) % gil.length]) + ((i*134)+i) + "-" + (i*13) + "길";
            String nickName = ranName[(i-1) % ranName.length] + "00" + i;
            String name = lastName[(i-1) % lastName.length] + firstName[(i-1) % firstName.length];
            List<String> role = new ArrayList<>();
            role.add(MemberRole.USER.toString());
            role.add(MemberRole.ADMIN.toString());
            role.add(MemberRole.MANAGER.toString());
            List<MemberAgreeDTO> agreeDTOList = new ArrayList<>();
            MemberAgreeDTO memberAgreeDTO = MemberAgreeDTO.builder()
                    .an1(true)
                    .an2(true)
                    .an3(true)
                    .as1(true)
                    .as2(true)
                    .build();
            agreeDTOList.add(memberAgreeDTO);

            MemberDTO memberDTO = MemberDTO.builder()
                    .email("ezen00"+i+"@aaa.com")
                    .name(name)
                    .password("1111")
                    .phoneNumber("010"+((int)(Math.random() * 9000) + 1000) + "" + ((int)(Math.random() * 9000) + 1000))
                    .address(address)
                    .newsletter(0)
                    .socialYn(0)
                    .nickname(nickName)
                    .activateYn("Y")
                    .rank("10")
                    .create_Date(LocalDateTime.now())
                    .build();
            memberDTO.setRoleNames(role);
            memberDTO.setMemberAgrees(agreeDTOList);
            memberService.register(memberDTO);
        }



    }
}