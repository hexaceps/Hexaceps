import axios from 'axios'
<<<<<<< HEAD
=======
import jwtAxios from "../util/jwtUtil";
>>>>>>> FEATURE/ABOUT_ETC
import { API_SERVER_HOST } from './qnaApi'

const prefix = `${API_SERVER_HOST}/api/order`

export const createOrder = async(orderData) => {
    console.log("전송할 주문 데이터", orderData)
<<<<<<< HEAD
    const res = await axios.post(`${prefix}/`, orderData);
=======
    const res = await jwtAxios.post(`${prefix}/`, orderData);
>>>>>>> FEATURE/ABOUT_ETC
    console.log("api 호출 후 받은 결과 데이터", res.data);
    return res.data
};

export const getAllOrders = async() => {
<<<<<<< HEAD
    const res = await axios.get(`${prefix}/list`)
=======
    const res = await jwtAxios.get(`${prefix}/list`)
>>>>>>> FEATURE/ABOUT_ETC
    return res.data
};

export const getOrderById = async(orderId) => {
<<<<<<< HEAD
    const res = await axios.get(`${prefix}/o/${orderId}`, orderId)
=======
    const res = await jwtAxios.get(`${prefix}/o/${orderId}`, orderId)
>>>>>>> FEATURE/ABOUT_ETC
    return res.data
};

export const getOrdersByMemberId = async(memberId) => {
<<<<<<< HEAD
    const res = await axios.get(`${prefix}/m/${memberId}`, memberId)
=======
    const res = await jwtAxios.get(`${prefix}/m/${memberId}`, memberId)
>>>>>>> FEATURE/ABOUT_ETC
    return res.data
};