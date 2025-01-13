<<<<<<< HEAD
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAccessToken, getMemberWithAccessToken } from '../../api/googleApi';
import { login } from '../../slices/loginSlice';
import useCustomLogin from '../../hooks/useCustomLogin';

const GoogleRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");
  const dispatch = useDispatch();
  const { moveToPath } = useCustomLogin();

  useEffect(() => {
    if (authCode) {
      getAccessToken(authCode)
        .then((accessToken) => {
          console.log("AccessToken:", accessToken);
          return getMemberWithAccessToken(accessToken);
        })
        .then((memberInfo) => {
          console.log("Member Info:", memberInfo);
          dispatch(login(memberInfo));
          if (memberInfo && !memberInfo.social) {
            moveToPath("/");
          } else {
            moveToPath("/member/modify");
          }
        })
        .catch((error) => {
          console.error("Login failed:", error);
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
        });
    }
  }, [authCode, dispatch, moveToPath]);

  return (
    <div>Google Login Redirect</div>
  );
};

export default GoogleRedirectPage;
=======
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


>>>>>>> FEATURE/ABOUT_ETC
