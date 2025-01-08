package com.example.hexaqna.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ReviewDTO {

    private Long reviewId;
    private Long memberId;
    private Long productId;
    private String subject; // 원래 잘 구매 하던 사이트에서 사고 있었는데, 신생 사이트라 사용해 봤는데... 개 비싸네요. 담에 또 살께요
    private String reply; // 호갱님 감사합니다
    private int starRating; // 별이 다섯개
    private LocalDateTime createAt;
    private String uploadPicture;

}
