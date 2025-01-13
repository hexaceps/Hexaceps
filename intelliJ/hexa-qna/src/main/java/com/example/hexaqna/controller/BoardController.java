package com.example.hexaqna.controller;

import com.example.hexaqna.dto.BoardDTO;
import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.dto.PageResponseDTO;
import com.example.hexaqna.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
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
    public PageResponseDTO<BoardDTO> getBoardsByCategory(@RequestParam("category") String category, @ModelAttribute PageRequestDTO pageRequestDTO) {
        log.info("getBoardsByCategory() 컨트롤러 진입 : "+category);
        PageResponseDTO<BoardDTO> boardDTOList = boardService.getBoardsByCategory(category, pageRequestDTO);
        return boardDTOList;
    }

    // 게시판 Keyword 검색
    @GetMapping("/{category}")
    public List<BoardDTO> getSearchBoards(@PathVariable("category") String category, @RequestParam("keyword") String keyword) {
        log.info("getSearchBoards {category : " + category + ", keyword : " + keyword + "}");
        List<BoardDTO> boardDTOList = boardService.searchBoardByKeyword(category, keyword);
        return boardDTOList;
    }

    // 게시글 id로 조회 (조회수 기능 증가)
    @GetMapping("/id/{boardId}")
    public BoardDTO getBoardById(@PathVariable("boardId") Long id) {
        log.info("getBoardById");
        BoardDTO board = boardService.getBoardCountById(id);
        return board;
    }

    // 게시글 작성
    @PostMapping("/")
    public ResponseEntity<BoardDTO> createBoard(@RequestBody BoardDTO board) {
        BoardDTO createdBoard = boardService.createBoard(board);
        return new ResponseEntity<>(createdBoard, HttpStatus.CREATED);
    }

    // 게시글 수정
    @PutMapping("/update/{boardId}")
    public ResponseEntity<BoardDTO> updateBoard(@PathVariable("boardId") Long id, @RequestBody BoardDTO board) {
        BoardDTO updatedBoard = boardService.updateBoard(id, board);
        return new ResponseEntity<>(updatedBoard, HttpStatus.OK);
    }

    // 게시글 삭제 (사용하지 말것)
    @DeleteMapping("/delete/{id}")
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
