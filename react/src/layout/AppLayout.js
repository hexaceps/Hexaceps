import React, { useEffect, useState,useDispatch } from 'react'
import {Nav, Navbar, NavDropdown, Container, Row, Col,Image,  Form, FormControl, InputGroup} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'; // 돋보기 아이콘 추가
import { Outlet } from 'react-router-dom';
import  useCustomLogin from '../hooks/useCustomLogin'
import { getOneMember } from '../api/memberApi';


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
              <Nav.Link href="/products/list" className='me-3'>사이즈</Nav.Link>
              <Nav.Link href="/products/list" >가격대</Nav.Link>
            </Nav>
            <div>
              <Nav bg="white" variant="light" className="justify-content-end mb-2 fs-6">
                <Nav.Link href="#">고객센터</Nav.Link>
                <Nav.Link href="#">마이쇼핑</Nav.Link>
                <Nav.Link href="/mypage">마이페이지</Nav.Link>
                <Nav.Link href="#">관심</Nav.Link>
                {isLogin ? (
                 <Nav.Link href="/member/logout" onClick={doLogout}>
                   {member.name}님 로그아웃
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
        <div className='bg-body-tertiary border-top mt-5 py-2 text-center'>
          HEXACEPS
        </div>
    </div>
  )
}

export default AppLayout





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