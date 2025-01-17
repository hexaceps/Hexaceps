package com.example.hexaqna.service;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.dto.BoardDTO;
import com.example.hexaqna.repository.BoardRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class BoardServiceImplTest {
    @Autowired private BoardServiceImpl boardService;
    @Autowired private BoardRepository boardRepository;
    @Autowired
    private BoardServiceImpl boardServiceImpl;

    @Test
    void 게시판50개추가() {

        for (int i = 1; i < 31; i++) {
            HexaMember member = boardRepository.getMemberById(56L);
            log.info("member 닉네임 : " + member.getNickname());
            String category = (i % 2 == 0) ? "notice" : "faq";
            String transCategoty = (category.contains("notice")) ? "[공지사항]" : "[FAQ]";

            BoardDTO boardDTO =  BoardDTO.builder()
                    .memberId(member.getId())
                    .category(category)
                    .title(transCategoty + " HEXACEPS 에서 안내 드립니다. - " + i)
                    .content("New content compose, 새로운 내용을 작성 중입니다. orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
                    .author(member.getNickname())
                    .createdAt(LocalDateTime.now())
                    .count(0)
                    .isActive(true)
                    // .tags()
                    .build();
            boardServiceImpl.createBoard(boardDTO);
        }
    }
}