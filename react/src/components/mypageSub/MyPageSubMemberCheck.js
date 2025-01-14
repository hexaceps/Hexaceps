import React, { useEffect, useState } from 'react'
import useCustomLogin from '../../hooks/useCustomLogin'
import { Container, FormControl, Form ,InputGroup,Button } from 'react-bootstrap'
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import ModifyMemberComponent from './ModifyMemberComponent';
import { checkPassword } from '../../api/memberApi';




const MyPageSubMemberCheck = ({id, skipPasswordCheck = false}) => {
  const [pw,setPw] = useState('')
  const [ispw,setIspw]=useState(true) 
  const {loginState,isLogin,doLogout } = useCustomLogin()
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [member, setMember] = useState(() => {
      const storedMember = localStorage.getItem('member');
      return storedMember ? JSON.parse(storedMember) : null;
    });

    useEffect(() => {
      // 회원가입 후 바로 넘어오는 경우 비밀번호 인증 생략
      if(skipPasswordCheck) {
        setIspw(false)
      }
    }, [skipPasswordCheck])

  const handleChangePw = (e) => {
    setPw(e.target.value) 
  }


    const checkPw = async () => {
      const isValid = await checkPassword(pw, member.password);
      if (isValid) {
        console.log("Password is correct");
        setIspw(false);
        setPw('');
      } else {
        alert("비밀번호가 다릅니다.");
      }
    };
 
  return (
   <>
   {ispw ?   <Container  className="d-flex  align-items-center my-5"
          style={{ height: '50vh' }}>
    <Form className='border p-5' >
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
      <Button className="mb-3 " style={{ backgroundColor: '#625244', color: 'white', borderColor: '#625244' }}  onClick={checkPw}>
         인증하기
      </Button>
      </div>
      </Form>
      </Container> : <ModifyMemberComponent id={id}/> }
 
   </>
  )
}

export default MyPageSubMemberCheck
