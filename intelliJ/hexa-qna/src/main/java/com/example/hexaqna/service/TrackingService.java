package com.example.hexaqna.service;

import com.example.hexaqna.dto.TrackingDTO;

import java.util.List;

public interface TrackingService {
    // 특정 결제 ID에 대한 배송 정보 조회
    List<TrackingDTO> getTrackingInfo(Long paymentId);

    // 배송 정보 저장
    Long saveTracking(TrackingDTO trackingDTO);
}
