package com.example.hexaqna.service;

import com.example.hexaqna.domain.Payment;
import com.example.hexaqna.domain.Tracking;
import com.example.hexaqna.domain.TrackingTrace;
import com.example.hexaqna.dto.TrackingDTO;
import com.example.hexaqna.dto.TrackingTraceDTO;
import com.example.hexaqna.repository.PaymentRepository;
import com.example.hexaqna.repository.TrackingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.function.LongToIntFunction;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TrackingService {

    private final TrackingRepository trackingRepository;
    private final PaymentRepository paymentRepository;

    // 트래킹정보 조회
    public List<TrackingDTO> getTrackingListByAll(){
        List<Tracking> trackingList = trackingRepository.findAll();
        List<TrackingDTO> trackingDTOList = trackingList.stream()
                .map(list -> (entityToDTO(list.getId())))
                .collect(Collectors.toList());
        return trackingDTOList;
    }

    // 회원 ID로 배송 리스트 조회 (Tracking과 TrackingTrace 함께 조회)
    public List<TrackingDTO> getTrackingListByMemberId(Long memberId) {
        // 회원 ID로 Payment 목록 조회
        List<Payment> payments = paymentRepository.findPaymentsByMemberId(memberId);
        if (payments == null || payments.isEmpty()) {
            log.error("해당 회원의 결제 내역이 존재하지 않습니다. memberId: {}", memberId);
            return List.of();
        }
        // 각 Payment의 paymentId로 TrackingDTO 생성
        return payments.stream()
                .map(payment -> {
                    try { // 결제 ID로 배송 정보 조회
                        TrackingDTO trackingDTO = getTrackingByPaymentId(payment.getPaymentId());
                        return trackingDTO;
                    } catch (Exception e) {
                        log.error("결제 ID {}에 대한 Tracking 정보 조회 중 오류 발생: {}", payment.getPaymentId(), e.getMessage());
                        return null;
                    }
                })
                .filter(trackingDTO -> trackingDTO != null) // null 값 제거
                .collect(Collectors.toList());
    }

    // 결제 ID로 배송 정보 조회 (Tracking과 TrackingTrace 함께 조회)
    public TrackingDTO getTrackingByPaymentId(Long paymentId) {
        Tracking trakcing = trackingRepository.getTrakcingByPaymentId(paymentId);
        if (trakcing.getPayment() == null) {
            log.error("결제 정보가 조회 되지 않습니다. 결제 내역을 확인해 주세요");
        }
        TrackingDTO resultList = entityToDTO(trakcing.getId());
        TrackingDTO saveResult = entityToDTO(resultList.getId());
        return saveResult;
    }

    // 배송 정보 저장 (Tracking 생성 시 TrackingTrace를 자동으로 관리)
    @Transactional
    public TrackingDTO saveTracking(TrackingDTO trackingDTO) {
        String[] companyList = {"DHL", "FEDEX", "UPS", "한진택배", "대한통운", "로젠택배", "우체국택배"};
        String[] locationList = {"미국오레건", "한국인천항", "옥천물류센터", "성남우편집중국", "성남중원구"};
        Payment payment = paymentRepository.findById(trackingDTO.getPaymentId()).orElse(null);
        if(payment == null) {
            log.error("결제 정보가 조회 되지 않습니다. 결제 내역을 확인해 주세요");
        }
        Tracking tracking = Tracking.builder()
                .trackingId(trackingIdGenerator(payment.getPaymentId()))
                .payment(payment)
                .member(payment.getMember())
                .build();
        TrackingTrace traceList = TrackingTrace.builder()
                .status("배송확인중")
                .company(companyList[(int) (payment.getPaymentId() % companyList.length)])
                .step("송장확인")
                .location(locationList[(int) (payment.getProduct().getProductId() % locationList.length)])
                .updateDate(LocalDateTime.now())
                .build();
        tracking.addTrackingTrace(traceList);
        Tracking result = trackingRepository.save(tracking);
        log.info("저장 결과 번호 : {} ", result.getId());
        TrackingDTO saveResult = entityToDTO(result.getId());
        return saveResult;
    }

    // 배송 정보 업데이트 TrackingTrace에 추가
    public TrackingDTO updateTrackingList(TrackingTraceDTO trackingDTO) {
        Tracking trackingInfo = trackingRepository.findById(trackingDTO.getId()).orElse(null);
        if(trackingInfo == null) {
            log.error("배송 정보가 조회 되지 않습니다. 배송번호를 확인해 주세요");
        }
        TrackingTrace traceList = TrackingTrace.builder()
                .status(trackingDTO.getStatus())
                .company(trackingDTO.getCompany())
                .step(trackingDTO.getStep())
                .location(trackingDTO.getLocation())
                .updateDate(LocalDateTime.now())
                .build();
        trackingInfo.addTrackingTrace(traceList);
        Tracking result = trackingRepository.save(trackingInfo);
        TrackingDTO resultList = entityToDTO(result.getId());
        return resultList;
    }

    // trackingNumber 생성기
    public String trackingIdGenerator(Long paymentId) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss");
        String trackingCreateDate = LocalDateTime.now().format(formatter);
        String trackingNumber = String.format("%s_%d", trackingCreateDate, paymentId);
        return trackingNumber;
    }

    // entityToDTO
    public TrackingDTO entityToDTO(Long trackingId) {
        Tracking tracking = trackingRepository.findByIdWithTraces(trackingId).orElse(null);
        if (tracking == null) {
            log.error("Tracking 정보가 조회되지 않았습니다. id: {}", trackingId);
            return null;
        }
        log.info("id {}", tracking.getId());
        log.info("trackingId {}", tracking.getTrackingId());
        log.info("status {}", tracking.getTrackingTraces().get(0).getStatus());
        TrackingDTO trackingDTO = TrackingDTO.builder()
                .id(tracking.getId())
                .trackingId(tracking.getTrackingId())
                .paymentId(tracking.getPayment().getPaymentId())
                .memberId(tracking.getMember().getId())
                .build();
        List<TrackingTraceDTO> trackingTraceDTOList = tracking.getTrackingTraces().stream()
                .map(trace -> TrackingTraceDTO.builder()
                        .id(trackingDTO.getId())
                        .traceId(trace.getTraceId())
                        .status(trace.getStatus())
                        .company(trace.getCompany())
                        .step(trace.getStep())
                        .location(trace.getLocation())
                        .updateDate(trace.getUpdateDate())
                        .build())
                .toList();
        trackingDTO.setTrackingTraces(trackingTraceDTOList);
        return trackingDTO;
    }

    // 배송 ID로 조회 (Tracking과 TrackingTrace 함께 반환)
    @Transactional(readOnly = true)
    public Optional<Tracking> getTrackingById(Long id) {
        return trackingRepository.findById(id);
    }

//    // 배송 정보 업데이트
//    @Transactional
//    public Tracking updateTracking(Long id, Tracking updatedTracking) {
//        return trackingRepository.findById(id).map(tracking -> {
//            tracking.setTrackingId(updatedTracking.getTrackingId());
//            tracking.setTrackingTraces(updatedTracking.getTrackingTraces());
//            return trackingRepository.save(tracking);
//        }).orElseThrow(() -> new IllegalArgumentException("Tracking not found with id: " + id));
//    }
//
//    // TrackingTrace 추가 (Tracking ID를 이용해 TrackingTrace 추가)
//    @Transactional
//    public Tracking addTrackingTrace(Long trackingId, TrackingTrace trackingTrace) {
//        return trackingRepository.findById(trackingId).map(tracking -> {
//            tracking.addTrackingTrace(trackingTrace);
//            return trackingRepository.save(tracking);
//        }).orElseThrow(() -> new IllegalArgumentException("Tracking not found with id: " + trackingId));
//    }
}
