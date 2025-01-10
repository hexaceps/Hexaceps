package com.example.hexaqna.repository;

import com.example.hexaqna.domain.Tracking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrackingRepository extends JpaRepository<Tracking, Long> {
    List<Tracking> findByPayment_PaymentId(Long paymentId);
}
