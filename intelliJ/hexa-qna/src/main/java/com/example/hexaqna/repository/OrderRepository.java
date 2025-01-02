package com.example.hexaqna.repository;

import com.example.hexaqna.domain.Order;
import com.example.hexaqna.repository.search.OrderSearch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository <Order, Long>, OrderSearch {
}
