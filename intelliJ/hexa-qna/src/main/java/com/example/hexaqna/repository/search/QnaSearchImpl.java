package com.example.hexaqna.repository.search;

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

public class QnaSearchImpl extends QuerydslRepositorySupport implements QnaSearch{



    public QnaSearchImpl() {
        super(Qna.class);
    }

    @Override
    public Page<Qna> searchQna(PageRequestDTO pageRequestDTO) {

        QQna qna = QQna.qna;
        JPQLQuery<Qna> query = from(qna);
//        query.where(qna.title.contains("1"));

//        페이징처리 추가
        PageRequest pageable = PageRequest.of(
                pageRequestDTO.getPage()-1,
                pageRequestDTO.getSize(),
                Sort.by("qno").descending());
        this.getQuerydsl().applyPagination(pageable,query);
        List<Qna> list = query.fetch();

        long total = query.fetchCount();
        return new PageImpl<>(list, pageable, total);




    }
}

