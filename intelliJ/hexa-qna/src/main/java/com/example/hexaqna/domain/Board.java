package com.example.hexaqna.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@ToString(exclude = {"memberId"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "memberId")
    @JsonBackReference("memberReference")
    private HexaMember memberId;

    private String category; // category 값은 notice or faq

    @Column(length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String author;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private int count;

    private boolean isActive = true;

    private String tags;

    public void setMemberId(HexaMember memberId) {this.memberId = memberId;}

    public void setCategory(String category) {
        this.category = category;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setAuthor(String author) {this.author = author;}

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public void setTags(String tags){
        this.tags = tags;
    }
}
