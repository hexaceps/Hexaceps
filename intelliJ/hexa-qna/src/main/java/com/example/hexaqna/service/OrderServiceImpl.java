package com.example.hexaqna.service;

import com.example.hexaqna.domain.Cart;
import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.Order;
import com.example.hexaqna.domain.Product;
import com.example.hexaqna.dto.OrderRequestDTO;
import com.example.hexaqna.dto.OrderResponseDTO;
import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.repository.CartRepository;
import com.example.hexaqna.repository.HexaMemberRepository;
import com.example.hexaqna.repository.OrderRepository;
import com.example.hexaqna.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final HexaMemberRepository memberRepository;

    private final ProductRepository productRepository;
    private final CartRepository cartRepository;

    public OrderServiceImpl(OrderRepository orderRepository, HexaMemberRepository memberRepository, ProductRepository productRepository, CartRepository cartRepository) {
        this.orderRepository = orderRepository;
        this.memberRepository = memberRepository;
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
    }

    @Override
    public OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO) {
        HexaMember member = memberRepository.findById(orderRequestDTO.getMemberId())
                .orElseThrow(() -> new RuntimeException("Member not found with ID: " + orderRequestDTO.getMemberId()));

        Optional<Cart> cart = cartRepository.findById(orderRequestDTO.getCartId());
        Cart cartData = cart.get();
        Product product = cart.get().getProductId();
        // Product 조회 (기본 Product ID 사용)
        // Product product = productRepository.findById(1L) // 예: 기본 상품 ID 1
        //         .orElseThrow(() -> new RuntimeException("Default product not found"));

        Order order = new Order();
        order.setMember(member);
        order.setCartId(orderRequestDTO.getCartId());
        order.setProduct(product);
        order.setProductQuantity(cartData.getAmount());
        order.setProductPrice(product.getPrice());
        order.setTotalPrice(product.getPrice()*order.getProductQuantity());
        order.setOrderNumber("ORD-" + System.currentTimeMillis());
        order.setOrderStatus("READY");

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
    public List<OrderResponseDTO> getOrdersByMemberId(Long memberId) {
        return orderRepository.findByMemberId(memberId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteOrder(Long orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new RuntimeException("Order not found");
        }
        orderRepository.deleteById(orderId);
    }

    @Override
    public Page<OrderResponseDTO> searchOrders(PageRequestDTO pageRequestDTO) {
        Page<Order> orders = orderRepository.searchOrders(pageRequestDTO);
        List<OrderResponseDTO> dtoList = orders.getContent().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return new PageImpl<>(dtoList, PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize()), orders.getTotalElements());
    }


    private OrderResponseDTO convertToDTO(Order order) {
        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setOrderId(order.getOrderId());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setMemberId(order.getMember().getId());
        dto.setCartId(order.getCartId());

        if (order.getProduct() != null) {
            dto.setProductId(order.getProduct().getProductId());
            dto.setProductName(order.getProduct().getProductName());
            dto.setProductPrice(order.getProduct().getPrice());
        }

        dto.setProductQuantity(order.getProductQuantity());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setOrderStatus(order.getOrderStatus());

        return dto;
    }
}
