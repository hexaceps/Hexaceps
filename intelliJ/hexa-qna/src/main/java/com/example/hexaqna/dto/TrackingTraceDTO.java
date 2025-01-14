package com.example.hexaqna.dto;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TrackingTraceDTO {

    private Long traceId;
    private String status;
    private LocalDateTime updateDate;
    private String company;
    private String step;
    private String location;

}
