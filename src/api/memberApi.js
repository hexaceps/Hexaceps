import axios from "axios";
import { API_SERVER_HOST } from "./qnaApi";


const host = `${API_SERVER_HOST}/api/member`

export const loginPost = async (loginParm) => {
    const header = {Headers: { "Content-Type" : "application/json"}}

    
    const res = await axios.post(`${host}/login`, 
        { email: loginParm.email, password: loginParm.password }, 
        header
    );


    
    return res.data
}

export const getOneMember = async(email) => {
    const res = await axios.get(`${host}/e/${email}`)
    console.log("조회하기",res);
    return res.data
}



export const memberPostAdd = async(member) => {
    const res = await axios.post(`${host}/`, member)
    return res.data
}

