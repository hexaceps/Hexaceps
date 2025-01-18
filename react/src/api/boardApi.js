/*
    공지사항, FAQ Board API 호출용 Ajax 페이지 입니다
*/
import axios from "axios";
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from '../serverEnv'

// export const API_SERVER_HOST = "http://localhost:8010"
const board_path = `${API_SERVER_HOST}/api/board`

// 카테고리별 게시판 조회 (notice, faq)
export const getCategoryList = async({ category, pageParam }) => {
    console.log("카테고리별 게시판 조회 (notice, faq) 시작 boardAPI 진입 "+category+", "+pageParam.page + ", " + pageParam.size)
    const { page, size } = pageParam
    const res = await axios.get(`${board_path}?category=${category}`, {params : {page:page, size:size}})
    console.log("getCategoryList() API Called from Reactside")
    return res.data
}

// 모든 게시판 조회
export const getAllCategoryList = async({ pageParam }) => {
    console.log("어드민용 게시판 조회 (notice, faq) 시작 boardAPI 진입 "+", "+pageParam.page + ", " + pageParam.size)
    const { page, size } = pageParam
    const res = await axios.get(`${board_path}/list`, {params : {page:page, size:size}})
    console.log("getAllCategoryList() API Called from Reactside")
    return res.data
}

// id로 게시판 상세 내역 조회
export const getCategoryBoardDetailById = async(board_id) => {
    const res = await axios.get(`${board_path}/id/${board_id}`)
    console.log("getCategoryBoardDetailById() API Called from Reactside")
    return res.data
}


// keyword로 게시판 상세 내역 조회
export const getCategoryBoardSearchByKeyword = async({ category, keyword }) => {
    const res = await axios.get(`${board_path}/${category}?keyword=${keyword}`)
    console.log("getCategoryBoardSearchByKeyword() API Called from Reactside")
    return res.data
}

// 게시글 등록 (adminOnly)
export const postAddNewBoard = async(postData) => {
    const res = await axios.post(`${board_path}/`, postData)
    console.log("postAddNewBoard() API Called from Reactside")
    return res.data
}

// 게시글 수정 (adminOnly)
export const updateBoardById = async(updateData) => {
    console.log("update 데이터를 확인 합니다 ID : " + updateData.id + ", Title : " + updateData.title)
    const res = await axios.put(`${board_path}/update/${updateData.id}`, updateData)
    console.log("updateBoardById() API Called from Reactside")
    return res.data
}

// 뉴스레터 구독 요청
export const sendEmailForSubscribe = async({ email }) => {
    const res = await axios.post(`${board_path}/member/subscribe`, { email })
    console.log("sendEmailForSubscribe() API Called from Reactside")
    return res.data
}