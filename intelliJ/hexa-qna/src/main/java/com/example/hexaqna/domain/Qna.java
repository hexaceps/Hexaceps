package com.example.hexaqna.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;


import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@ToString(exclude = {"productId", "memberId"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Qna {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="qna_number")
    private Long qno;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "memberId")
    @JsonBackReference("member-qna")
    private HexaMember memberId;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "productId")
    @JsonBackReference("product-qna")
    private Product productId;
    private String password;
    @Column(length = 50)
    @NotEmpty
    private String subject;
    @Column(columnDefinition = "TEXT")
    @NotEmpty
    private String content;
    private int secret;
    private String replyId;
    @Column(columnDefinition = "TEXT")
    private String reply;
    private int replyAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime replyDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime qnaDate;

    public void setMemberId(HexaMember memberId) {
        this.memberId = memberId;
    }

    public void setProductId(Product productId) {
        this.productId = productId;
    }

    public void setReplyId(String replyId) {
        this.replyId = replyId;
    }


    public void setPassword(String password) {
        this.password = password;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setContent(String content) {
        this.content = content;
    }


    public void setSecret(int secret) {
        this.secret = secret;
    }


    public void setReply(String reply) {
        this.reply = reply;
    }

    public void setReplyAt(int replyAt) {
        this.replyAt = replyAt;
    }

    public void setReplyDate(LocalDateTime replyDate) {
        this.replyDate = replyDate;
    }

    public void setQnaDate(LocalDateTime qnaDate) {
        this.qnaDate = qnaDate;
    }
}
