package com.example.hexaqna.dto;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.Product;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class QnaDTO {


        private Long qno;

        //@JsonBackReference  // member_id와 reply_id가 hexamember를 동시에 사용하여 중첩되어 목록 불러오기시 무한 회귀에 빠진다. 이를 막고자 사용
        private HexaMember member_id;

        // @JsonBackReference
        private Product product_id;



        private String subject;


        private String content;



         private String password;

        private int secret;

        private String reply;

        private int reply_at;

        private String reply_id;

   //     @JsonBackReference  //자식임을 나타낸다.
 //       private HexaMember reply_id;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime reply_Date;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime qna_Date;


    }


