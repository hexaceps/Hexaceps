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

    // 사용자 좋아용 목록 조회 (리스트 형태로 반환)
    public List<LikeDTO> getMemberLikes(Long memberId) {
        log.info("getMemberLikes() 서비스 로직 시작 : "+memberId);
        Optional<HexaMember> memberInfo = hexaMemberRepository.findById(memberId);
        List<LikeDTO> likeDTOList = likeRepository.findByMemberId(memberInfo.get().getId());

        for (LikeDTO list : likeDTOList) {
            List<String> imageList = likeRepository.findImageFilesByProductId(list.getProductId());
            list.setImageList(imageList); // 이미지 리스트 설정
        }
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

    // 상품 좋아요 선택 (memberId 와 productId 둘다 있어야 함)
    public LikeDTO addLike(Long memberId, Long productId) {
        log.info("addLike() 서비스 로직 시작 : "+memberId+", "+productId);
        LikeDTO addResult = null;
        Optional<HexaMember> memberInfo = hexaMemberRepository.findById(memberId);
        Optional<Product> productInfo = productRepository.findById(productId);
        if (memberInfo.isPresent() && productInfo.isPresent()) {
            HexaMember member = memberInfo.get();
            Product product = productInfo.get();
            Optional<Like> existLike = likeRepository.findByProductIdAndMemberId(member.getId(), product.getProductId());
            if (existLike.isPresent()) { // 좋아요가 이미 되어있는 경우
                Like like = existLike.get();
                likeRepository.delete(like);
            } else { // 새로운 좋아요 추가
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

    // 좋아요 삭제
    public void removeLike(Long memberId, Long productId) {
        log.info("removeLike() 서비스 로직 시작 : "+memberId+", "+productId);
        Optional<HexaMember> memberInfo = hexaMemberRepository.findById(memberId);
        log.info("멤버정보 {}" ,memberInfo);
        Optional<Product> productInfo = productRepository.findById(productId);
        log.info("상품정보 {}" ,productInfo);
        if (memberInfo.isPresent() && productInfo.isPresent()) {
            HexaMember member = memberInfo.get();
            Product product = productInfo.get();
            Optional<Like> existLike = likeRepository.findByProductIdAndMemberId(member.getId(), product.getProductId());
            log.info("라이크정보 {}" , existLike);
            if (existLike.isPresent()) {
                Like like = existLike.get();
                likeRepository.delete(like);
            } else {
                log.error("삭제할 좋아요 상품이 없습니다 " + memberId + ", " + productId);
                throw new IllegalArgumentException("삭제할 찜 상품이 없습니다 " + memberId + ", " + productId);
            }
        }
    }

    // 상품의 좋아요 갯수 확인 (productId로 조회)
    public Map<String, String> likeCountByProductId(Long productId) {
        int totalCount = likeRepository.countByProductId(productId);
        String result = Integer.toString(totalCount);
        return Map.of("likeCount", result);
    }
}
