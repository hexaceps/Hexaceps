package com.example.hexaqna.dto;

import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TrackingDTO {

    private Long id;
    private Long paymentId; // id 를 받아서 payment 객체로 저장
    private Long memberId; // id 를 받아서 member 객체로 저장
    private String trackingId;

    // id 로 조회
    private List<TrackingTraceDTO> traceList = new ArrayList<>();

    // setTrackingTraces 메서드 추가
    public void setTrackingTraces(List<TrackingTraceDTO> traceList) {
        this.traceList = traceList;
    }
}
