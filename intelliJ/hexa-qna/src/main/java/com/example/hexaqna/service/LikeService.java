package com.example.hexaqna.service;

import com.example.hexaqna.domain.HexaMember;
import com.example.hexaqna.domain.Like;
import com.example.hexaqna.domain.Product;
import com.example.hexaqna.dto.LikeDTO;
import com.example.hexaqna.repository.HexaMemberRepository;
import com.example.hexaqna.repository.LikeRepository;
import com.example.hexaqna.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final HexaMemberRepository hexaMemberRepository;
    private final ProductRepository productRepository;

    // 사용자 찜 목록 조회
    public List<LikeDTO> getMemberLikes(Long memberId) {
        log.info("getMemberLikes() 서비스 로직 시작 : "+memberId);
        Optional<HexaMember> memberInfo = hexaMemberRepository.findById(memberId);
        if (memberInfo.isEmpty()) {
            log.error("해당 유저로 조회되는 찜 상품이 없음 " + memberId);
            throw new IllegalArgumentException("해당 유저로 조회되는 찜 상품이 없습니다");
        }
        List<LikeDTO> likeDTOList = likeRepository.findByMemberId(memberInfo.get().getId());

        return likeDTOList;
    }
    private LikeDTO mapToDTO(Like like) {
        LikeDTO likeDTO = LikeDTO.builder()
                .likeId(like.getLikeId())
                .memberId(like.getMember().getId())
                .productId(like.getProduct().getProductId())
                .count(like.getCount())
                .build();
        return likeDTO;
    }

    // 찜 추가
    public LikeDTO addLike(Long memberId, Long productId) {
        log.info("addLike() 서비스 로직 시작 : "+memberId+", "+productId);
        LikeDTO addResult = null;
        Optional<HexaMember> memberInfo = hexaMemberRepository.findById(memberId);
        Optional<Product> productInfo = productRepository.findById(productId);
        if (memberInfo.isPresent() && productInfo.isPresent()) {
            HexaMember member = memberInfo.get();
            Product product = productInfo.get();
            Optional<Like> existLike = likeRepository.findByProductIdAndMemberId(member.getId(), product.getProductId());
            if (existLike.isPresent()) { // 찜이 이미 되어있는 경우
                Like like = existLike.get();
                likeRepository.save(like);
                addResult = mapToDTO(like);
                return addResult;
            } else { // 신규 찜 추가
                Like like = new Like();
                like.setProduct(product);
                like.setMember(member);
                likeRepository.save(like);
                addResult = mapToDTO(like);
                return addResult;
            }
        }
        return addResult;
    }

    // 찜 삭제
    public void removeLike(Long memberId, Long productId) {
        log.info("removeLike() 서비스 로직 시작 : "+memberId+", "+productId);
        Optional<HexaMember> memberInfo = hexaMemberRepository.findById(memberId);
        Optional<Product> productInfo = productRepository.findById(productId);
        if (memberInfo.isPresent() && productInfo.isPresent()) {
            HexaMember member = memberInfo.get();
            Product product = productInfo.get();
            Optional<Like> existLike = likeRepository.findByProductIdAndMemberId(member.getId(), product.getProductId());
            if (existLike.isPresent()) {
                Like like = existLike.get();
                likeRepository.delete(like);
            } else {
                log.error("삭제할 찜 상품이 없습니다 " + memberId + ", " + productId);
                throw new IllegalArgumentException("삭제할 찜 상품이 없습니다 " + memberId + ", " + productId);
            }
        }
    }

    // 상품의 찜 갯수 확인
    public Map<String, String> likeCountByProductId(Long productId) {
        int totalCount = likeRepository.countByProductId(productId);
        String result = Integer.toString(totalCount);
        return Map.of("totalLike", result);
    }
}
