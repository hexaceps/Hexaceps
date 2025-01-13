import axios from 'axios'
<<<<<<< HEAD
=======
import jwtAxios from "../util/jwtUtil";
>>>>>>> FEATURE/ABOUT_ETC
export const API_SERVER_HOST = 'http://localhost:8010'
const prefix = `${API_SERVER_HOST}/api/qna`

//특정번호의 qna조회npm install cross-env # port 
//http://localhost:8080/api/qna/1
export const getOne = async(qno) => {
<<<<<<< HEAD
    const res = await axios.get(`${prefix}/${qno}`)
=======
    const res = await jwtAxios.get(`${prefix}/${qno}`)
>>>>>>> FEATURE/ABOUT_ETC
    console.log("조회하기",res);
    return res.data
}

//list
//http://localhost:8080/api/qna/list?page=3
export const getList = async(pageParam,productId) => {
    const {page, size} = pageParam
<<<<<<< HEAD
    const res = await axios.get(`${prefix}/list/${productId}`, {params : {page:page, size:size}},productId)
=======
    const res = await jwtAxios.get(`${prefix}/list/${productId}`, {params : {page:page, size:size}},productId)
>>>>>>> FEATURE/ABOUT_ETC
    return res.data
}

export const getListId = async(pageParam,id) => {
    const {page, size} = pageParam
<<<<<<< HEAD
    const res = await axios.get(`${prefix}/idList/${id}`, {params : {page:page, size:size}},id)
=======
    const res = await jwtAxios.get(`${prefix}/idList/${id}`, {params : {page:page, size:size}},id)
>>>>>>> FEATURE/ABOUT_ETC
    return res.data
}

// 데이터추가
export const postAdd = async(qna,productId, id) => {
<<<<<<< HEAD
    const res = await axios.post(`${prefix}/q/${productId}/${id}`, qna,productId,id)
=======
    const res = await jwtAxios.post(`${prefix}/q/${productId}/${id}`, qna,productId,id)
>>>>>>> FEATURE/ABOUT_ETC
    return res.data
}

//답글달기 put  /r/qno
export const replyOne = async(qna) => {
<<<<<<< HEAD
    const res = await axios.put(`${prefix}/r/${qna.qno}`, qna)
=======
    const res = await jwtAxios.put(`${prefix}/r/${qna.qno}`, qna)
>>>>>>> FEATURE/ABOUT_ETC
    return res.data
}


//수정 put  /qno
export const putOne = async(qna) => {
<<<<<<< HEAD
    const res = await axios.put(`${prefix}/${qna.qno}`, qna)
=======
    const res = await jwtAxios.put(`${prefix}/${qna.qno}`, qna)
>>>>>>> FEATURE/ABOUT_ETC
    return res.data
}

//삭제  delete  /todo
export const deleteOne = async(qna) => {
<<<<<<< HEAD
    const res = await axios.delete(`${prefix}/${qna}`)
=======
    const res = await jwtAxios.delete(`${prefix}/${qna}`)
>>>>>>> FEATURE/ABOUT_ETC
    return res.data
}



export const checkPw = async (qno,pw) => {
<<<<<<< HEAD
    const res = await axios.post(`${prefix}/checkPw/${qno}`,pw,qno);
=======
    const res = await jwtAxios.post(`${prefix}/checkPw/${qno}`,pw,qno);
>>>>>>> FEATURE/ABOUT_ETC
    return res.data
}


