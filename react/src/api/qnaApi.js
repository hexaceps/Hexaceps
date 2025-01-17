import axios from 'axios'
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from '../serverEnv'
// export const API_SERVER_HOST = `http://localhost:3010`
const prefix = `${API_SERVER_HOST}/api/qna`

//특정번호의 qna조회npm install cross-env # port 
//http://localhost:8080/api/qna/1
export const getOne = async(qno) => {
    const res = await axios.get(`${prefix}/${qno}`)
    console.log("조회하기",res);
    return res.data
}

//list
//http://localhost:8080/api/qna/list?page=3
export const getList = async(pageParam,productId) => {
    const {page, size} = pageParam
    const res = await axios.get(`${prefix}/list/${productId}`, {params : {page:page, size:size}},productId)
    return res.data
}

export const getListId = async(pageParam,id) => {
    const {page, size} = pageParam
    const res = await axios.get(`${prefix}/idList/${id}`, {params : {page:page, size:size}},id)
    return res.data
}

// 데이터추가
export const postAdd = async(qna,productId, id) => {
    const res = await axios.post(`${prefix}/q/${productId}/${id}`, qna,productId,id)
    return res.data
}

//답글달기 put  /r/qno
export const replyOne = async(qna) => {
    const res = await axios.put(`${prefix}/r/${qna.qno}`, qna)
    return res.data
}


//수정 put  /qno
export const putOne = async(qna) => {
    const res = await axios.put(`${prefix}/${qna.qno}`, qna)
    return res.data
}

//삭제  delete  /todo
export const deleteOne = async(qna) => {
    const res = await axios.delete(`${prefix}/${qna}`)
    return res.data
}



export const checkPw = async (qno,pw) => {
    const res = await axios.post(`${prefix}/checkPw/${qno}`,pw,qno);
    return res.data
}


