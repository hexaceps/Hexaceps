<<<<<<< HEAD
package com.example.hexaqna.service;

import com.example.hexaqna.domain.Payment;
import com.example.hexaqna.domain.Tracking;
import com.example.hexaqna.dto.PaymentDTO;
import com.example.hexaqna.dto.TrackingDTO;
import com.example.hexaqna.repository.PaymentRepository;
import com.example.hexaqna.repository.TrackingRepository;
import com.example.hexaqna.service.TrackingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TrackingServiceImpl implements TrackingService {

    private final TrackingRepository trackingRepository;
    private final PaymentRepository paymentRepository;

    @Override
    public List<TrackingDTO> getTrackingInfo(Long paymentId) {
        List<Tracking> trackingList = trackingRepository.findByPayment_PaymentId(paymentId);
        return trackingList.stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Long saveTracking(TrackingDTO trackingDTO) {
        Long paymentId = trackingDTO.getPaymentId();
        Optional<Payment> result = paymentRepository.findById(paymentId);
        if(result.isPresent()){
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
            String paymentNumber = result.get().getPaymentNumber();
            Tracking tracking = dtoToEntity(trackingDTO);
            tracking.setTrackingId(paymentNumber+"-"+ LocalDateTime.now().format(formatter));
            Tracking trackingResult = trackingRepository.save(tracking);
            return trackingResult.getId();
        }
        return null;
    }

    private TrackingDTO entityToDTO(Tracking tracking) {
        return TrackingDTO.builder()
                .id(tracking.getId())
                .paymentId(tracking.getPayment().getPaymentId())
                .trackingId(tracking.getTrackingId())
                .status(tracking.getStatus())
                .updateDate(tracking.getUpdateDate())
                .company(tracking.getCompany())
                .step(tracking.getStep())
                .location(tracking.getLocation())
                .build();
    }

    private Tracking dtoToEntity(TrackingDTO trackingDTO) {
        Payment payment = Payment.builder().paymentId(trackingDTO.getPaymentId()).build(); // Payment 객체 생성
        return Tracking.builder()
                .trackingId(trackingDTO.getTrackingId())
                .status(trackingDTO.getStatus())
                .updateDate(trackingDTO.getUpdateDate())
                .company(trackingDTO.getCompany())
                .step(trackingDTO.getStep())
                .location(trackingDTO.getLocation())
                .payment(payment) // Payment 객체 설정
                .build();
    }

}
=======
package com.example.hexaqna.service;

import com.example.hexaqna.domain.Payment;
import com.example.hexaqna.domain.Tracking;
import com.example.hexaqna.dto.PaymentDTO;
import com.example.hexaqna.dto.TrackingDTO;
import com.example.hexaqna.repository.PaymentRepository;
import com.example.hexaqna.repository.TrackingRepository;
import com.example.hexaqna.service.TrackingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TrackingServiceImpl implements TrackingService {

    private final TrackingRepository trackingRepository;
    private final PaymentRepository paymentRepository;

    @Override
    public List<TrackingDTO> getTrackingInfo(Long paymentId) {
        List<Tracking> trackingList = trackingRepository.findByPayment_PaymentId(paymentId);
        return trackingList.stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Long saveTracking(TrackingDTO trackingDTO) {
        Long paymentId = trackingDTO.getPaymentId();
        Optional<Payment> result = paymentRepository.findById(paymentId);
        if(result.isPresent()){
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
            String paymentNumber = result.get().getPaymentNumber();
            Tracking tracking = dtoToEntity(trackingDTO);
            tracking.setTrackingId(paymentNumber+"-"+ LocalDateTime.now().format(formatter));
            Tracking trackingResult = trackingRepository.save(tracking);
            return trackingResult.getId();
        }
        return null;
    }

    private TrackingDTO entityToDTO(Tracking tracking) {
        return TrackingDTO.builder()
                .id(tracking.getId())
                .paymentId(tracking.getPayment().getPaymentId())
                .trackingId(tracking.getTrackingId())
                .status(tracking.getStatus())
                .updateDate(tracking.getUpdateDate())
                .company(tracking.getCompany())
                .step(tracking.getStep())
                .location(tracking.getLocation())
                .build();
    }

    private Tracking dtoToEntity(TrackingDTO trackingDTO) {
        Payment payment = Payment.builder().paymentId(trackingDTO.getPaymentId()).build(); // Payment 객체 생성
        return Tracking.builder()
                .trackingId(trackingDTO.getTrackingId())
                .status(trackingDTO.getStatus())
                .updateDate(trackingDTO.getUpdateDate())
                .company(trackingDTO.getCompany())
                .step(trackingDTO.getStep())
                .location(trackingDTO.getLocation())
                .payment(payment) // Payment 객체 설정
                .build();
    }

}
>>>>>>> FEATURE/ABOUT_ETC
