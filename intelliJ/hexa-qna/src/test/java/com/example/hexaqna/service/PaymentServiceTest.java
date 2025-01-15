package com.example.hexaqna.service;

import com.example.hexaqna.domain.Payment;
import com.example.hexaqna.dto.PaymentDTO;
import com.example.hexaqna.repository.PaymentRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
@Slf4j
class PaymentServiceTest {
    @Autowired private PaymentService paymentService;
    @Autowired private PaymentRepository paymentRepository;
    @Test
    void 결제30건추가() {
        String[] status = {"결제대기중", "결제진행중", "결제확인중", "결제완료", "결제취소", "결제오류"};
        String[] vender = {"우리은행", "하나은행", "국민은행", "카캌오뱅크", "토스", "신한은행", "농협", "현대카드", "신한카드", "삼성카드"};
        String[] type = {"VISA", "MASTER", "AMEX", "JCB", "계좌이체", "QR전송"};

        for (int i = 1; i < 31; i++) {
            Long orderId = (long) i;
            String setStatus = status[(i-1) % status.length];
            String setVender = vender[(i-1) % vender.length];
            String setType = type[(i-1) % type.length];

            PaymentDTO paymentDTO = paymentService.fetchPaymentDetails(orderId);
            Payment payment = paymentService.dtoToEntity(paymentDTO);
            payment.setPaymentDate(LocalDateTime.now());
            payment.setPaymentStatus(setStatus);
            payment.setPaymentVender(setVender);
            payment.setPaymentType(setType);
            payment.setPaymentNumber(paymentService.generatePaymentNumber(paymentDTO));

            Payment savedPayment = paymentRepository.save(payment);
            log.info("테스트 결과 : {}",savedPayment.toString());
        }
    }
}