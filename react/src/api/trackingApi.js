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
    const res = await axios.post(`${prefix}/`, trackingData)
    console.log("리뷰등록 결과 reviewApi.js에서 확인하기 {} ", res);
    return res.data
}

// localhost:8010/api/order/tracking/list
export const getAllTrackingList = async() => {
    const res = await axios.get(`${prefix}/list/`)
    console.log("admin에서 전체 트래킹 리스트 조회하기 {} ", res);
    return res.data
}

// 데이터추가 localhost:8010/api/order/tracking/update/
export const updateTrackingInfo = async(trackingData) => {
    console.log("배송지 업데이트 API 호출전 확인", trackingData)
    const res = await axios.put(`${prefix}/update/`, trackingData)
    console.log("배송지 업데이트 결과 확인하기 {} ", res);
    return res.data
}