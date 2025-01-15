import React, { useState } from 'react';
import { Button, Container, Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { checkEmail, memberPostAdd, loginPost } from '../../api/memberApi'; // API 호출
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate
import useCustomLogin from '../../hooks/useCustomLogin';

const initState = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
  //phoneNumber: '',
  //address: '',
  newsletter: 1,
  //nickname: '',
  rank: '1',
  activateYn: '1',
  memberAgrees: {
    an1: false,
    an2: false,
    an3: false,
    as1: false,
    as2: false,
  },
};

const AddMemberComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [member, setMember] = useState(initState);
  const [passwordError, setPasswordError] = useState('');
  const [checkError, setCheckError] = useState('');
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate
  const {moveToPath} = useCustomLogin()

  const { doLogin } = useCustomLogin();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const togglePasswordCheckVisibility = () => setShowPasswordCheck(!showPasswordCheck);

  const handleChangeMember = (e) => {
    const { name, value } = e.target;
    setMember((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    return passwordRegex.test(password);
  };

  const addMemberComplete = async () => {
    try {

      console.log('전송데이터 확인:', {
        rank: member.rank,
        activateYn: member.activateYn
      });
      // 비밀번호 확인
      if (member.password !== member.confirmPassword) {
        setPasswordError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
      }

      // 비밀번호 유효성 검사
      if (!validatePassword(member.password)) {
        setPasswordError('비밀번호는 8~16자, 숫자와 영문자가 포함되어야 합니다.');
        return;
      }

      // 필수 동의 체크
      if (!member.memberAgrees.an1 || !member.memberAgrees.an2 || !member.memberAgrees.as2) {
        setCheckError('필수 동의 사항이 모두 체크되지 않았습니다.');
        return;
      }

      // 이메일 중복 확인
      const emailCheck = await checkEmail(member.email);
      console.log("checkEmail 응답 데이터:", emailCheck);
      
      if (!emailCheck.success) {
        alert('동일한 이메일이 존재합니다.');
        return;
      }

      // memberAgrees 구조 변환
      const memberData = {
        name: member.name,
        email: member.email,
        password: member.password,
        rank: member.rank,
        activateYn: member.activateYn,
        // ...member,
        memberAgrees: [
          {
          an1 : member.memberAgrees.an1,
          an2 : member.memberAgrees.an2,
          an3 : member.memberAgrees.an3,
          as1 : member.memberAgrees.as1,
          as2 : member.memberAgrees.as2,
        },
      ],
    };

      console.log("전송 데이터:", memberData)


      // 회원가입 API 호출
      await memberPostAdd(memberData);
      alert('회원가입이 완료되었습니다.');
      setMember(initState);  
      // moveToPath('/');

      // 자동 로그인 처리
      await doLogin({ email: memberData.email, password: memberData.password });
      // 회원 정보 수정 페이지로 이동
      navigate('/mypage/modify');

    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }

    setPasswordError('');
    setCheckError('');
  };

  return (
    <Container>
      <Row className="ms-auto my-3">
        <Col md={4} className="ms-auto me-5">
          <h3 className="fw-bold mb-4">회원가입</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>이름 *</Form.Label>
              <Form.Control
                type="text"
                placeholder="예) 홍길동"
                name="name"
                value={member.name}
                onChange={handleChangeMember}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>비밀번호 *</Form.Label>
              <InputGroup>
                <FormControl
                  type={showPassword ? 'text' : 'password'}
                  placeholder="영문, 숫자 조합 8~16자"
                  name="password"
                  value={member.password}
                  onChange={handleChangeMember}
                />
                <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                  {showPassword ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordCheck">
              <Form.Label>비밀번호 확인 *</Form.Label>
              <InputGroup>
                <FormControl
                  type={showPasswordCheck ? 'text' : 'password'}
                  placeholder="비밀번호를 한번 더 입력해 주세요"
                  name="confirmPassword"
                  value={member.confirmPassword}
                  onChange={handleChangeMember}
                />
                <InputGroup.Text onClick={togglePasswordCheckVisibility} style={{ cursor: 'pointer' }}>
                  {showPasswordCheck ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>
              </InputGroup>
              {passwordError && <div className="text-danger mt-2">{passwordError}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이메일 *</Form.Label>
              <Form.Control
                type="email"
                placeholder="예) abc@email.com"
                name="email"
                value={member.email}
                onChange={handleChangeMember}
              />
            </Form.Group>
            {/* Hidden Inputs */}
            <Form.Control
              type="hidden"
              name="rank"
              value={member.rank}
              onChange={handleChangeMember}
            />
            <Form.Control
              type="hidden"
              name="activateYn"
              value={member.activateYn}
              onChange={handleChangeMember}
            />
          </Form>
        </Col>
        <Col md={4} className="ms-5 me-auto my-5">
          <Form>
            <Form.Group className="mt-5" controlId="formBasicCheckbox">
              <Form.Check
                className="mb-4 fw-bold"
                type="checkbox"
                label="아래의 약관에 모두 동의합니다."
                onClick={allCheck}
              />
              <Form.Check
                className="mb-2"
                type="checkbox"
                label="(필수) 이용약관 동의"
                name="an1"
                checked={member.memberAgrees.an1}
                onChange={handleChangeMemberCheck}
              />
              <Form.Check
                className="mb-2"
                type="checkbox"
                label="(필수) 개인정보 처리방침 동의"
                name="an2"
                checked={member.memberAgrees.an2}
                onChange={handleChangeMemberCheck}
              />
              <Form.Check
                className="mb-2"
                type="checkbox"
                label="(필수) 위치정보 이용 약관 동의"
                name="an3"
                checked={member.memberAgrees.an3}
                onChange={handleChangeMemberCheck}
              />
              <Form.Check
                className="mb-4"
                type="checkbox"
                label="(선택) 마케팅 정보 수신 동의"
                name="as1"
                checked={member.memberAgrees.as1}
                onChange={handleChangeMemberCheck}
              />
              <Form.Check
                className="mb-1"
                type="checkbox"
                label="(필수) 만 14세 이상임을 동의합니다."
                name="as2"
                checked={member.memberAgrees.as2}
                onChange={handleChangeMemberCheck}
              />
            </Form.Group>
            {checkError && <div className="text-danger mb-4">{checkError}</div>}
            <Button
              className="w-75"
              style={{ backgroundColor: '#625244', borderColor: '#625244', color: 'white' }}
              onClick={addMemberComplete}
            >
              가입하기
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddMemberComponent;
