package com.example.hexaqna.dto;

import com.example.hexaqna.domain.MemberAgree;
import com.example.hexaqna.domain.ProductImage;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MemberDTO {

    private Long id;



    private String name;


    private String password;

    private String email;


    private String phoneNumber;


    private String address;


    private int newsletter;


    private int socialYn;


    private String nickname;


    private String activateYn;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime create_Date;

    private String rank;

    private List<String> roleNames = new ArrayList<>();

    private List<List<Boolean>> memberAgrees = new ArrayList<>();;


}

