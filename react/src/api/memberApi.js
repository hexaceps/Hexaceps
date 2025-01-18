import axios from "axios";
import jwtAxios from "../util/jwtUtil";
// import { API_SERVER_HOST } from "./qnaApi";
import { API_SERVER_HOST } from '../serverEnv'

const host = `${API_SERVER_HOST}/api/member`

/*
export const loginPost = async (loginParam) => {
    const header = {Headers: { "Content-Type" : "x-www-form-urlencoded"}}

    const form = new FormData()
    form.append('email', loginParam.email)
    form.append('password', loginParam.password)

    const res = await axios.post(`${host}/login`, form, header)

    return res.data
}
*/
export const loginPost = async (loginParm) => {
    const headers  = { headers : { "Content-Type": "application/json" } };

    try {
        const res = await axios.post(
            `${host}/login`,
            { email: loginParm.email, password: loginParm.password },
            headers 
        );

        if (res.data.success) {
            console.log("Login successful",res.data);
            const member = {
                email: res.data.email,
                nickname: res.data.nickname,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
            };

            
            localStorage.setItem("like", JSON.stringify(res.data.like));
            localStorage.setItem("member", JSON.stringify(member)); // 저장
            localStorage.setItem("accessToken", JSON.stringify(member.accessToken));
            localStorage.setItem("refreshToken", JSON.stringify(member.refreshToken));
            return res.data;

        } else {
            console.error("Login failed: ", res.data.error);
            return { error: res.data.error };
        }
    } catch (error) {
        console.error("Login error:", error);
        return { error: "An error occurred during login" };
    }
}


export const getOneMember = async(email) => {
    const res = await axios.get(`${host}/e/${email}`)
    console.log("조회하기",res);
    return res.data
}

export const getAllMember = async() => {
    const res = await axios.get(`${host}/list`)
    console.log("전체 회원리스트 조회하기",res);
    return res.data
}


export const memberPostAdd = async(member) => {
        const res = await axios.post(`${host}/`, member);
        return res.data;
}



export const checkEmail = async(email) => {
    const res = await axios.post(`${host}/check/${email}`); 
    return res.data;
}


export const putOneMember = async(id,member) => {
    const res = await jwtAxios.put(`${host}/${id}`,member)
    return res.data
}


export const modifyMember = async(member) => {
    const res = await jwtAxios.put(`${host}/modify`, member)
    return res.data
}


export const checkPassword = async (inputPassword, encodedPassword) => {
    try {
      const res = await axios.post(`${host}/check-password`, {
        inputPassword,
        encodedPassword,
      });
  
      if (res.status === 200) {
        return true;
      }
    } catch (error) {
      console.error("Password check failed:", error);
    }
    return false;
}