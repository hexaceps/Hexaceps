import axios from "axios";
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from './qnaApi'

// 기본 URL 설정
const BASE_URL = `${API_SERVER_HOST}/api/product/like`;

const likeApi = {
  // 사용자 찜 목록 조회
  getUserLikes: (userId) => jwtAxios.get(`${BASE_URL}/m/${userId}`),

  // 찜 추가
  addLike: (memberId, productId) =>
    jwtAxios.post(`${BASE_URL}/`, {
      memberId,
      productId
    }
  ),

  // 찜 삭제
  removeLike: (memberId, productId) =>
    jwtAxios.delete(`${BASE_URL}/delete`, {
      memberId,
      productId
    }
  ),

  // 찜 토글
  toggleLike: (userId, productId, categoryId) =>
    jwtAxios.post(`${BASE_URL}/toggle`, null, {
      params: { userId, productId, categoryId },
    }),

  // 특정 상품 찜 상태 확인
  isProductLiked: (userId, productId) =>
    jwtAxios.get(`${BASE_URL}/status`, {
      params: { userId, productId },
    }),
};

export default likeApi;
