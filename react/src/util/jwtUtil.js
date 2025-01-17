import axios from 'axios';
import { getCookie, setCookie } from './cookieUtil';
// import { API_SERVER_HOST } from '../api/qnaApi';
import { API_SERVER_HOST } from '../serverEnv'
const jwtAxios = axios.create();

// 토큰 갱신 함수
const refreshJWT = async () => {
    const host = API_SERVER_HOST;
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
    const header = { headers: { "Authorization": `Bearer ${accessToken}` } };

    try {
        const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header);
        console.log("Refresh JWT Response:", res.data);
        return res.data;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        throw error;
    }
};

// 59분 단위로 토큰 갱신 스케줄러
const startTokenRefreshScheduler = () => {
    setInterval(async () => {
        try {
            console.log("Attempting to refresh token...");
            const memberCookieValue = getCookie("member1");
            console.log("member1",memberCookieValue)

            if (!memberCookieValue) {
                console.error("No valid member data in cookie.");
                return;
            }

            const parsedMember = JSON.parse(memberCookieValue);
            if (!parsedMember.refreshToken) {
                console.error("No valid refresh token available in member data.");
                return;
            }

            const result = await refreshJWT(); // 새 토큰 요청

            const updatedMemberValue = {
                 ...parsedMember, // 기존 데이터 유지
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
            };
            setCookie("member1", JSON.stringify(updatedMemberValue), 1);

            // 로컬 스토리지 업데이트
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('refreshToken', result.refreshToken);

            console.log("Token refreshed successfully.");
        } catch (error) {
            console.error("Token refresh failed:", error);
        }
    }, 59 * 60 * 1000); // 59분 (59 * 60초 * 1000ms)
};

// 요청 인터셉터: beforeReq()
const beforeReq = (config) => {
    console.log("before request ........................");
    const memberInfo = getCookie("member1");

    if (!memberInfo) {
        console.log("cookie 없음.");
        return Promise.reject({
            response: {
                data: {
                    error: "REQUIRE_LOGIN",
                },
            },
        });
    }

    const { accessToken } = memberInfo;
    console.log("액세스", accessToken);
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
};

// 요청 실패 핸들러
const requestFail = (err) => {
    console.log("request error........................");
    return Promise.reject(err);
};

// 응답 인터셉터: beforeRes()
const beforeRes = (res) => {
    console.log("before return response......................");
    return res;
};

// 응답 실패 핸들러
const responseFail = (err) => {
    console.log("response fail error...............................");
    return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

// 토큰 갱신 스케줄러 시작
startTokenRefreshScheduler();

export default jwtAxios;
