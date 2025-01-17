package com.example.hexaqna.dto;

import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardDTO {
    private Long id;
    private Long memberId;
    private String category; // category 값은 notice or faq

    @Column(length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int count;
    private boolean isActive;
    private String tags;
}
