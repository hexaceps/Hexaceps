package com.example.hexaqna.dto;

import lombok.*;

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

    private int count = 0;
}
