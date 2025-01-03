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
    @ToString(exclude = {"memberRoleList"})
    public class HexaMember {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "memberId")
        private Long id;


        private String email;


        private String name;


        private String password;


        private String phoneNumber;

        private String address;

        private int newsletter;

        private int socialYn;


        private String nickname;


        private String rank;


        private String activateYn;



        @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
        @JsonManagedReference("memberAgreeReference")
        private List<MemberAgree> memberAgrees = new ArrayList<>();


        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime create_Date;


        //memberRoleList가 실제로 사용될 때 데이터를 로드
        @ElementCollection(fetch = FetchType.LAZY)
        @Builder.Default
        private List<MemberRole> memberRoleList = new ArrayList<>();

        //권한부여
        public void addRole(MemberRole memberRole) {
            memberRoleList.add(memberRole);
        }

        //권한삭제
        public void clearRole() {
            memberRoleList.clear();
        }


        @OneToMany(mappedBy = "memberId", cascade = CascadeType.ALL)
        @JsonManagedReference("memberReference")
        private List<Qna> qnaList;

        //  @OneToMany(mappedBy =  "reply_id", cascade = CascadeType.ALL)
        //  @JsonManagedReference  //무한 루프 방지 이쪽이 부모임을 나타냄
        //   private List<Qna> replyList;


        public void setQnaList(List<Qna> qnaList) {
            this.qnaList = qnaList;
        }

        public void setMemberRoleList(List<MemberRole> memberRoleList) {
            this.memberRoleList = memberRoleList;
        }

        public void setCreate_Date(LocalDateTime create_Date) {
            this.create_Date = create_Date;
        }

        public void setMemberAgrees(List<MemberAgree> memberAgrees) {
            this.memberAgrees = memberAgrees;
        }

        public void setActivateYn(String activateYn) {
            this.activateYn = activateYn;
        }

        public void setRank(String rank) {
            this.rank = rank;
        }

        public void setNickname(String nickname) {
            this.nickname = nickname;
        }

        public void setSocialYn(int socialYn) {
            this.socialYn = socialYn;
        }

        public void setNewsletter(int newsletter) {
            this.newsletter = newsletter;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public void setName(String name) {
            this.name = name;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }
