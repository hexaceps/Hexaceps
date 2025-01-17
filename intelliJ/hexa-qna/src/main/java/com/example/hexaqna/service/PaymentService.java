package com.example.hexaqna.service;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.Order;
import com.example.hexaqna.domain.Payment;
import com.example.hexaqna.domain.Product;
import com.example.hexaqna.dto.PaymentDTO;
import com.example.hexaqna.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.ErrorResponseException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;

    // memberId로 결제리스트 조회
    public List<PaymentDTO> getPaymentsByMemberId(Long memberId) {
        log.info("getPaymentsByMemberId() 서비스 로직 시작");
        List<Payment> paymentList = paymentRepository.findPaymentsByMemberId(memberId);
        List<PaymentDTO> paymentDTOList = new ArrayList<>();
        paymentDTOList = paymentList.stream().map(this::entityToDto).toList();
        return paymentDTOList;
    }

    // 전체 결제리스트 조회 (admin용)
    public List<PaymentDTO> getPaymentListAll() {
        log.info("getPaymentListAll() 서비스 로직 시작");
        List<Payment> paymentList = paymentRepository.findAll();
        List<PaymentDTO> paymentDTOList = new ArrayList<>();
        paymentDTOList = paymentList.stream().map(this::entityToDto).toList();
        return paymentDTOList;
    }

    /*
        결제정보 생성
        결제 정보를 들고와야 되서, paymentForm으로 받아야 함
        paymentForm에는 최소한 orderId, paymentMethod, paymentVender 정보를 포함해야 함
     */
    public PaymentDTO createPayment(PaymentDTO paymentForm) {
        log.info("createPayment 3초 지연 후 결제 시작. Order ID: {}", paymentForm.getOrderId());

        try {
            Thread.sleep(3000); // 3초 (5000ms)
        } catch (InterruptedException e) {
            log.error("지연 처리 중 인터럽트 발생: {}", e.getMessage());
            Thread.currentThread().interrupt();
        }

        // 계좌번호나 카트번호를 1111111111111111 로 받으면 Exception 발생
        String errorCode = "123456123456" ;
        if (paymentForm.getTransferNumber().equals(errorCode)) {
            throw new ErrorResponseException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        PaymentDTO paymentDTO = fetchPaymentDetails(paymentForm.getOrderId());
        Payment payment = dtoToEntity(paymentDTO);

        payment.setPaymentDate(LocalDateTime.now());
        payment.setPaymentStatus("결제완료");
        payment.setPaymentNumber(generatePaymentNumber(paymentDTO));
        payment.setPaymentType(paymentForm.getPaymentType());
        payment.setPaymentVender(paymentForm.getPaymentVender());

        Payment savedPayment = paymentRepository.save(payment);
        return entityToDto(savedPayment);
    }

    /*
        아래 부터 메소드들은 서비스로직 구현에 편하게 사용하기 위해서 생성
     */
    // paymentNumber Generator
    public String generatePaymentNumber(PaymentDTO paymentDTO) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss");
        log.info("결제 번호 생성 중... productId : " + paymentDTO.getProductId() + ", productBrand : " + paymentDTO.getProductBrand() + ", memberId : " + paymentDTO.getMemberId());
        String paymentDate = LocalDateTime.now().format(formatter);
        Long pid = paymentDTO.getProductId() * 1001;
        Long uid = paymentDTO.getMemberId() * 1024;
        String brand = paymentDTO.getProductBrand();
        String paymentNumber = String.format("%s_%d_%s_%d", paymentDate, pid, brand, uid);
        return paymentNumber;
    }

    // orderId로 product, member, order 정보를 DTO에 저장
    public PaymentDTO fetchPaymentDetails(Long orderId) {
        Object[] orderDetail = paymentRepository.findAllDetailsByOrderId(orderId);
        if (orderDetail == null) {
            throw new IllegalArgumentException("OrderId 에서 조회할 내용이 없습니다");
        }

        String orderDetails = (String) orderDetail[0];
        log.info("Order details By Query result : {}", Arrays.toString(orderDetail));
        String[] details = orderDetails.split(",");

        PaymentDTO paymentDTO = PaymentDTO.builder()
                .orderId(orderId)
                .memberId(Long.parseLong(details[0]))
                .productId(Long.parseLong(details[1]))
                .productName(details[2])
                .productBrand(details[3])
                .price(Integer.parseInt(details[4]))
                .size(Integer.parseInt(details[5]))
                .name(details[6])
                .email(details[7])
                .address(details[8])
                .phoneNumber(details[9]) // 나중에 9번 부터 인덱스 변경
                .productQuantity(Integer.parseInt(details[10]))
                .productPrice(Integer.parseInt(details[11]))
                .totalPrice(Integer.parseInt(details[12]))
                .build();
        return paymentDTO;
    }

    // Payment To PaymentDTO 로 변환
    public PaymentDTO entityToDto(Payment payment) {
        PaymentDTO paymentDTO = PaymentDTO.builder()
                .paymentId(payment.getPaymentId())
                .paymentNumber(String.valueOf(payment.getPaymentNumber()))
                .paymentType(payment.getPaymentType())
                .paymentVender(payment.getPaymentVender())
                .paymentDate(payment.getPaymentDate())
                .paymentStatus(payment.getPaymentStatus())
                .memberId(payment.getPaymentId())
                .email(payment.getEmail())
                .name(payment.getName())
                .address(payment.getAddress())
                .phoneNumber(payment.getPhoneNumber())
                .productId(payment.getPaymentId())
                .productName(payment.getProductName())
                .productBrand(payment.getProductBrand())
                .size(payment.getSize())
                .price(payment.getPrice())
                .productImage(String.valueOf(payment.getProduct().getImageList().get(0).getFileName()))
                .orderId(payment.getOrder().getOrderId())
                .productQuantity(payment.getProductQuantity())
                .productPrice(payment.getProductPrice())
                .totalPrice(payment.getTotalPrice())
                .build();
        return paymentDTO;
    }

    // PaymentDTO TO Payment 로 변환
    public Payment dtoToEntity(PaymentDTO paymentDTO) {
        HexaMember member = paymentRepository.findMemberInfoByMemberId(paymentDTO.getMemberId());
        Product product = paymentRepository.findProductInfoByProductId(paymentDTO.getProductId());
        Order order = paymentRepository.findOrderInfoByOrderId(paymentDTO.getOrderId());
        Payment payment = Payment.builder()
                .paymentNumber(String.valueOf(paymentDTO.getPaymentNumber()))
                .paymentType(paymentDTO.getPaymentType())
                .paymentVender(paymentDTO.getPaymentVender())
                .paymentDate(paymentDTO.getPaymentDate())
                .paymentStatus(paymentDTO.getPaymentStatus())
                .member(member)
                .name(paymentDTO.getName())
                .address(paymentDTO.getAddress())
                .email(paymentDTO.getEmail())
                .phoneNumber(paymentDTO.getPhoneNumber())
                .product(product)
                .productName(paymentDTO.getProductName())
                .productBrand(paymentDTO.getProductBrand())
                .size(paymentDTO.getSize())
                .price(paymentDTO.getPrice())
                .order(order)
                .productQuantity(paymentDTO.getProductQuantity())
                .productPrice(paymentDTO.getProductPrice())
                .totalPrice(paymentDTO.getTotalPrice())
                .build();
        return payment;
    }
}
