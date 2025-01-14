package com.example.hexaqna.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Tracking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paymentId")
    private Payment payment; // Payment 정보 가져다 쓸 예정

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private HexaMember member; // Payment 정보 가져다 쓸 예정

    private String trackingId; // 송장번호

    @OneToMany(mappedBy = "tracking", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @Builder.Default // trackingList 테이블 생성
    @JsonBackReference("trackingReference")
    private List<TrackingTrace> trackingTraces = new ArrayList<>();

    // 서비스에 TrackingTrace 에 넣을 함수 작성 (돌아가는지 확인 필요)
    public void addTrackingTrace(TrackingTrace trackingTrace) {
        trackingTraces.add(trackingTrace);
        trackingTrace.setTracking(this);
    }
}