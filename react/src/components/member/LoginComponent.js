import React, {useState} from 'react'
import { Container,Form,Button } from 'react-bootstrap'
import  useCustomLogin from '../../hooks/useCustomLogin'

const initState = {
    email : '',
    password: '',
}

const LoginComponent = ({redirectTo} ) => {
    
    const [loginParm, setLoginParm] = useState({...initState})
    const {moveToLoginReturn,doLogin,moveToPath} = useCustomLogin()
    const handleChage = (e) => {
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
    <>

    <Container className='d-flex justify-content-center my-5'>
        <div className='border w-50 p-5 mx-auto my-5 '>
    <Form.Group className="mb-3 " controlId="login.ControlInput1">
    <Form.Label>email</Form.Label>
    <Form.Control
        type="text"
        name="email"
        placeholder="이메일을 입력하세요"
        onChange={handleChage}
    />
    </Form.Group>
    <Form.Group className="mb-3 " controlId="login.ControlInput1">
    <Form.Label>password</Form.Label>
    <Form.Control
        type="text"
        name="password"
        placeholder="비밀번호를 입력하세요"
        onChange={handleChage}
    />
    </Form.Group>
        <div className='text-end'>
                <Button variant="info " type="button" onClick={handleClickLogin}>로그인</Button>
        </div>
        <div className='text-center'>
                <Button variant="white " type="button" onClick={handleClickAdd}>회원가입</Button>
        </div>
    </div>
    </Container>
    </>
  )
}

export default LoginComponent