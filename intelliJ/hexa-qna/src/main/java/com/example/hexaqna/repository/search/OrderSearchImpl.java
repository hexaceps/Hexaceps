package com.example.hexaqna.repository.search;

import com.example.hexaqna.domain.Order;
import com.example.hexaqna.domain.QOrder;
import com.example.hexaqna.dto.PageRequestDTO;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

public class OrderSearchImpl extends QuerydslRepositorySupport implements OrderSearch {

    public OrderSearchImpl() {
        super(Order.class);
    }

    @Override
    public Page<Order> searchOrders(PageRequestDTO pageRequestDTO) {
        QOrder qOrder = QOrder.order;

        JPQLQuery<Order> query = from(qOrder);

        // 페이징 처리
        PageRequest pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("orderId").descending() // 정렬 기준
        );

        // 페이징 적용
        this.getQuerydsl().applyPagination(pageable, query);

        // 결과 및 총 데이터 개수
        List<Order> resultList = query.fetch();
        long total = query.fetchCount();

        return new PageImpl<>(resultList, pageable, total);
    }
}
