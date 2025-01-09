import React, {useEffect} from 'react'
import axios from 'axios'
import { useParams} from 'react-router-dom'
import OrderComponent from '../../components/order/OrderComponent'

export const OrderPage = () => {
  const {cartId} = useParams();  // URL 파라미터에서 cartId를 추출

  useEffect(() => {
    // cartId를 사용해 주문 정보를 가져오는 API 호출
    fetchOrderDetails(cartId);
  }, [cartId]);

  const fetchOrderDetails = async (cartId) => {
    try {
      const response = await axios.get(`/api/order/${cartId}`);
      console.log("Order details:", response.data);
      // 주문 페이지에 관련 데이터 표시
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };
  console.log("결제 페이지에 진입 했습니다. cartId : ", cartId);
  return (
    <>
        <div>Order 페이지</div>
        {console.log("니가 카드 아이디면 컴퍼넌트로 고굇ㅇ : ", cartId)}
        <OrderComponent cartId ={ cartId }/>
    </>
  )
}

export default OrderPage
