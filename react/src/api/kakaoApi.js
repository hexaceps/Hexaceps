import axios from "axios";
// import { API_SERVER_HOST } from "./qnaApi";
import { API_SERVER_HOST, REDIRECT_HOST, REST_API_KEY } from '../serverEnv'

//리다이렉트uri
// const redirect_uri = `http://localhost:3010/member/kakao`
const redirect_uri = `${REDIRECT_HOST}/member/kakao`

//인가 코드 받기
const auth_code_path = `https://kauth.kakao.com/oauth/authorize`

//토큰 받기
const access_token_url = `https://kauth.kakao.com/oauth/token`

export const getKakaoLoginLink = () => {
    const kakaoURL = `${auth_code_path}?client_id=${REST_API_KEY}&redirect_uri=${redirect_uri}&response_type=code`
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
        client_id:REST_API_KEY,
        redirect_uri:redirect_uri,
        code : authCode
    }

    const res = await axios.post(access_token_url, params, header)
    const accessToken = res.data.access_token
    return accessToken
}

//SocialController.jave => /api/member/kakao
export const getMemberWithAccessToken = async (accessToken) => {
    // Access token을 Authorization 헤더로 보내기
    const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao`, {
        headers: {
            Authorization: `Bearer ${accessToken}`  // Bearer 형식으로 헤더에 전달
        }
    })
    return res.data
}