package com.example.hexaqna.controller;

import com.example.hexaqna.dto.TrackingDTO;
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

    @GetMapping("/{paymentId}")
    public List<TrackingDTO> getTrackingInfo(@PathVariable("paymentId") Long paymentId) {
        return trackingService.getTrackingInfo(paymentId);
    }

    @PostMapping("/")
    public Long saveTracking(@RequestBody TrackingDTO trackingDTO) {
        return trackingService.saveTracking(trackingDTO);
    }
}
