package com.example.hexaqna.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@ToString(exclude = "Tracking")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TrackingTrace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "traceId")
    private Long traceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trackingId")
    @JsonBackReference("tracking-trace")
    private Tracking tracking;

    private String status; // 판매자 기준 배송 상태
    private LocalDateTime updateDate; // 업데이트 시간
    private String company; // 택배사
    private String step; // 택배사 기준 배송 상태
    private String location; // 현재 위치

    public void setLocation(String location) {
        this.location = location;
    }

    public void setStep(String step) {
        this.step = step;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public void setUpdateDate(LocalDateTime updateDate) {
        this.updateDate = updateDate;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTracking(Tracking tracking) {
        this.tracking = tracking;
    }
}
