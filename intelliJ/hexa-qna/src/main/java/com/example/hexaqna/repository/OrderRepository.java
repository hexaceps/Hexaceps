package com.example.hexaqna.repository;

import com.example.hexaqna.domain.Order;
import com.example.hexaqna.repository.search.OrderSearch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long>, OrderSearch {
    List<Order> findByMemberId(Long memberId); // Member ID로 조회
}
