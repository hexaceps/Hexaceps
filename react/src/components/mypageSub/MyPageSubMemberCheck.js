import React, { useEffect, useState } from 'react'
import useCustomLogin from '../../hooks/useCustomLogin'
import { Container, FormControl, Form ,InputGroup,Button } from 'react-bootstrap'
import { Eye, EyeSlash } from 'react-bootstrap-icons';


const MyPageSubMemberCheck = ({id}) => {
  const [pw,setPw] = useState('')
  const [ispw,setIspw]=useState(true) 
  const {loginState,isLogin,doLogout } = useCustomLogin()
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [member, setMember] = useState(() => {
      const storedMember = localStorage.getItem('member');
      return storedMember ? JSON.parse(storedMember) : null;
    });

  const handleChangePw = (e) => {
    setPw(e.target.value) 
  }

  const checkPw = () => {
    if(pw !== member.password){
      alert("비밀번호가 다릅니다.")
      return;
    }else{
      setIspw(false);
      setPw('')
    }
  }

 
  return (
   <>
   {ispw ?   <Container className='d-flex  my-5'>
    <Form className='ms-5 border p-5' >
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className='mb-3'>비밀번호 인증</Form.Label>
        <InputGroup className='mb-5'>
                <FormControl
                  style={{borderRight:'0'}}
                  type={showPassword ? "text" : "password"}
                  placeholder="영문,숫자조합 8~16자" 
                  name="password"
                  value={pw} 
                  onChange={handleChangePw} />
                <InputGroup.Text style={{backgroundColor:'white',borderLeft:'0'}}>
                {showPassword ? <EyeSlash  onClick={togglePasswordVisibility} /> : <Eye  onClick={togglePasswordVisibility}/>}
                </InputGroup.Text>
              </InputGroup>
      </Form.Group>
      <div className='text-center'>
      <Button className="mb-3 " style={{ backgroundColor: '#8B4513', color: 'white' }}  onClick={checkPw}>
         가입하기
      </Button>
      </div>
      </Form>
      </Container> : <></> }
 
   </>
  )
}

export default MyPageSubMemberCheck
