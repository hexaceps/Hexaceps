import React, { useEffect, useState,useDispatch } from 'react'
import {Nav, Navbar, NavDropdown, Container, Row, Col,Image} from 'react-bootstrap';
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
        <Navbar expand="lg" className="bg-body-tertiary mb-5">
            <Container>
              
                <Navbar.Brand href="/"><Image style={{ width: '70px', height: 'auto' }} src='/image/hexaceps1.png' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/about">about</Nav.Link>

                      {//로그인시에만 메뉴창 뜨게만들기
                      } {/* 로그인시 메뉴 보여주기 */}
                      {isLogin ? (
                        <>
                        {/*
                          <NavDropdown title="qna" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/qna/add">add</NavDropdown.Item>
                            <NavDropdown.Item href="/qna/list">list</NavDropdown.Item>
                          </NavDropdown>
                          */}
                          <NavDropdown title="Products" id="basic-nav-dropdown">
                           {member.id == 1? <NavDropdown.Item href="/products/add">add</NavDropdown.Item>  :<></>} 
                            
                            <NavDropdown.Item href="/products/list">list</NavDropdown.Item>
                          </NavDropdown>
                        </>
                        ) : <></>
                     }
                    </Nav>
        
                    <Nav>
                      {/* 로그인 상태에 따라 메뉴 변경 */}
                      {isLogin ? (
                        <Nav.Link href="/member/logout" onClick={doLogout}>
                          {member.name}님 로그아웃
                        </Nav.Link>
                      ) : (
                        <Nav.Link href="/member/login">로그인</Nav.Link>
                      )}
                </Nav>
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