package com.example.hexaqna.dto;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LikeDTO {

    private Long likeId;

    private Long memberId;

    private Long productId;

    private String productName;

    private int price;

    private int count;

    private List<String> imageList; // 이미지 파일 이름 목록
}
