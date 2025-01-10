import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAccessToken, getMemberWithAccessToken } from '../../api/kakaoApi'
import { useDispatch } from 'react-redux'
import { login } from '../../slices/loginSlice'
import useCustomLogin from '../../hooks/useCustomLogin'

const KakaoRedirectPage = () => {
    const [searchParams] = useSearchParams()
    const authCode = searchParams.get("code")
    const dispatch = useDispatch()
    const { moveToPath } = useCustomLogin()
    useEffect(()=> {
        getAccessToken(authCode).then(accessToken => {
            console.log(accessToken)

            //카카오에서 받은 회원정보
            getMemberWithAccessToken(accessToken).then(memberInfo => {
                console.log("memberInfo {}", memberInfo)
                dispatch(login(memberInfo))
                //소설 회원이 아니라면 
                if (memberInfo && !memberInfo.social) {
                    moveToPath('/')
                } else {
                    moveToPath('/member/modify')
                }
            })
        })
    }, [authCode])
  return (
    <>
        <div>kakao Login Redirect</div>
        <div>{authCode}</div>
    </>
  )
}

export default KakaoRedirectPage