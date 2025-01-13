import axios from "axios";
<<<<<<< HEAD
=======
import jwtAxios from "../util/jwtUtil";
>>>>>>> FEATURE/ABOUT_ETC
import { API_SERVER_HOST } from './qnaApi'

// 기본 URL 설정
const BASE_URL = `${API_SERVER_HOST}/api/product/like`;

const likeApi = {
  // 사용자 찜 목록 조회
<<<<<<< HEAD
  getUserLikes: (userId) => axios.get(`${BASE_URL}/m/${userId}`),

  // 찜 추가
  addLike: (memberId, productId) =>
    axios.post(`${BASE_URL}/`, {
=======
  getUserLikes: (userId) => jwtAxios.get(`${BASE_URL}/m/${userId}`),

  // 찜 추가
  addLike: (memberId, productId) =>
    jwtAxios.post(`${BASE_URL}/`, {
>>>>>>> FEATURE/ABOUT_ETC
      memberId,
      productId
    }
  ),

  // 찜 삭제
  removeLike: (memberId, productId) =>
<<<<<<< HEAD
    axios.delete(`${BASE_URL}/delete`, {
=======
    jwtAxios.delete(`${BASE_URL}/delete`, {
>>>>>>> FEATURE/ABOUT_ETC
      memberId,
      productId
    }
  ),

  // 찜 토글
  toggleLike: (userId, productId, categoryId) =>
<<<<<<< HEAD
    axios.post(`${BASE_URL}/toggle`, null, {
=======
    jwtAxios.post(`${BASE_URL}/toggle`, null, {
>>>>>>> FEATURE/ABOUT_ETC
      params: { userId, productId, categoryId },
    }),

  // 특정 상품 찜 상태 확인
  isProductLiked: (userId, productId) =>
<<<<<<< HEAD
    axios.get(`${BASE_URL}/status`, {
=======
    jwtAxios.get(`${BASE_URL}/status`, {
>>>>>>> FEATURE/ABOUT_ETC
      params: { userId, productId },
    }),
};

export default likeApi;
