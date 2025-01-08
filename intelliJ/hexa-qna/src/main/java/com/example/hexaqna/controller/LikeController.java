package com.example.hexaqna.controller;

import com.example.hexaqna.dto.LikeDTO;
import com.example.hexaqna.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/product/like")
public class LikeController {
    private final LikeService likeService;

    @GetMapping("/m/{memberId}") // 사용자 별 찜 목록 조회
    public List<LikeDTO> getMemberLikes(@PathVariable("memberId") Long memberId) {
        log.info("사용자 찜 조회 시작 (컨트롤러) "+memberId);
        return likeService.getMemberLikes(memberId);
    }

    @GetMapping("/p/{productId}") // 상품 별 찜 전체 카운투 조회
    public Map<String, String> getProductLikes(@PathVariable("productId") Long productId) {
        return likeService.likeCountByProductId(productId);
    }

    @PostMapping("/") // 상품별 찜추가
    public LikeDTO addLikeProduct(@RequestBody LikeDTO likeDTO) { // Long memberId, Long productId
        log.info("리액트로 부터 받은 추가할 DTO 정보 : " + likeDTO.toString());
        Long productId = likeDTO.getProductId();
        Long memberId = likeDTO.getMemberId();
        return likeService.addLike(memberId, productId);
    }

    @DeleteMapping("/delete")
    public Map<String, String> deleteLikeProduct(@RequestBody LikeDTO likeDTO) {
        log.info("리액트로 부터 받은 삭제할 DTO 정보 : " + likeDTO.toString());
        Long productId = likeDTO.getProductId();
        Long memberId = likeDTO.getMemberId();
        likeService.removeLike(memberId, productId);
        return Map.of("status", "delete success");
    }
}
