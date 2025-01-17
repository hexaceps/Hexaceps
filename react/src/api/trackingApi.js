import axios from 'axios'
import jwtAxios from "../util/jwtUtil";
//export const API_SERVER_HOST = 'http://localhost:8010'
import { API_SERVER_HOST } from '../serverEnv'

const prefix = `${API_SERVER_HOST}/api/order/tracking`

// localhost:8010/api/order/tracking/m/7
export const getTrackingListByMemberId = async( memberId ) => {
    console.log("전달받은 memberId : " + memberId)
    const res = await axios.get(`${prefix}/m/${memberId}`)
    console.log("memberId로 리뷰리스트 조회하기 {} ", res);
    return res.data
}

// 데이터추가 localhost:8010/api/order/tracking/
export const createTrackingInfo = async(trackingData) => {
    console.log("API 호출전 데이터 확인", trackingData)
    const res = await jwtAxios.post(`${prefix}/`, trackingData)
    console.log("리뷰등록 결과 reviewApi.js에서 확인하기 {} ", res);
    return res.data
}

// // localhost:8010/api/product/review/?productId=22
// export const getReviewByProductId = async(productId) => {
//     const res = await axios.get(`${prefix}` , {
//         params : { productId : productId }
//     })
//     console.log("productId로 리뷰리스트 조회하기 {} ", res);
//     return res.data
// }

// // 데이터추가 localhost:8010/api/product/review/
// export const addReview = async(reviewData) => {
//     console.log("API 호출전 데이터 확인", reviewData)
//     const header = { headers: { "Content-Type": "multipart/form-data" } }
//     const res = await jwtAxios.post(`${prefix}`, reviewData, header)
//     console.log("리뷰등록 결과 reviewApi.js에서 확인하기 {} ", res);
//     return res.data
// }

// // 데이터수정 localhost:8010/api/product/review/9
// // 수정은 subject, reply 를 가지고 와서 불러 내고 관리자는 reply 만 수정, 유저는 subject 만 수정 하게 처리해야 함
// export const modifyReview = async(reviewData) => {
//     console.log("API 호출전 데이터 확인", reviewData)
//     const header = { headers: { "Content-Type": "multipart/form-data" } }
//     const res = await jwtAxios.post(`${prefix}`, reviewData, header)
//     console.log("리뷰수정 결과 reviewApi.js에서 확인하기 {} ", res);
//     return res.data
// }
