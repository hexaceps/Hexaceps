package com.example.hexaqna.repository;

import com.example.hexaqna.domain.Tracking;
import com.example.hexaqna.dto.TrackingDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

public interface TrackingRepository extends JpaRepository<Tracking, Long> {

    // memberId 로 배송 리스트 조회
    @Query("select t from Tracking t where t.payment.member.id = :memberId")
    List<Tracking> getTrackingListByMemberId(@Param("memberId") Long memberId);

    // paymentId 로 배송 내역 조회
    @Query("select t from Tracking t left join fetch t.trackingTraces where t.payment.paymentId = :paymentId")
    Tracking getTrakcingByPaymentId(@Param("paymentId") Long paymentId);

    @Query("SELECT t FROM Tracking t left join fetch t.trackingTraces WHERE t.id = :trackingId")
    Optional<Tracking> findByIdWithTraces(@Param("trackingId") Long trackingId);
}

