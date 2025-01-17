import axios from 'axios'
import jwtAxios from "../util/jwtUtil";
// export const API_SERVER_HOST = 'http://localhost:8010'
import { API_SERVER_HOST } from '../serverEnv'

const prefix = `${API_SERVER_HOST}/api/product/review/`

// localhost:8010/api/product/review/?productId=22
export const getReviewByProductId = async(productId) => {
    const res = await axios.get(`${prefix}` , {
        params : { productId : productId }
    })
    console.log("productId로 리뷰리스트 조회하기 {} ", res);
    return res.data
}

// localhost:8010/api/product/review/?memberId=10
export const getReviewByMemberId = async(memberId) => {
    const res = await axios.get(`${prefix}` , {
        params : { memberId : memberId }
    })
    console.log("memberId로 리뷰리스트 조회하기 {} ", res);
    return res.data
}

// 데이터추가 localhost:8010/api/product/review/
export const addReview = async(reviewData) => {
    console.log("API 호출전 데이터 확인", reviewData)
    const header = { headers: { "Content-Type": "multipart/form-data" } }
    const res = await jwtAxios.post(`${prefix}`, reviewData, header)
    console.log("리뷰등록 결과 reviewApi.js에서 확인하기 {} ", res);
    return res.data
}

// 데이터수정 localhost:8010/api/product/review/9
// 수정은 subject, reply 를 가지고 와서 불러 내고 관리자는 reply 만 수정, 유저는 subject 만 수정 하게 처리해야 함
export const modifyReview = async(reviewData) => {
    console.log("API 호출전 데이터 확인", reviewData)
    const header = { headers: { "Content-Type": "multipart/form-data" } }
    const res = await jwtAxios.put(`${prefix}${reviewData.reviewId}`, reviewData, header)
    console.log("리뷰수정 결과 reviewApi.js에서 확인하기 {} ", res);
    return res.data
}

// localhost:8010/api/product/review/?memberId=10
export const getAllReview = async() => {
    const res = await axios.get(`${prefix}list`)
    console.log("memberId로 리뷰리스트 조회하기 {} ", res);
    return res.data
}

// export const getOne = async(qno) => {
//     const res = await axios.get(`${prefix}/${qno}`)
//     console.log("조회하기",res);
//     return res.data
// }

// //list
// //http://localhost:8080/api/qna/list?page=3
// export const getList = async(pageParam,productId) => {
//     const {page, size} = pageParam
//     const res = await axios.get(`${prefix}/list/${productId}`, {params : {page:page, size:size}},productId)
//     return res.data
// }

// export const getListId = async(pageParam,id) => {
//     const {page, size} = pageParam
//     const res = await axios.get(`${prefix}/idList/${id}`, {params : {page:page, size:size}},id)
//     return res.data
// }

// // 데이터추가
// export const postAdd = async(qna,productId, id) => {
//     const res = await jwtAxios.post(`${prefix}/q/${productId}/${id}`, qna,productId,id)
//     return res.data
// }

// //답글달기 put  /r/qno
// export const replyOne = async(qna) => {
//     const res = await jwtAxios.put(`${prefix}/r/${qna.qno}`, qna)
//     return res.data
// }


// //수정 put  /qno
// export const putOne = async(qna) => {
//     const res = await jwtAxios.put(`${prefix}/${qna.qno}`, qna)
//     return res.data
// }

// //삭제  delete  /todo
// export const deleteOne = async(qna) => {
//     const res = await axios.delete(`${prefix}/${qna}`)
//     return res.data
// }



// export const checkPw = async (qno,pw) => {
//     const res = await jwtAxios.post(`${prefix}/checkPw/${qno}`,pw,qno);
//     return res.data
// }
