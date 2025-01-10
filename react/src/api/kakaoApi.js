import axios from "axios"
import { API_SERVER_HOST } from './qnaApi'

//REST키값 
const rest_api_key = `2282ef5d25ed0d1ddcf2c7674f58bc6f`
//리다이렉트uri
const redirect_uri = `http://localhost:3000/member/kakao`

//인가 코드 받기
const auth_code_path = `https://kauth.kakao.com/oauth/authorize`

//토큰 받기
const access_token_url = `https://kauth.kakao.com/oauth/token`

export const getKakaoLoginLink = () => {
    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    return kakaoURL
}

//authCode는 인가코드, 인가코드로 AccessToken받기
export const getAccessToken = async (authCode) => {
    //header지정
    const header = {
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded;charset=utf-8"
        }
    }

    //전달해야 하는 값이 많아서 객체로 만듬
    const params = {
        grant_type:"authorization_code",
        client_id:rest_api_key,
        redirect_uri:redirect_uri,
        code : authCode
    }

    const res = await axios.post(access_token_url, params, header)
    const accessToken = res.data.access_token
    return accessToken
}

//SocialController.java =>   /api/member/kakao
export const getMemberWithAccessToken = async (accessToken) => {
    const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`)
    return res.data
}