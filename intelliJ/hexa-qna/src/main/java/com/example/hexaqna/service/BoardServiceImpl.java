package com.example.hexaqna.service;

import com.example.hexaqna.domain.Board;
import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.dto.BoardDTO;
import com.example.hexaqna.repository.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Builder
@Slf4j
public class BoardServiceImpl implements BoardService{
    private final BoardRepository boardRepository;

    // 카테고리 별로 조회 하는 서비스 추가
    @Override
    public Page<BoardDTO> getBoardsByCategory(String category, Pageable pageable) {
        Page<Board> boards = boardRepository.findByCategory(category, pageable);
        log.info("getBoardsByCategory : {}", boards.toString());
        return boards.map(this::mapToDTO);
    }

    // 키워드 별로 조회 하는 서비스 추가 (카테고리 값을 함께 받아서 필터 처럼 적용)
    @Override
    public Page<BoardDTO> getSearchBoards(String category, String keyword, Pageable pageable) {
        Page<Board> boards = boardRepository.searchByCategoryAndKeyword(category, keyword, pageable);
        return boards.map(this::mapToDTO);
    }

    // id 로 게시글 조회 및 조회 하는 경우에 view count 증가 하는 서비스 구현
    @Override
    @Transactional
    public BoardDTO getBoardCountById(Long id) {
        boardRepository.incrementCount(id);
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board not found : "+id));
        return mapToDTO(board);
    }

    // 게시글 생성 서비스 추가
    @Override
    @Transactional
    public BoardDTO createBoard(BoardDTO boardDTO) {
        HexaMember memberInfo = boardRepository.getMemberById(boardDTO.getMemberId());
        String nickname = memberInfo.getNickname();
        Board board = Board.builder()
                // .memberId(boardRepository.getMemberById(boardDTO.getMemberId()))
                .memberId(memberInfo)
                .category(boardDTO.getCategory())
                .title(boardDTO.getTitle())
                .content(boardDTO.getContent())
                .author(nickname)
                //.author(boardRepository.getMemberById(boardDTO.getMemberId()).getNickname())
                .createdAt(LocalDateTime.now())
                // .updatedAt(boardDTO.getUpdatedAt())
                .count(0) // 조회수 init
                .isActive(true)
                .tags(boardDTO.getTags())
                .build();

        Board savedBoard = boardRepository.save(board);

        return mapToDTO(savedBoard);
    }

    // 게시글 업데이트 서비스 추가
    @Override
    @Transactional
    public BoardDTO updateBoard(Long id, BoardDTO boardDTO) {
        Board existBoard = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board not found : "+ id));
        existBoard.setTitle(boardDTO.getTitle());
        existBoard.setContent(boardDTO.getContent());
        existBoard.setUpdatedAt(LocalDateTime.now());
        existBoard.setIsActive(boardDTO.isActive());
        existBoard.setTags(boardDTO.getTags());

        Board updatedBoard = boardRepository.save(existBoard);

        return mapToDTO(updatedBoard);
    }

    // Entity 정보를  DTO로 변환 해서 리턴 (조회를 위해서)
    private BoardDTO mapToDTO(Board board) {
        BoardDTO boardDTO = BoardDTO.builder()
                .id(board.getId())
                .memberId(board.getMemberId().getId())
                .category(board.getCategory())
                .title(board.getTitle())
                .content(board.getContent())
                .author(board.getAuthor())
                .createdAt(board.getCreatedAt())
                .updatedAt(board.getUpdatedAt())
                .count(board.getCount())
                .tags(board.getTags())
                .build();
//        BoardDTO boardDTO = new BoardDTO();
//        boardDTO.setMemberId(board.getMemberId().getId());
//        boardDTO.setId(board.getId());
//        boardDTO.setCategory(board.getCategory());
//        boardDTO.setTitle(board.getTitle());
//        boardDTO.setContent(board.getContent());
//        boardDTO.setAuthor(board.getAuthor());
//        boardDTO.setCreatedAt(board.getCreatedAt());
//        boardDTO.setUpdatedAt(board.getUpdatedAt());
//        boardDTO.setCount(board.getCount());
//        boardDTO.setTags(board.getTags());
//        boardDTO.setActive(board.isActive());

        return boardDTO;
    }

    // 검색 및 필터링
    public List<BoardDTO> searchBoard(String keyword, String category, Boolean isActive) {
        if (keyword == null || keyword.trim().isEmpty()) {
            keyword = "";
        }
        return boardRepository.searchWithFilters(keyword, category, isActive);
    }

    // 삭제 (관리자용)
    @Override
    @Transactional
    public BoardDTO deleteBoard(Long id) {
        Optional<Board> boardOptional = boardRepository.findById(id);

        if (boardOptional.isPresent()) {
            Board board = boardOptional.get();
            boardRepository.deleteById(id);
            return mapToDTO(board); // 삭제된 항목의 정보를 반환
        } else {
            throw new RuntimeException("Board not found with ID: " + id);
        }
    }
}
