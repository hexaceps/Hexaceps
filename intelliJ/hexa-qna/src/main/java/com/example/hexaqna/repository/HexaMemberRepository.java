package com.example.hexaqna.repository;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.dto.MemberDTO;
import com.example.hexaqna.repository.search.MemberSearch;
import com.example.hexaqna.repository.search.QnaSearch;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface HexaMemberRepository extends JpaRepository<HexaMember, Long>, MemberSearch {

    //이메일 동일 확인
    @EntityGraph(attributePaths = {"memberRoleList"})
    @Query("select c from HexaMember c where c.email = :email")
    HexaMember getWithRoles(@Param("email")String email);




    //로그인후 email로 정보가져오기
    @EntityGraph(attributePaths = {"memberRoleList"})
    @Query("select c from HexaMember c where c.email = :email")
    HexaMember getMemberInfo(@Param("email")String email);

    @EntityGraph(attributePaths = {"memberRoleList"})
    @Query("select c.socialYn from HexaMember c where c.email = :email")
    HexaMember findSocialYnByEmail(@Param("email")String email);


    @Query("select c.email from HexaMember c where c.newsletter = 1 ")
    List<String> fineEmail();

    Optional<HexaMember> getHexaMemberByKakaoId(String kakaoId);
}
