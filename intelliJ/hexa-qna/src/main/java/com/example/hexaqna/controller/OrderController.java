package com.example.hexaqna.controller;

import com.example.hexaqna.dto.OrderRequestDTO;
import com.example.hexaqna.dto.OrderResponseDTO;
import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@Slf4j
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/")
    public ResponseEntity<OrderResponseDTO> createOrder(@RequestBody OrderRequestDTO orderRequestDTO) {
        if (orderRequestDTO.getMemberId() == null || orderRequestDTO.getCartId() == null) {
            throw new IllegalArgumentException("memberId and cartId must not be null");
        }
        return ResponseEntity.ok(orderService.createOrder(orderRequestDTO));
    }

    @GetMapping("/list") // 전체 주문 내역 조회 for admin
    public List<OrderResponseDTO> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/o/") // orderId 로 조회
    public ResponseEntity<OrderResponseDTO> getOrderById(@PathVariable("orderId") Long orderId) { // @PathVariable Long orderId
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    @GetMapping ("/m/")// memberId 로 조회 (params = "/memberId")
    public ResponseEntity<List<OrderResponseDTO>> getOrdersByMemberId(@PathVariable("memberId") Long memberId) {
        log.info("getOrdersByMemberId 조회 요청, 리액트 요청 유저 아이디 정보 : "+memberId);
        return ResponseEntity.ok(orderService.getOrdersByMemberId(memberId));
    }

    @DeleteMapping("/delete/{orderId}") // 사용하지 말것
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search") // ?? 왜 있는지
    public ResponseEntity<Page<OrderResponseDTO>> searchOrders(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageRequestDTO pageRequestDTO = new PageRequestDTO();
        pageRequestDTO.setPage(page);
        pageRequestDTO.setSize(size);
        return ResponseEntity.ok(orderService.searchOrders(pageRequestDTO));
    }
}
