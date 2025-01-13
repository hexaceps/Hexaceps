import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAccessToken, getMemberWithAccessToken } from '../../api/kakaoApi';
import { useDispatch } from 'react-redux';
import { login } from '../../slice/loginSlice';
import useCustomLogin from '../../hooks/useCustomLogin'
import { Modal, Spinner } from 'react-bootstrap';

const KakaoRedirectPage = () => {
    //주소창의 param을 들고온다 ("code")
    const [searchParams ] = useSearchParams();
    const authCode = searchParams.get("code");
    const dispatch = useDispatch()
    const {moveToPath, doLogout} = useCustomLogin();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 


    useEffect(()=>{
        getAccessToken(authCode).then(accessToken => {
            console.log(accessToken)
            //카카오에서 받은 회원정보
            getMemberWithAccessToken(accessToken).then(memberInfo =>{
                console.log("memberinfo {}",memberInfo)
                //login(login슬라이스에 memberinfo 정보를 보냄)
                dispatch(login(memberInfo))
              //소셜 회원이 아니라면
              if(memberInfo && memberInfo.socialYn!=1){
                moveToPath('/')
              } else {
                moveToPath('/member/modify')
              }
              setLoading(false);      }).catch(error => {
                // 에러 처리
                console.error("카카오 회원정보 가져오기 실패:", error);
                doLogout(); // 상태 초기화
                setError(error);
                setLoading(false);
            });
        }).catch(error => {
            // 에러 처리
            console.error("카카오 토큰 가져오기 실패:", error);
            setError(error);
            setLoading(false);
        });

          
    },[authCode,dispatch, moveToPath])
    return (
      <>
          <Modal show={loading} backdrop="static" keyboard={false}>
              <Modal.Body className="text-center">
                  <Spinner animation="border" variant="primary" />
                  <div className="mt-3">로그인 중...</div>
              </Modal.Body>
          </Modal>

          {/* 에러가 있을 경우 메시지 표시 */}
          {error && (
              <Modal show={true} backdrop="static" keyboard={false}>
                  <Modal.Body className="text-center text-danger">
                      <div>로그인에 실패했습니다. 다시 시도해주세요.</div>
                  </Modal.Body>
              </Modal>
          )}
      </>
  );
};


export default KakaoRedirectPage