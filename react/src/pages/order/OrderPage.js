import React, {useEffect} from 'react'
import axios from 'axios'
import { useParams} from 'react-router-dom'
import OrderComponent from '../../components/order/OrderComponent'

export const OrderPage = () => {
  const {cartId} = useParams();  // URL 파라미터에서 cartId를 추출
  console.log("주문페이지에서 useparam으로 받은 장바구니 ID : " + cartId)

  // useEffect(() => {
  //   // cartId를 사용해 주문 정보를 가져오는 API 호출
  //   fetchOrderDetails(cartId);
  // }, [cartId]);

  // const fetchOrderDetails = async (cartId) => {
  //   try {
  //     const response = await axios.get(`/api/order/${cartId}`);
  //     console.log("OrderPage.js에서 getApi를 호출 했습니다 : ", response.data);
  //     // 주문 페이지에 관련 데이터 표시
  //   } catch (error) {
  //     console.error("Error fetching order details:", error);
  //   }
  // };
  // console.log("장바구니 api 정보를 받아 주문페이지로 들어왔습니다 : ", cartId);
  return (
    <>
        <OrderComponent cartId ={ cartId }/>
    </>
  )
}

export default OrderPage
