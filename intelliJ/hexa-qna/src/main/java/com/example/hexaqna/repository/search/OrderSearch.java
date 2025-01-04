package com.example.hexaqna.repository.search;

import com.example.hexaqna.domain.Order;
import com.example.hexaqna.dto.PageRequestDTO;
import org.springframework.data.domain.Page;

public interface OrderSearch {
    Page<Order> searchOrders(PageRequestDTO pageRequestDTO);
}
