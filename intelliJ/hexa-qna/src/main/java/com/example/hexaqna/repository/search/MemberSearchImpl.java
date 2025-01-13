package com.example.hexaqna.repository.search;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.QHexaMember;
import com.example.hexaqna.domain.QQna;
import com.example.hexaqna.domain.Qna;
import com.example.hexaqna.dto.PageRequestDTO;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

public class MemberSearchImpl extends QuerydslRepositorySupport implements MemberSearch{
    public MemberSearchImpl() {
        super(HexaMember.class);
    }

    @Override
    public Page<HexaMember> searchMember(PageRequestDTO pageRequestDTO) {
        QHexaMember qmember = QHexaMember.hexaMember;
        JPQLQuery<HexaMember> query = from(qmember);
//        query.where(qna.title.contains("1"));

//        페이징처리 추가
        PageRequest pageable = PageRequest.of(
                pageRequestDTO.getPage()-1,
                pageRequestDTO.getSize(),
                Sort.by("id").ascending());
        this.getQuerydsl().applyPagination(pageable,query);
        List<HexaMember> list = query.fetch();

        long total = query.fetchCount();
        return new PageImpl<>(list, pageable, total);
    }
}
