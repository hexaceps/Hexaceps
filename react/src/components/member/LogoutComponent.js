import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Container, Row, Col, Image, Form, FormControl, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { Outlet } from 'react-router-dom';
import useCustomLogin from '../../hooks/useCustomLogin';
import { loginPost } from '../../api/memberApi';

const AppLayout = () => {
  const { doLogout } = useCustomLogin();
  const [member, setMember] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 복원
  useEffect(() => {
    const storedMember = localStorage.getItem('member');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');

    if (storedMember && storedIsLoggedIn === 'true') {
      try {
        setMember(JSON.parse(storedMember));
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
        setMember(null);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogout = () => {
    doLogout();
    setMember(null);
    setIsLoggedIn(false);
    localStorage.removeItem('member');
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-white mb-5 border-bottom">
        <Container>
          <Navbar.Brand href="/">
            <Image style={{ width: '150px' }} src="/image/Logo.jpg" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-3 pt-5 fw-bold fs-5 d-flex">
              <Nav.Link href="/products/brandnew" className="me-3">신상</Nav.Link>
              <Nav.Link href="/products/brand" className="me-3">브랜드</Nav.Link>
              <Nav.Link href="/products/luxary" className="me-3">럭셔리</Nav.Link>
              <Nav.Link href="/products/collection" className="me-3">컬렉션</Nav.Link>
              <Nav.Link href="/products/size" className="me-3">사이즈</Nav.Link>
              <Nav.Link href="/products/price">가격대</Nav.Link>
            </Nav>
            <div>
              <Nav bg="white" variant="light" className="justify-content-end mb-2 fs-6">
                <Nav.Link href="/board/notice">고객센터</Nav.Link>
                <Nav.Link href="#">마이쇼핑</Nav.Link>
                <Nav.Link href="/mypage">마이페이지</Nav.Link>
                <Nav.Link href="#">관심</Nav.Link>
                {isLoggedIn ? (
                  <Nav.Link onClick={handleLogout}>
                    {member?.name ? `${member.name}님 로그아웃` : '로그아웃'}
                  </Nav.Link>
                ) : (
                  <Nav.Link href="/member/login">로그인</Nav.Link>
                )}
              </Nav>
              <Form className="d-flex mt-2">
                <InputGroup>
                  <InputGroup.Text
                    id="search-addon"
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid black',
                      borderRadius: '15px 0 0 15px',
                    }}
                  >
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
          <Col md="12">
            <Outlet context={{ setIsLoggedIn }} /> {/* Provide context */}
          </Col>
        </Row>
      </Container>
      <div className="bg-body-tertiary border-top mt-5 py-2 text-center">
        HEXACEPS
      </div>
    </div>
  );
};

export default AppLayout;
