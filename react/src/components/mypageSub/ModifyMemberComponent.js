import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup,Modal } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import ResultModal from '../common/ResultModal';
import { getOneMember, putOneMember } from '../../api/memberApi';
import useCustomLogin from '../../hooks/useCustomLogin';
import DaumPostcode from 'react-daum-postcode';

const initState = {
  email: '',
  name: '',
  password: '',
  phoneNumber: '',
  address: '',
  nickname: '',
  newsletter: 1
}

const ModifyMemberComponent = ({ id }) => {
  const [member, setMember] = useState(initState);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  const [manualAddress, setManualAddress] = useState(''); 
  const [result, setResult] = useState(null);
  const [showPostcode, setShowPostcode] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const { moveToPath, loginState } = useCustomLogin();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const togglePasswordCheckVisibility = () => setShowPasswordCheck(!showPasswordCheck);

const handleChangeMember = (e) => {
    const { name, value } = e.target;
    setMember((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleAddressChange = (e) => {
    setManualAddress(e.target.value);
  };

  // 전화번호 11자리 검사
  const validatePhoneNumber = (phoneNumber) => /^\d{11}$/.test(phoneNumber);
  

  const validateAllFields = () => {
    if (!validatePhoneNumber(member.phoneNumber)) {
      setValidationError('전화번호는 필수 입력란입니다.');
      return false;
    }
    if (!address || !manualAddress) {
      setValidationError('주소, 상세주소는 필수 입력란입니다.');
      return false
    }
    return true
  }

  useEffect(() => {
    setIsFormValid(validateAllFields())
  }, [member.phoneNumber, address, manualAddress])

  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    return regex.test(password); // 8~16자, 영문 + 숫자 포함
  };

  // 회원 정보 수정 함수
  const handleClickModify = () => {
    if (!validateAllFields()) return;

    if (newPassword !== confirmPassword) {
      setPasswordError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    } else {
      if (!validatePassword(newPassword)) {
        setPasswordError('비밀번호는 8~16자, 숫자와 영문자가 포함되어야 합니다.');
        return;
      } else {
        const fullAddress = `(${postcode}) ${address} ${extraAddress} ${manualAddress}`;
        const updatedMember = { 
          id: member.id,
          email: member.email,
          name: member.name,
          password: newPassword, 
          phoneNumber: member.phoneNumber,
          address: fullAddress,
          nickname: member.nickname,
          newsletter: member.newsletter ? 1 : 0 // 뉴스레터 구독 여부 처리
        };

        putOneMember(member.id, updatedMember).then((data) => {
          console.log('수정완료', data);
          setResult('수정완료 되었습니다.');
        });
      }
    }
  };

  // DaumPostcode에서 주소 검색 완료 후 처리
  const handleAddressSearch = (data) => {
    let addr = '';
    let extraAddr = '';

    if (data.userSelectedType === 'R') {
      addr = data.roadAddress;
    } else {
      addr = data.jibunAddress;
    }

    if (data.userSelectedType === 'R') {
      if (data.bname && /[동|로|가]$/g.test(data.bname)) {
        extraAddr += data.bname;
      }
      if (data.buildingName && data.apartment === 'Y') {
        extraAddr += extraAddr ? `, ${data.buildingName}` : data.buildingName;
      }
      if (extraAddr) {
        extraAddr = ` (${extraAddr})`;
      }
    }

    setPostcode(data.zonecode);
    setAddress(addr);
    setExtraAddress(extraAddr);
    setShowPostcode(false); // 주소 검색 후 모달 닫기

  };

  // 회원 정보 로딩
  useEffect(() => {
    getOneMember(loginState.email).then((data) => {
      console.log('불러온 회원 데이터: ', data);
      setMember({
        id: data.id,
        ...data,
        address: data.address || '',
        postcode: data.zonecode || '',
        extraAddress: data.extraAddress || '',
      });
    });
  }, [loginState.email]);

  return (
    <>
      {result && <ResultModal title={'처리결과'} content={result} callbackFn={() => moveToPath('/')} />}
      
      <Form.Group className="mb-3">
        <Form.Label>email</Form.Label>
        <Form.Control type="email" value={member.email} disabled />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>이름</Form.Label>
        <Form.Control type={"text"} name="name" value={member.name || ''} onChange={handleChangeMember}  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="titleForm.ControlInput1">
        <Form.Label>전화번호</Form.Label>
        <InputGroup>
        <Form.Control type={"text"} name="" value={member.phoneNumber}             
        onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setMember((prevState) => ({
                  ...prevState,
                  phoneNumber: value,
                }));
              }
            }} placeholder="하이픈'-'을 제외하고 숫자만 입력하세요." />
        </InputGroup>
        </Form.Group>

      <Form.Group className="mb-3" controlId="titleForm.ControlInput1">
        <Form.Label>비밀번호</Form.Label>
        <InputGroup>
          <Form.Control
            style={{ borderRight: '0' }}
            type={showPassword ? "text" : "password"}
            name="newPassword"
            value={newPassword}
            onChange={handlePasswordChange}
            placeholder="새 비밀번호를 입력하세요"
          />
          <InputGroup.Text style={{ backgroundColor: 'white', borderLeft: '0' }}>
            {showPassword ? <EyeSlash onClick={togglePasswordVisibility} /> : <Eye onClick={togglePasswordVisibility} />}
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>
      {passwordError && <div className='mb-3' style={{ color: 'red', marginTop: '5px' }}>{passwordError}</div>}
      <Form.Group className="mb-3" controlId="titleForm.ControlInput1">
        <Form.Label>비밀번호 확인</Form.Label>
        <InputGroup>
          <Form.Control
            style={{ borderRight: '0' }}
            type={showPasswordCheck ? "text" : "password"}
            name="confirmPassword"
            placeholder="비밀번호를 한번더 입력해 주세요"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <InputGroup.Text style={{ backgroundColor: 'white', borderLeft: '0' }}>
            {showPasswordCheck ? <EyeSlash onClick={togglePasswordCheckVisibility} /> : <Eye onClick={togglePasswordCheckVisibility} />}
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="titleForm.ControlInput1">
        <Form.Label>닉네임</Form.Label>
        <InputGroup></InputGroup>
        <Form.Control type={"text"} name="nickname" value={member.nickname || ''} onChange={handleChangeMember} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>주소</Form.Label>
        <InputGroup>
          <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          <Button variant="secondary" onClick={() => setShowPostcode(true)}>
            주소찾기
          </Button>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>우편번호</Form.Label>
        <Form.Control type="text" value={postcode} disabled />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>선택된 주소</Form.Label>
        <Form.Control type="text" value={extraAddress} disabled />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>상세주소</Form.Label>
        <Form.Control
          type="text"
          value={manualAddress}
          onChange={handleAddressChange} 
          placeholder="나머지 주소를 입력하세요."
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check 
          type="checkbox" 
          label="뉴스레터 받기" 
          checked={member.newsletter === 1} 
          onChange={() => setMember(prev => ({ ...prev, newsletter: prev.newsletter === 1 ? 0 : 1 }))} 
        />
      </Form.Group>

      {validationError && <div style={{ color: 'red', marginTop: '5px' }}>{validationError}</div>}

    {/* DaumPostcode 모달을 showPostcode 상태에 따라 렌더링 */}
    <Modal show={showPostcode} onHide={() => setShowPostcode(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>주소 검색</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumPostcode onComplete={handleAddressSearch} />
        </Modal.Body>
      </Modal>

      <div className="mt-3 text-end">
        <Button variant="primary" onClick={handleClickModify} disabled={!isFormValid}>수정</Button>
      </div>
    </>
  );
};

export default ModifyMemberComponent;
