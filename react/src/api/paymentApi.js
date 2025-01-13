import axios from 'axios'
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from './qnaApi'

const prefix = `${API_SERVER_HOST}/api/order/payment`

export const requestPayment = async(payData) => {
    console.log("결제 데이터 확인 requestPayment : ", payData)
    const res = await jwtAxios.post(`${prefix}/`, payData);
    console.log("결제 api 호출 후 받은 결과 데이터", res);
    return res.data
};

export const getAllOrders = async() => {
    const res = await jwtAxios.get(`${prefix}/list`)
    return res.data
};

export const getOrderById = async(orderId) => {
    const res = await jwtAxios.get(`${prefix}/o/${orderId}`, orderId)
    return res.data
};

export const getOrdersByMemberId = async(memberId) => {
    const res = await jwtAxios.get(`${prefix}/m/${memberId}`, memberId)
    return res.data
};