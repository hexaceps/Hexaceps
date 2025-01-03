import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { checkEmail, memberPostAdd } from '../../api/memberApi';
import useCustomMove from '../../hooks/useCustomMove';
import useCustomLogin from '../../hooks/useCustomLogin';

const initState = {
  email: '',
  name: '',
  password: '',
  confirmPassword:'',
  phoneNumber:'',
  address:'',
  newsletter :1,
  nickname:'',
  rank:"1",
  activateYn:"1",
  memberAgrees: {
    an1: false,
    an2: false,
    an3: false,
    as1: false,
    as2: false,
  },
}

const AddMemberComponent = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const [member,setMember] = useState(initState)
    const [passwordError, setPasswordError] = useState(''); 
    const [checkError, setCheckError] = useState('');
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const togglePasswordCheckVisibility = () => setShowPasswordCheck(!showPasswordCheck);
    const {moveToPath} = useCustomLogin()

    
    const handleChangeMember = (e) => {
      member[e.target.name] = e.target.value
      setMember({ ...member })
  }

    const handleChangeMemberCheckNes = (e) =>{
      const { name, checked } = e.target;
      setMember({
      ...member,
      [name]: checked ? 1 : 0,
    });
    }    
    
  
    const handleChangeMemberCheck = (e) => {
      const { name, checked } = e.target;
      setMember((prevState) => ({
        ...prevState,
        memberAgrees: {
          ...prevState.memberAgrees,
          [name]: checked,
        },
      }));
    };
  
    
  
    const allCheck = (e) => {
      const { checked } = e.target;
      setMember((prevState) => ({
        ...prevState,
        memberAgrees: {
          an1: checked,
          an2: checked,
          an3: checked,
          as1: checked,
          as2: checked,
        },
      }));
    }
    
    //숫자 영문 8~16자 조건검증
    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
      return passwordRegex.test(password);
    };

    const addMemberComplete = () => {
      if (member.password !== member.confirmPassword) {
        setPasswordError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
      } else {
        if (!validatePassword(member.password)) {
          setPasswordError("비밀번호는 8~16자, 숫자와 영문자가 포함되어야 합니다.");
          return;
        }else{
        if(member.memberAgrees.an1 != true || member.memberAgrees.an3 != true || member.memberAgrees.an3 != true || member.memberAgrees.as2 != true){
          setCheckError('필수동의 사항이 전부 체크되지 않았습니다.')
          return;
        }else{
        checkEmail(member.email).then((res) => {
          if (res.success) {
            const memberData = {
              ...member,
              memberAgrees: [{
                an1: member.memberAgrees.an1,
                an2: member.memberAgrees.an2,
                an3: member.memberAgrees.an3,
                as1: member.memberAgrees.as1,
                as2: member.memberAgrees.as2
              }]
            };
            try {
              console.log("member", memberData);
              memberPostAdd(memberData);
              console.log("회원가입 성공");
              setMember(initState);  
              moveToPath('/');
            } catch (error) {
              console.error("회원가입 실패", error);
            }
          } else {
            alert('동일한 이메일이 존재합니다.');
          }
        }).catch((error) => {
          console.error('이메일 검증 실패', error);
        });
      }}}
      setCheckError('');
      setPasswordError('');
    };
    
      
      

    

    
  return (
    <>
    <Container>
 
      <Row className='ms-auto my-3 '>
        <Col md={4} className='ms-auto me-5'>
        <h3 className='fw-bold mb-4 '>회원가입</h3>
     <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>이름 *</Form.Label>
        <Form.Control
               type="text" 
               placeholder="예) 홍길동"  
               name="name"
                value={member.name} 
                onChange={handleChangeMember} />
        <Form.Text className="name">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>비밀번호 *</Form.Label>
        <InputGroup>
                <FormControl
                  style={{borderRight:'0'}}
                  type={showPassword ? "text" : "password"}
                  placeholder="영문,숫자조합 8~16자" 
                  name="password"
                  value={member.password} 
                  onChange={handleChangeMember} />
                <InputGroup.Text style={{backgroundColor:'white',borderLeft:'0'}}>
                {showPassword ? <EyeSlash  onClick={togglePasswordVisibility} /> : <Eye  onClick={togglePasswordVisibility}/>}
                </InputGroup.Text>
              </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword1">
        <Form.Label>비밀번호 확인 *</Form.Label>
        <InputGroup>
                <FormControl
                  style={{borderRight:'0'}}
                  type={showPasswordCheck ? "text" : "password"}
                  placeholder="비밀번호를 한번더 입력해 주세요"
                  name="confirmPassword"
                   value={member.confirmPassword} 
                   onChange={handleChangeMember} />
                <InputGroup.Text style={{backgroundColor:'white',borderLeft:'0'}}>
                    {showPassword ? <EyeSlash  onClick={togglePasswordCheckVisibility} /> : <Eye  onClick={togglePasswordCheckVisibility}/>}
                </InputGroup.Text>
              </InputGroup>
              {passwordError && <div style={{ color: 'red', marginTop: '5px' }}>{passwordError}</div>}

      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>이메일 *</Form.Label>
        <InputGroup>
          <FormControl
          style={{borderRight:'0'}}
            type="email"
             placeholder="예) abc@emial.com"
             name="email"
              value={member.email} 
              onChange={handleChangeMember} />
            <InputGroup.Text style={{backgroundColor:'white',borderLeft:'0'}}>
              <Button variant='sm' style={{ backgroundColor: '#8B4513', color: 'white' }} >인증하기 </Button>
            </InputGroup.Text>
        </InputGroup>
        <Form.Check className='mt-2 ' type="checkbox" label="뉴스레터 구독 (선택) 동의" name="newsletter" checked={member.newsletter === 1} onChange={handleChangeMemberCheckNes} />
      </Form.Group>
    </Form>
    </Col>
    <Col md={4} className='ms-5 me-auto my-5'>
    <Form>
    <Form.Group className="mt-5" controlId="formBasicCheckbox">
              <Form.Check className='mb-4 fw-bold' type="checkbox" label="아래의 약관에 모두 동의합니다." onClick={allCheck}   />
              <Form.Check className='mb-2 ' type="checkbox" label="(필수) 이용약관 동의" name="an1" checked={member.memberAgrees.an1} onChange={handleChangeMemberCheck} />
              <Form.Check className='mb-2 ' type="checkbox" label="(필수) 개인정보 처리방침 동의" name="an2" checked={member.memberAgrees.an2} onChange={handleChangeMemberCheck} />
              <Form.Check className='mb-2 ' type="checkbox" label="(필수) 위치정보 이용 약관 필수 동의" name="an3" checked={member.memberAgrees.an3} onChange={handleChangeMemberCheck} />
              <Form.Check className='mb-4 ' type="checkbox" label="(선택) 마케팅 정보 수신 동의" name="as1" checked={member.memberAgrees.as1} onChange={handleChangeMemberCheck} />
              <Form.Check className='mb-1 ' type="checkbox" label="(필수) 만 14세 이상임에 동의" name="as2" checked={member.memberAgrees.as2} onChange={handleChangeMemberCheck} />
            </Form.Group>
            {checkError && <div className='mb-4' style={{ color: 'red', marginTop: '5px' }}>{checkError}</div>}
      <Button className="w-75" style={{ backgroundColor: '#8B4513', color: 'white' }}  onClick={addMemberComplete}>
         가입하기
      </Button>
    </Form>
    </Col>
    </Row>
    </Container>
    </>
  )
}

export default AddMemberComponent