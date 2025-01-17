package com.example.hexaqna.controller;

import com.example.hexaqna.dto.TrackingDTO;
import com.example.hexaqna.dto.TrackingTraceDTO;
import com.example.hexaqna.service.TrackingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order/tracking")
@RequiredArgsConstructor
@Slf4j
public class TrackingController {

    private final TrackingService trackingService;

    // 배송 추척리스트 생성 (paymentId로 생성)
    @PostMapping("/")
    public TrackingDTO createTrackingList(@RequestBody TrackingDTO trackingDTO) {
        log.info("createTrackingList를 리액트에서 받았습니다. paymentId : " + trackingDTO.getPaymentId());
        TrackingDTO trackingResult = trackingService.saveTracking(trackingDTO);
        return trackingResult;
    }
    // 배송 정보 업데이트 (id로 생성)
    @PutMapping("/update/")
    public TrackingDTO updateTrackingList(@RequestBody TrackingTraceDTO trackingDTO) {
        TrackingDTO trackingResult = trackingService.updateTrackingList(trackingDTO);
        return trackingResult;
    }

    // paymentId 기준으로 검색
    @GetMapping("/p/{paymentId}")
    public TrackingDTO getTrackingInfoByPaymentId(@PathVariable("paymentId") Long paymentId) {
        return trackingService.getTrackingByPaymentId(paymentId);
    }

    // memberId 기준으로 검색
    @GetMapping("/m/{memberId}")
    public List<TrackingDTO> getTrackingInfoByMemberId(@PathVariable("memberId") Long memberId) {
        return trackingService.getTrackingListByMemberId(memberId);
    }

    // 전체 배송 조회
    @GetMapping("/list/")
    public List<TrackingDTO> getTrackingList() {
        return trackingService.getTrackingListByAll();
    }
}
