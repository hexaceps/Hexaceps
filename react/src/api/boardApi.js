/*
    공지사항, FAQ Board API 호출용 Ajax 페이지 입니다
*/
import axios from "axios";
<<<<<<< HEAD
=======
import jwtAxios from "../util/jwtUtil";

>>>>>>> FEATURE/ABOUT_ETC

export const HEXA_API_SERVER = "http://localhost:8010"
const board_path = `${HEXA_API_SERVER}/api/board`

// 카테고리별 게시판 조회 (notice, faq)
export const getCategoryList = async({ category, pageParam }) => {
    console.log("카테고리별 게시판 조회 (notice, faq) 시작 boardAPI 진입 "+category+", "+pageParam.page + ", " + pageParam.size)
    const { page, size } = pageParam
<<<<<<< HEAD
    const res = await axios.get(`${board_path}?category=${category}`, {params : {page:page, size:size}})
=======
    const res = await jwtAxios.get(`${board_path}?category=${category}`, {params : {page:page, size:size}})
>>>>>>> FEATURE/ABOUT_ETC
    console.log("getCategoryList() API Called from Reactside")
    return res.data
}

// id로 게시판 상세 내역 조회
export const getCategoryBoardDetailById = async(board_id) => {
<<<<<<< HEAD
    const res = await axios.get(`${board_path}/id/${board_id}`)
=======
    const res = await jwtAxios.get(`${board_path}/id/${board_id}`)
>>>>>>> FEATURE/ABOUT_ETC
    console.log("getCategoryBoardDetailById() API Called from Reactside")
    return res.data
}

// keyword로 게시판 상세 내역 조회
export const getCategoryBoardSearchByKeyword = async({ category, keyword }) => {
<<<<<<< HEAD
    const res = await axios.get(`${board_path}/${category}?keyword=${keyword}`)
=======
    const res = await jwtAxios.get(`${board_path}/${category}?keyword=${keyword}`)
>>>>>>> FEATURE/ABOUT_ETC
    console.log("getCategoryBoardSearchByKeyword() API Called from Reactside")
    return res.data
}

// 게시글 등록 (adminOnly)
export const postAddNewBoard = async(postData) => {
<<<<<<< HEAD
    const res = await axios.post(`${board_path}/`, postData)
=======
    const res = await jwtAxios.post(`${board_path}/`, postData)
>>>>>>> FEATURE/ABOUT_ETC
    console.log("postAddNewBoard() API Called from Reactside")
    return res.data
}

// 게시글 수정 (adminOnly)
export const updateBoardById = async(updateData) => {
<<<<<<< HEAD
    const res = await axios.put(`${board_path}/${updateData.id}`, updateData)
=======
    const res = await jwtAxios.put(`${board_path}/${updateData.id}`, updateData)
>>>>>>> FEATURE/ABOUT_ETC
    console.log("updateBoardById() API Called from Reactside")
    return res.data
}

// 뉴스레터 구독 요청
export const sendEmailForSubscribe = async({ email }) => {
<<<<<<< HEAD
    const res = await axios.post(`${board_path}/member/subscribe`, { email })
=======
    const res = await jwtAxios.post(`${board_path}/member/subscribe`, { email })
>>>>>>> FEATURE/ABOUT_ETC
    console.log("sendEmailForSubscribe() API Called from Reactside")
    return res.data
}