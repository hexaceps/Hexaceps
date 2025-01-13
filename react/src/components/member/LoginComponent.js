import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import GoogleLoginComponent from './GoogleLoginComponent';
import KakaoLoginComponent from './KakaoLoginComponent';
import useCustomLogin from '../../hooks/useCustomLogin';

const initState = {
  email: '',
  password: '',
};

const LoginComponent = ({redirectTo} ) => {
    
  const [loginParm, setLoginParm] = useState({...initState})
  const {moveToLoginReturn,doLogin,moveToPath} = useCustomLogin()
  const handleChange = (e) => {
      loginParm[e.target.name] = e.target.value;

      setLoginParm({...loginParm})
  }

  const handleClickLogin = () => {

      console.log("logparm",loginParm)
      doLogin(loginParm)
      .then(data => {
          console.log("에러?",data)
          if(data.error){
                  alert("이메일과 패스워드를 다시 확인하세요.")
          } else{  alert("로그인에 성공 하였습니다.")

              moveToPath(redirectTo || '/');
      }})
  }


 const handleClickAdd = () =>{
  moveToPath('/member/add')
 }

  return (
    <div
      className="d-flex flex-column justify-content-between align-items-center"
      style={{ minHeight: '90vh', padding: '20px 0' }}
    >
      <div className="w-50" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4 fw-bold">로그인</h2>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="이메일"
            style={{ height: '45px' }}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="비밀번호"
            style={{ height: '45px' }}
          />
        </Form.Group>
        <div className="d-flex justify-content-center mb-3">
          <Button
            style={{
              backgroundColor: '#625244',
              borderColor: '#625244',
              borderRadius: '20px',
              width: '100%',
              height: '45px',
            }}
            onClick={handleClickLogin}
          >
            로그인
          </Button>
        </div>
        <h5 className="text-center mb-3">계정이 필요하세요?</h5>
        <div className="d-flex justify-content-center mb-4">
          <Button
            style={{
              backgroundColor: '#625244',
              borderColor: '#625244',
              borderRadius: '20px',
              width: '100%',
              height: '45px',
            }}
            onClick={handleClickAdd}
          >
            회원가입
          </Button>
        </div>
        <GoogleLoginComponent />
        <KakaoLoginComponent />
      </div>
    </div>
  );
};

export default LoginComponent;
