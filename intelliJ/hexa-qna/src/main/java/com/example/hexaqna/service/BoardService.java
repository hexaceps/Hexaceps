package com.example.hexaqna.service;

import com.example.hexaqna.dto.BoardDTO;
import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.dto.PageResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BoardService {
    // 카테고리 별 게시판 조회
    PageResponseDTO<BoardDTO> getBoardsByCategory(String category, PageRequestDTO pageRequestDTO);

    // 검색 결과 조회
    // Page<BoardDTO> getSearchBoards(String category, String keyword, Pageable pageable);

    // Admin 용 전체 리스트 조회
    PageResponseDTO<BoardDTO> getBoardsByAll(PageRequestDTO pageRequestDTO);

    // 게시글 id 조회 및 조회시 조회수 증가
    BoardDTO getBoardCountById(Long id);

    // 게시글 생성 (관리자 only)
    BoardDTO createBoard(BoardDTO boardDTO);

    // 게시글 수정 (관리자 only)
    BoardDTO updateBoard(Long id, BoardDTO boardDTO);

    // Keyword 검색
    List<BoardDTO> searchBoardByKeyword(String keyword, String category); // Boolean isActive 사용하지 않음

    // FAQ 삭제 (관리자용)
    BoardDTO deleteBoard(Long id);
}
