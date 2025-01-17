package com.example.hexaqna.service;

import com.example.hexaqna.domain.Board;
import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.dto.BoardDTO;
import com.example.hexaqna.dto.PageRequestDTO;
import com.example.hexaqna.dto.PageResponseDTO;
import com.example.hexaqna.repository.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Builder
@Slf4j
public class BoardServiceImpl implements BoardService{
    private final BoardRepository boardRepository;

    // 카테고리 별로 조회 후 페이징 처리 해서 넘겨주는 서비스 로직 (25.1.6 수정)
    @Override
    public PageResponseDTO<BoardDTO> getBoardsByCategory(String category, PageRequestDTO pageRequestDTO) {

        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage()-1,
                pageRequestDTO.getSize(), sort
        );
        Page<Board> result = boardRepository.selectList(category, pageable);

        List<BoardDTO> boardDTOList = result.stream().map(board -> BoardDTO.builder()
                .memberId(board.getId())
                .category(board.getCategory())
                .author(board.getAuthor())
                .title(board.getTitle())
                .content(board.getContent())
                .createdAt(board.getCreatedAt())
                .updatedAt(board.getUpdatedAt())
                .count(board.getCount())
                .isActive(board.isActive())
                .id(board.getId())
                .build()
        ).toList();
        long totalCount = result.getTotalElements();

        return  PageResponseDTO.<BoardDTO>withAll()
                .dtoList(boardDTOList)
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }

    // Admin 용 전체 리스트 조회
    public PageResponseDTO<BoardDTO> getBoardsByAll(PageRequestDTO pageRequestDTO) {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage()-1,
                pageRequestDTO.getSize(), sort
        );
        Page<Board> result = boardRepository.findAll(pageable);

        List<BoardDTO> boardDTOList = result.stream().map(board -> BoardDTO.builder()
                .memberId(board.getId())
                .category(board.getCategory())
                .author(board.getAuthor())
                .title(board.getTitle())
                .content(board.getContent())
                .createdAt(board.getCreatedAt())
                .updatedAt(board.getUpdatedAt())
                .count(board.getCount())
                .isActive(board.isActive())
                .id(board.getId())
                .build()
        ).toList();
        long totalCount = result.getTotalElements();

        return  PageResponseDTO.<BoardDTO>withAll()
                .dtoList(boardDTOList)
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }


    // 키워드 별로 조회 하는 서비스 추가 (사용X 25.1.6)
//    @Override
//    public Page<BoardDTO> getSearchBoards(String category, String keyword, Pageable pageable) {
//        Page<Board> boards = boardRepository.searchByCategoryAndKeyword(category, keyword, pageable);
//        return boards.map(this::mapToDTO);
//    }

    // 검색 및 필터링
    @Override
    public List<BoardDTO> searchBoardByKeyword(String category, String keyword) { // Boolean isActive 사용X
        if (keyword == null || keyword.trim().isEmpty()) {
            keyword = "";
        }
        List<Board> boardList = boardRepository.searchByKeyword(category, keyword);
        log.info("검색 결과 리턴, 리스트 갯수 : " + boardList.size());
        List<BoardDTO> boardDTOList = boardList.stream().map(board -> BoardDTO.builder()
                        .id(board.getId())
                        .memberId(board.getId())
                        .author(board.getAuthor())
                        .title(board.getTitle())
                        .content(board.getContent())
                        .category(board.getCategory())
                        .createdAt(board.getCreatedAt())
                        .count(board.getCount())
                        .updatedAt(board.getUpdatedAt())
                        .isActive(board.isActive())
                        .tags(board.getTags())
                        .build())
                .collect(Collectors.toList());
        log.info("BoardDTOList 리스트 결과 : " + boardDTOList);
        return  boardDTOList; // boardRepository.searchByKeyword(keyword, category);
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
        log.info("DTO 데이터 확인 : {}", boardDTO.toString());
        Board existBoard = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board not found : "+ id));
        existBoard.setTitle(boardDTO.getTitle());
        existBoard.setContent(boardDTO.getContent());
        existBoard.setCategory(boardDTO.getCategory());
        existBoard.setUpdatedAt(LocalDateTime.now());
        // existBoard.setIsActive(boardDTO.isActive());
        // existBoard.setTags(boardDTO.getTags());
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
        return boardDTO;
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
