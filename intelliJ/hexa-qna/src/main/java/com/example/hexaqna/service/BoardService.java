package com.example.hexaqna.service;

import com.example.hexaqna.dto.BoardDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BoardService {
    // 카테고리 별 게시판 조회
    Page<BoardDTO> getBoardsByCategory(String category, Pageable pageable);

    // 검색 결과 조회
    Page<BoardDTO> getSearchBoards(String category, String keyword, Pageable pageable);

    // 게시글 id 조회 및 조회시 조회수 증가
    BoardDTO getBoardCountById(Long id);

    // 게시글 생성 (관리자 only)
    BoardDTO createBoard(BoardDTO boardDTO);

    // 게시글 수정 (관리자 only)
    BoardDTO updateBoard(Long id, BoardDTO boardDTO);

    // FAQ 검색 및 필터링
    List<BoardDTO> searchBoard(String keyword, String category, Boolean isActive);

    // FAQ 삭제 (관리자용)
    BoardDTO deleteBoard(Long id);
}
