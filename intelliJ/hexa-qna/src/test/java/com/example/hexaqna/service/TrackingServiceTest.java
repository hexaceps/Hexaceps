package com.example.hexaqna.service;

import com.example.hexaqna.domain.Payment;
import com.example.hexaqna.domain.Tracking;
import com.example.hexaqna.domain.TrackingTrace;
import com.example.hexaqna.repository.PaymentRepository;
import com.example.hexaqna.repository.TrackingRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class TrackingServiceTest {

    @Autowired private TrackingService trackingService;
    @Autowired private PaymentRepository paymentRepository;
    @Autowired private TrackingRepository trackingRepository;

    @Test
    void 배송아이디생성() {
        String[] statusList = {"배송확인중", "수화물접수", "택배사이동중", "배송중", "고객전달완료", "고객확인완료"};
        String[] companyList = {"DHL", "FEDEX", "UPS", "한진택배", "대한통운", "로젠택배", "우체국택배"};
        String[] stepList = {"송장확인", "택배인수", "택배사이동", "간선상차", "물류허브", "간선하차", "배송지도착", "배송완료"};
        String[] locationList = {"미국오레건", "한국인천항", "옥천물류센터", "성남우편집중국", "성남중원구"};
        for (int i = 1; i < 25; i++) {
            Payment paymentInfo = paymentRepository.findById((long)i).get();
            Tracking tracking = Tracking.builder()
                    .trackingId(trackingService.trackingIdGenerator((long) i))
                    .member(paymentInfo.getMember())
                    .payment(paymentInfo)
                    .build();
            if(i%2==0){
                TrackingTrace step1 = TrackingTrace.builder()
                        .status(statusList[(i-1) % statusList.length])
                        .updateDate(LocalDateTime.now())
                        .company(companyList[(i-1) % companyList.length])
                        .step(stepList[(i-1) % stepList.length])
                        .location(locationList[(i-1) % locationList.length])
                        .build();
                tracking.addTrackingTrace(step1);
            } else {
                TrackingTrace step1 = TrackingTrace.builder()
                        .status(statusList[(3) % statusList.length])
                        .updateDate(LocalDateTime.now())
                        .company(companyList[(3) % companyList.length])
                        .step(stepList[(3) % stepList.length])
                        .location(locationList[(3) % locationList.length])
                        .build();
                tracking.addTrackingTrace(step1);
                TrackingTrace step2 = TrackingTrace.builder()
                        .status(statusList[(i-1) % statusList.length])
                        .updateDate(LocalDateTime.now())
                        .company(companyList[(i-1) % companyList.length])
                        .step(stepList[(i-1) % stepList.length])
                        .location(locationList[(i-1) % locationList.length])
                        .build();
                tracking.addTrackingTrace(step2);
            }
            trackingRepository.save(tracking);
        }
//        Tracking tracking1 = Tracking.builder()
//                .trackingId("TRACK001")
//                .build();
//        TrackingTrace trace1_1 = TrackingTrace.builder()
//                .status("Shipped")
//                .updateDate(LocalDateTime.now())
//                .company("DHL")
//                .step("Step 1")
//                .location("Seoul")
//                .build();
//        TrackingTrace trace1_2 = TrackingTrace.builder()
//                .status("In Transit")
//                .updateDate(LocalDateTime.now().plusDays(1))
//                .company("DHL")
//                .step("Step 2")
//                .location("Busan")
//                .build();
//        tracking1.addTrackingTrace(trace1_1);
//        tracking1.addTrackingTrace(trace1_2);
//        // 2. Tracking 2 생성
//        Tracking tracking2 = Tracking.builder()
//                .trackingId("TRACK002")
//                .build();
//        TrackingTrace trace2_1 = TrackingTrace.builder()
//                .status("Shipped")
//                .updateDate(LocalDateTime.now())
//                .company("FedEx")
//                .step("Step 1")
//                .location("Incheon")
//                .build();
//        tracking2.addTrackingTrace(trace2_1);
//        // 3. Tracking 3 생성
//        Tracking tracking3 = Tracking.builder()
//                .trackingId("TRACK003")
//                .build();
//        TrackingTrace trace3_1 = TrackingTrace.builder()
//                .status("Delivered")
//                .updateDate(LocalDateTime.now().plusDays(2))
//                .company("UPS")
//                .step("Final")
//                .location("Daegu")
//                .build();
//        tracking3.addTrackingTrace(trace3_1);

        // 저장
//        trackingService.saveTracking(tracking1);
//        trackingService.saveTracking(tracking2);
//        trackingService.saveTracking(tracking3);

        // 검증
        // List<Tracking> trackingList = trackingRepository.findAll();

//        Payment payment = paymentRepository.findById(1L).get();
//        TrackingTrace trackingTrace = TrackingTrace.builder()
//                .company("DHL")
//                .step("배송준비중")
//                .status("집하전")
//                .location("발송지대기")
//                .updateDate(LocalDateTime.now())
//                .build();
//
//        Tracking tracking = Tracking.builder()
//                .trackingId("tracking-test-001")
//                .payment(payment)
//
//                .build();

        // trackingService.addTrackingTrace(trackingTrace);

    }

}