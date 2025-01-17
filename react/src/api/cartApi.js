import axios from 'axios'
// import { API_SERVER_HOST } from './qnaApi'
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from '../serverEnv'

const prefix = `${API_SERVER_HOST}/api/product/cart`

// 장바구니 추가 및 수정
export const changeCart = async (cart) => {
    const { productId, amount, memberId, cartId } = cart;
    console.log("api로 들어왔어... 이제 장바구니 담고 장바구니 아이디 바덩")
    try {
      const res = await axios.post(`${prefix}/change`, { productId, amount, memberId, cartId });
      console.log("장바구니 api 가 제대로 갔겠지? "+ productId, amount, memberId, cartId)
      console.log("추가 또는 수정:", res);
      return res.data;  // cartId를 포함한 데이터 반환
    } catch (error) {
      console.error("Error in changeCart:", error);
      throw error;
    }
  };

// 멤버 아이디로 장바구니 목록 조회
export const getCartItems = async(memberId) => {
    const res = await axios.get(`${prefix}/m/${memberId}`)
    console.log("리스트 : ", res)
    return res.data
}

// localhost:8010/api/product/cart/c/12

//장바구니 항목 삭제
export const removeFromCart = async(cartId) => {
  console.log("CartId 가 삭제 됩니다 (cartAPI) " + cartId)
  const res = await axios.delete(`${prefix}/delete/${cartId}`)
  console.log("삭제 : ", res)
  return res.data
}