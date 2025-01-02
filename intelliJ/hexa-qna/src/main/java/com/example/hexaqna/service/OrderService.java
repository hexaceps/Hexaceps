package com.example.hexaqna.service;

import com.example.hexaqna.domain.Order;
import com.example.hexaqna.dto.OrderResponseDTO;
import com.example.hexaqna.dto.PageRequestDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface OrderService {
    OrderResponseDTO createOrder(OrderResponseDTO orderResponseDTO);
    List<OrderResponseDTO> getAllOrders();
    OrderResponseDTO getOrderById(Long orderId);
    List<OrderResponseDTO> getOrdersByMemberId(Long memberId);
    void deleteOrder(Long orderId);
    Page<Order> searchOrders(PageRequestDTO pageRequestDTO);
}
