package com.example.hexaqna.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString(exclude = {"memberRoleList" })
public class HexaMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="member_id")
    private Long id;


    private String email;


    private String name;


    private String password;


    private String phoneNumber;

    private String address;

    private int newsletter;

    private int social_yn;


    private String nickname;


    private String rank;


    private String activate_yn;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime create_Date;


    //memberRoleList가 실제로 사용될 때 데이터를 로드
    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private List<MemberRole> memberRoleList = new ArrayList<>();

    //권한부여
    public void addRole(MemberRole memberRole){
        memberRoleList.add(memberRole);
    }

    //권한삭제
    public void clearRole(){
        memberRoleList.clear();
    }


    @OneToMany(mappedBy = "member_id", cascade = CascadeType.ALL)
    @JsonManagedReference("memberReference")
    private List<Qna> qnaList;

  //  @OneToMany(mappedBy =  "reply_id", cascade = CascadeType.ALL)
  //  @JsonManagedReference  //무한 루프 방지 이쪽이 부모임을 나타냄
 //   private List<Qna> replyList;

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setNewsletter(int newsletter) {
        this.newsletter = newsletter;
    }

    public void setSocial_yn(int social_yn) {
        this.social_yn = social_yn;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public void setActivate_yn(String activate_yn) {
        this.activate_yn = activate_yn;
    }

    public void setCreate_Date(LocalDateTime create_Date) {
        this.create_Date = create_Date;
    }

    public void setMemberRoleList(List<MemberRole> memberRoleList) {
        this.memberRoleList = memberRoleList;
    }

    public void setQnaList(List<Qna> qnaList) {
        this.qnaList = qnaList;
    }
}
