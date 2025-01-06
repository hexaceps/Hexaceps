package com.example.hexaqna.controller;

import com.example.hexaqna.dto.BoardDTO;
import com.example.hexaqna.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/board")
@Slf4j
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    // 카테고리 별로 게시판 조회
//    @GetMapping
//    public ResponseEntity<Page<BoardDTO>> getBoardsByCategory(@PathVariable("category") String category, Pageable pageable) {
//        log.info("getBoardsByCategory");
//        Page<BoardDTO> boards = boardService.getBoardsByCategory(category, pageable);
//        return new ResponseEntity<>(boards, HttpStatus.OK);
//    }
    @GetMapping
    public ResponseEntity<Page<BoardDTO>> getBoardsByCategory(@RequestParam String category, Pageable pageable) {
        log.info("getBoardsByCategory");
        Page<BoardDTO> boards = boardService.getBoardsByCategory(category, pageable);
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

    // 게시판 검색
    @GetMapping("/{category}/{keyword}/search")
    public ResponseEntity<Page<BoardDTO>> getSearchBoards(@PathVariable("category") String category, @PathVariable("keyword") String keyword, Pageable pageable) {
        log.info("getSearchBoards");
        Page<BoardDTO> boards = boardService.getSearchBoards(category, keyword, pageable);
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

    // 게시글 id로 조회 (조회수 기능 증가)
    @GetMapping("/{id}")
    public ResponseEntity<BoardDTO> getBoardById(@PathVariable Long id) {
        log.info("getBoardById");
        BoardDTO board = boardService.getBoardCountById(id);
        return new ResponseEntity<>(board, HttpStatus.OK);
    }

    // 게시글 작성
    @PostMapping("/")
    public ResponseEntity<BoardDTO> createBoard(@RequestBody BoardDTO board) {
        BoardDTO createdBoard = boardService.createBoard(board);
        return new ResponseEntity<>(createdBoard, HttpStatus.CREATED);
    }

    // 게시글 수정
    @PutMapping("{id}")
    public ResponseEntity<BoardDTO> updateBoard(@PathVariable Long id, @RequestBody BoardDTO board) {
        BoardDTO updatedBoard = boardService.updateBoard(id, board);
        return new ResponseEntity<>(updatedBoard, HttpStatus.OK);
    }

    // 게시글 삭제
    @DeleteMapping("{id}")
    public ResponseEntity<Map<String, String>> deleteFAQ(@PathVariable("id") Long id) {
        Map<String, String> response = new HashMap<>();
        try {
            BoardDTO deletedBoard = boardService.deleteBoard(id);

            if (deletedBoard != null) {
                response.put("message", id + "번 항목이 삭제되었습니다.");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }
        } catch (RuntimeException ex) {
            response.put("error", ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        response.put("message", id + "번 항목을 찾을 수 없습니다.");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
}
