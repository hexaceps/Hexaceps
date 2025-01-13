import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_SERVER_HOST } from "../../api/qnaApi";
import { useDispatch } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";
import { login } from "../../slice/loginSlice";

const GoogleRedirectPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { moveToPath, doLogout } = useCustomLogin();

    // 현재 url에서 access_token 추출
    const hash = window.location.hash;
    const accessToken = hash.substring(hash.indexOf('=') + 1, hash.indexOf('&'));

    const handleLoginPost = async accessToken => {
        const data = {
            accessToken: accessToken,
        };

        try {
            const res = await axios.post(
            `${API_SERVER_HOST}/api/member/google`,
                data,
            ).then(function (res){
                console.log(res)
                const memberInfo = res.data;
                console.log("멤버인포",memberInfo)
                dispatch(login(memberInfo));
                if(memberInfo && memberInfo.socialYn!=2){
                    moveToPath('/')
              } else {
                    moveToPath('/member/modify')
              };

            })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (accessToken) {
            handleLoginPost(accessToken)

        } else {
            console.log("로그인 재시도하세요.");
        }
    }, [accessToken, navigate,moveToPath]);
    return (
        <p>~ 로그인중 ~</p>
    );
}

export default GoogleRedirectPage;


