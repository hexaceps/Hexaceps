package com.example.hexaqna.controller;

import com.example.hexaqna.dto.PaymentDTO;
import com.example.hexaqna.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("/api/order/payment")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping("/list") // admin 용 전체 조회
    public List<PaymentDTO> getAllPaymentsList() {
        List<PaymentDTO> paymentListAll = paymentService.getPaymentListAll();
        return paymentListAll;
    }

    @GetMapping("/{memberId}") // 멤버아이디로 조회
    public List<PaymentDTO> getPaymentById(@PathVariable("memberId") Long memberId) {
        List<PaymentDTO> paymentsByMember = paymentService.getPaymentsByMemberId(memberId);
        return paymentsByMember;
    }
    
    @PostMapping("/")
    public PaymentDTO createPayment(@RequestBody PaymentDTO paymentDTO) {
        return paymentService.createPayment(paymentDTO);
    }

}
