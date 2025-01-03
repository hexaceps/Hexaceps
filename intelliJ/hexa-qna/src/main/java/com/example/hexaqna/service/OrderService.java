package com.example.hexaqna.service;

import com.example.hexaqna.dto.OrderRequestDTO;
import com.example.hexaqna.dto.OrderResponseDTO;
import com.example.hexaqna.dto.PageRequestDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface OrderService {
    OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO);
    List<OrderResponseDTO> getAllOrders();
    OrderResponseDTO getOrderById(Long orderId);
    List<OrderResponseDTO> getOrdersByMemberId(Long memberId);
    void deleteOrder(Long orderId);
    Page<OrderResponseDTO> searchOrders(PageRequestDTO pageRequestDTO);
}
