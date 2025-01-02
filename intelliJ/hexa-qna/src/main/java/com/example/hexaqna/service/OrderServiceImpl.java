package com.example.hexaqna.service;

import com.example.hexaqna.domain.Order;
import com.example.hexaqna.domain.Product;
import com.example.hexaqna.dto.OrderResponseDTO;
import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.repository.OrderRepository;
import com.example.hexaqna.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderServiceImpl(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @Override
    public OrderResponseDTO createOrder(OrderResponseDTO orderDto) {
        Order order = new Order();

        // Product 조회 및 설정
        if (orderDto.getProductId() != null) {
            Product product = productRepository.findById(orderDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with ID: " + orderDto.getProductId()));
            order.setProduct(product);
        }

        // orderNumber 자동 생성
        if (orderDto.getOrderNumber() == null || orderDto.getOrderNumber().isEmpty()) {
            order.setOrderNumber("ORD-" + System.currentTimeMillis());
        } else {
            order.setOrderNumber(orderDto.getOrderNumber());
        }

        // 기타 Order 필드 설정
        order.setCartId(orderDto.getCartId());
        order.setProductPrice(orderDto.getProductPrice());
        order.setTotalPrice(orderDto.getTotalPrice());
        order.setOrderStatus(orderDto.getOrderStatus() != null ? orderDto.getOrderStatus() : "PENDING");
        order.setProductQuantity(orderDto.getProductQuantity());

        // Order 저장
        Order savedOrder = orderRepository.save(order);
        return convertToDTO(savedOrder);
    }

    @Override
    public List<OrderResponseDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponseDTO getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return convertToDTO(order);
    }

    @Override
    public OrderResponseDTO updateOrder(Long orderId, OrderResponseDTO orderDto) {
        Order existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (orderDto.getOrderNumber() != null) {
            existingOrder.setOrderNumber(orderDto.getOrderNumber());
        }
        if (orderDto.getProductId() != null) {
            Product product = productRepository.findById(orderDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with ID: " + orderDto.getProductId()));
            existingOrder.setProduct(product);
        }
        if (orderDto.getProductPrice() > 0) {
            existingOrder.setProductPrice(orderDto.getProductPrice());
        }
        if (orderDto.getTotalPrice() > 0) {
            existingOrder.setTotalPrice(orderDto.getTotalPrice());
        }
        if (orderDto.getOrderStatus() != null && !orderDto.getOrderStatus().isEmpty()) {
            existingOrder.setOrderStatus(orderDto.getOrderStatus());
        }
        if (orderDto.getProductQuantity() > 0) {
            existingOrder.setProductQuantity(orderDto.getProductQuantity());
        }

        Order savedOrder = orderRepository.save(existingOrder);
        return convertToDTO(savedOrder);
    }

    @Override
    public void deleteOrder(Long orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new RuntimeException("Order not found");
        }
        orderRepository.deleteById(orderId);
    }

    @Override
    public Page<Order> searchOrders(PageRequestDTO pageRequestDTO) {
        return orderRepository.searchOrders(pageRequestDTO);
    }

    private Order convertToEntity(OrderResponseDTO dto) {
        Order order = new Order();
        order.setOrderId(dto.getOrderId());
        order.setOrderNumber(dto.getOrderNumber());
        order.setCartId(dto.getCartId());
        order.setProductPrice(dto.getProductPrice());
        order.setTotalPrice(dto.getTotalPrice());
        order.setOrderStatus(dto.getOrderStatus());
        order.setProductQuantity(dto.getProductQuantity());
        return order;
    }

    private OrderResponseDTO convertToDTO(Order order) {
        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setOrderId(order.getOrderId());
        dto.setOrderNumber(order.getOrderNumber());

        // HexaMember 정보 설정
        if (order.getMember() != null) {
            dto.setMemberId(order.getMember().getId());
            dto.setMemberName(order.getMember().getName());
            dto.setMemberEmail(order.getMember().getEmail());
            dto.setMemberPhoneNumber(order.getMember().getPhoneNumber());
            dto.setMemberAddress(order.getMember().getAddress());
        }

        // Product 정보 설정
        if (order.getProduct() != null) {
            dto.setProductId(order.getProduct().getProductId());
            dto.setProductName(order.getProduct().getProductName());
            dto.setProductBrand(order.getProduct().getProductBrand());
        }

        dto.setProductPrice(order.getProductPrice());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setOrderStatus(order.getOrderStatus());
        dto.setProductQuantity(order.getProductQuantity());

        return dto;
    }
}
