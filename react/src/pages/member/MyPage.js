import React, { useState } from 'react'
import MyPageComponent from '../../components/home/MyPageComponent'
import useCustomLogin from '../../hooks/useCustomLogin'
import LoginComponent from '../../components/member/LoginComponent'

const MyPage = () => {
    const {isLogin} = useCustomLogin()
    
  return (
  <>
{isLogin ?  (<MyPageComponent /> ):  ( <LoginComponent redirectTo="/mypage" />   )}
 
  </>
  )
}

export default MyPage
