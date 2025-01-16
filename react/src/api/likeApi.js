import axios from "axios";
import jwtAxios from "../util/jwtUtil";
//import { API_SERVER_HOST } from './qnaApi'
import { API_SERVER_HOST } from '../serverEnv'

// 기본 URL 설정
const BASE_URL = `${API_SERVER_HOST}/api/product/like`;

const likeApi = {
  // 사용자 찜 목록 조회
  getUserLikes: (userId) =>  axios.get(`${BASE_URL}/m/${userId}`),

  // 찜 추가
  addLike: (memberId, productId) =>
    axios.post(`${BASE_URL}/`, {
      memberId,
      productId
    }
  ),

  // 찜 삭제
  removeLike: (memberId, productId) =>
    axios.delete(`${BASE_URL}/delete`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        memberId,
        productId,
      }
    })
,  

  // 찜 토글
  toggleLike: (userId, productId, categoryId) =>
    axios.post(`${BASE_URL}/toggle`, null, {
      params: { userId, productId, categoryId },
    }),

  // 특정 상품 찜 상태 확인
  isProductLiked: (userId, productId) =>
    axios.get(`${BASE_URL}/p/${productId}`, {
      params: { userId, productId },
    }),
};

export default likeApi;
