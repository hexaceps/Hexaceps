import React, { useEffect, useState,useDispatch } from 'react'
import {Nav, Navbar, NavDropdown, Container, Row, Col,Image,  Form, FormControl, InputGroup} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'; // 돋보기 아이콘 추가
import { Outlet } from 'react-router-dom';
import  useCustomLogin from '../hooks/useCustomLogin'
import { getOneMember } from '../api/memberApi';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const initState = {   
  
}


const AppLayout = () => {
    const {loginState,isLogin,doLogout } = useCustomLogin()
    const [member, setMember] = useState(() => {
        // Get member from localStorage if available
        const storedMember = localStorage.getItem('member');
        return storedMember ? JSON.parse(storedMember) : null;
      });

      useEffect(() => {
        if (loginState.email) {
          getOneMember(loginState.email).then(data => {
            setMember(data);
            console.log("data",data)
            // Store member in localStorage
            localStorage.setItem('member', JSON.stringify(data));
          });
        }
      }, [loginState]);
      const navigate = useNavigate();
      const handleToAbooutUs = () => {
        navigate("/board/aboutus")
  }
  return (
    <div>
        <Navbar expand="lg" className="bg-body-white mb-5 border-bottom">
            <Container>
                <Navbar.Brand href="/"><Image style={{ width: '150px'}} src='/images/logo1.jpg' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-3 pt-5 fw-bold fs-5 d-flex" >
              <Nav.Link href="/products/brandnew" className='me-3' >신상</Nav.Link>
              <Nav.Link href="/products/brand" className='me-3'>브랜드</Nav.Link>
              <Nav.Link href="/products/luxary" className='me-3'>럭셔리</Nav.Link>
              <Nav.Link href="/products/collection" className='me-3'>컬렉션</Nav.Link>
              <Nav.Link href="/products/size" className='me-3'>사이즈</Nav.Link>
              <Nav.Link href="/products/price" >가격대</Nav.Link>
            </Nav>
            <div>
              <Nav bg="white" variant="light" className="justify-content-end mb-2 fs-6">
                <Nav.Link href="/board/notice">고객센터</Nav.Link>
                <Nav.Link href="/like?tab=cart">마이쇼핑</Nav.Link>
                <Nav.Link href="/mypage">마이페이지</Nav.Link>
                <Nav.Link href="/like">관심</Nav.Link>
                {isLogin ? (
                 <Nav.Link href="/member/logout" onClick={doLogout}>
                   
                   {member && member.name ? `${member.name}님 로그아웃` : '로그아웃'}
                   </Nav.Link>
                  ) : (
                    <Nav.Link href="/member/login">로그인</Nav.Link>
                  )}
              </Nav>
              <Form className="d-flex mt-2">
                <InputGroup>
                  <InputGroup.Text id="search-addon" style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '15px 0 0 15px' }}>
                    <Search />
                  </InputGroup.Text>
                  <FormControl
                    type="search"
                    aria-label="Search"
                    style={{
                      border: '1px solid black',
                      borderRadius: '0 15px 15px 0',
                    }}
                  />
                </InputGroup>
              </Form>
            </div>
          </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
            <Row>
                <Col md="12"><Outlet /></Col>
            </Row>
        </Container>
        <Container>
          <FooterWrapper>
            <LeftFooter>
              <div className='footerNav'>
                <div onClick={handleToAbooutUs} style={{ cursor: 'pointer' }}>회사 소개</div>
                <div>이용 약관</div>
                <div>개인정보 처리방침</div>
                <div>운동화 세탁 방법</div>
              </div>
              <div className='logoBox'>
                <img src='/images/logo.png' alt='logo' />
              </div>
            </LeftFooter>
            <RightFooter>
              <span>고객센터</span>
              <span>FAQ</span>
              <span>메일 주소</span>
              <span>전화번호</span>
              <DonaButton>기부하기</DonaButton>
            </RightFooter> 
          </FooterWrapper> 
        </Container>
    </div>
  )
}

export default AppLayout

const FooterWrapper = styled.div`
  margin-top: 51px;
  border-top: 1px solid black;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 8px;
  padding-bottom: 10px;
`

const LeftFooter = styled.div`
  font-size: 20px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  @media (max-width: 765px) {
    font-size: 14px;
  }
  .footerNav {
    text-align: center;
    display: flex;
    flex-direction: row;
    gap: 21px;
    div {
      width: 100%;
    }
    @media (max-width: 765px) {
      gap: 8px;
    }
  }
  .logoBox {
    width: 103px;
    height: 103px;
    @media (max-width: 765px) {
      width: 85px;
      height: 85px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const RightFooter = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  @media (max-width: 765px) {
    font-size: 14px;
  }
`

const DonaButton = styled.button`
  margin-top: 8px;
  width: 108px;
  height: 32px;
  border-radius: 16px;
  background-color: #625244;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
`


{/*
  {//로그인시에만 메뉴창 뜨게만들기
  } // 로그인시 메뉴 보여주기 
  {isLogin ? (
    <>
    {/*
      <NavDropdown title="qna" id="basic-nav-dropdown">
        <NavDropdown.Item href="/qna/add">add</NavDropdown.Item>
        <NavDropdown.Item href="/qna/list">list</NavDropdown.Item>
      </NavDropdown>
      
      <NavDropdown title="Products" id="basic-nav-dropdown">
       {member.id == 1? <NavDropdown.Item href="/products/add">add</NavDropdown.Item>  :<></>} 
        
        <NavDropdown.Item href="/products/list">list</NavDropdown.Item>
      </NavDropdown>
    </>
    ) : <></>
 }
</Nav>

<Nav>
  {/* 로그인 상태에 따라 메뉴 변경 
  {isLogin ? (
    <Nav.Link href="/member/logout" onClick={doLogout}>
      {member.name}님 로그아웃
    </Nav.Link>
  ) : (
    <Nav.Link href="/member/login">로그인</Nav.Link>
  )}
  </Nav>
  */}