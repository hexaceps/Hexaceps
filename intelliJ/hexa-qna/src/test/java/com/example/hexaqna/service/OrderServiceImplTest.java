package com.example.hexaqna.service;

import com.example.hexaqna.dto.OrderRequestDTO;
import com.example.hexaqna.repository.PaymentRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
class OrderServiceImplTest {

    @Autowired private OrderServiceImpl orderService;
    @Autowired private PaymentRepository paymentRepository;
    @Test
    void 주문30개추가() {
        for (int i = 1; i < 31; i++) {
            Long randomCartId = (long) (Math.random() * 30) + 1;
            Long memberId = paymentRepository.findMemberIdByCartId(randomCartId);
            OrderRequestDTO orderRequestDTO = new OrderRequestDTO();
            orderRequestDTO.setMemberId(memberId);
            orderRequestDTO.setCartId(randomCartId);
            orderService.createOrder(orderRequestDTO);
        }
    }
}