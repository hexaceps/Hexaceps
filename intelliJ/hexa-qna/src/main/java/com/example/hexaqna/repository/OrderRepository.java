package com.example.hexaqna.repository;

import com.example.hexaqna.domain.Order;
import com.example.hexaqna.repository.search.OrderSearch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long>, OrderSearch {
    List<Order> findByMemberId(Long memberId); // Member ID로 조회

    // Member ID와 Cart ID로 특정 주문 조회
    Optional<Order> findByMemberIdAndCartId(Long memberId, Long cartId);
}
