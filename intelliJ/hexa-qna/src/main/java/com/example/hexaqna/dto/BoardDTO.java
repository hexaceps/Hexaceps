package com.example.hexaqna.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Builder
@Data
public class BoardDTO {
    private Long id;

    private Long memberId;

    //@Column(nullable = false)
    private String category; // category 값은 notice or faq

    //@Column(length = 100, nullable = false)
    private String title;

    //@Column(columnDefinition = "TEXT")
    private String content;

    private String author;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    //@Column(nullable = false)
    private int count;

    private boolean isActive;

    private String tags;
}
