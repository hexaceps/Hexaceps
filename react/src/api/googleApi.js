import axios from "axios";
// import { API_SERVER_HOST } from "./qnaApi";
import { API_SERVER_HOST } from '../serverEnv'

export const getAccessTokenFromGoogle = async (accessToken) => {
    try {
        // 서버에 Access Token 전달
        const serverResponse = await axios.post(
            `${API_SERVER_HOST}/api/member/google`, // 서버 API 엔드포인트
            { token: accessToken }, // 본문에 토큰 전달
            {
                headers: { 
                    Authorization: `Bearer ${accessToken}`, 
                    "Content-Type": "application/json" 
                } 
            }
        );

        console.log("Server Response:", serverResponse.data);
        return serverResponse.data;
    } catch (error) {
        console.error("Failed to exchange token:", error.response?.data || error.message);
        throw new Error("Failed to exchange token");
    }
};