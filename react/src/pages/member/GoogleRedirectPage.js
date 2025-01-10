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
