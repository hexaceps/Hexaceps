package com.example.hexaqna.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;


import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Qna {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="qna_number")
    private Long qno;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id")
    @JsonBackReference("memberReference")
    private HexaMember member_id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    @JsonBackReference("productReference")
    private Product product_id;

    @NotEmpty
    private String password;

    public void setMember_id(HexaMember member_id) {
        this.member_id = member_id;
    }

    public void setProduct_id(Product product_id) {
        this.product_id = product_id;
    }

    @Column(length = 50)
    @NotEmpty
    private String subject;

    @Column(columnDefinition = "TEXT")
    @NotEmpty
    private String content;

    private int secret;
/*
    @ManyToOne
    @JoinColumn(name="reply_id")
    private HexaMember reply_id;
*/
    private String reply_id;

    @Column(columnDefinition = "TEXT")
    private String reply;

    public void setReply_id(String reply_id) {
        this.reply_id = reply_id;
    }

    private int reply_at;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime reply_Date;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime qna_Date;



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

    public void setReply_at(int reply_at) {
        this.reply_at = reply_at;
    }

    public void setReply_Date(LocalDateTime reply_Date) {
        this.reply_Date = reply_Date;
    }

    public void setQna_Date(LocalDateTime qna_Date) {
        this.qna_Date = qna_Date;
    }



}
