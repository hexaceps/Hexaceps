import axios from 'axios'
import jwtAxios from "../util/jwtUtil";
// import { API_SERVER_HOST } from './qnaApi'
import { API_SERVER_HOST } from '../serverEnv'

const prefix = `${API_SERVER_HOST}/api/order`

export const createOrder = async(orderData) => {
    console.log("전송할 주문 데이터", orderData)
    const res = await axios.post(`${prefix}/`, orderData);
    console.log("api 호출 후 받은 결과 데이터", res.data);
    return res.data
};

export const getAllOrders = async() => {
    const res = await axios.get(`${prefix}/list`)
    return res.data
};

export const getOrderById = async(orderId) => {
    const res = await axios.get(`${prefix}/o/${orderId}`, orderId)
    return res.data
};

export const getOrdersByMemberId = async(memberId) => {
    const res = await axios.get(`${prefix}/m/${memberId}`, memberId)
    return res.data
};