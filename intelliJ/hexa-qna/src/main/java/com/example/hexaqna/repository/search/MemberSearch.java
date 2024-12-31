package com.example.hexaqna.repository.search;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.Qna;
import com.example.hexaqna.dto.PageRequestDTO;
import org.springframework.data.domain.Page;

public interface MemberSearch {
    Page<HexaMember> searchMember(PageRequestDTO pageRequestDTO);
}
