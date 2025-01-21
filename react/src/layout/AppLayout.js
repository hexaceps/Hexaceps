import React, { useEffect, useState,useDispatch } from 'react'
import {Nav, Navbar, NavDropdown, Container, Row, Col,Image,  Form, FormControl, InputGroup} from 'react-bootstrap';
import {  Outlet, useNavigate } from 'react-router-dom';
import { Search, Incognito } from 'react-bootstrap-icons'; // 돋보기 아이콘 추가
import  useCustomLogin from '../hooks/useCustomLogin'
import { getOneMember } from '../api/memberApi';
import { adminAccount } from '../adminEnv'
import styled from 'styled-components';

const AppLayout = () => {
  const {loginState,isLogin,doLogout } = useCustomLogin()
  const [searchQuery, setSearchQuery] = useState(''); 
  const [searchResults, setSearchResults] = useState([]); 
  const navigate = useNavigate();  //
  const [member, setMember] = useState(() => {
      // Get member from localStorage if available
      const storedMember = localStorage.getItem('member');
      return storedMember ? JSON.parse(storedMember) : null;
    });

    const handleSearch = () => {
        if (searchQuery.trim()) {
          const encodedQuery = encodeURIComponent(searchQuery);
          navigate(`/search?query=${encodedQuery}`);
        }
      };
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

    const updateMemberInfo = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) return;
  
      try {
        const data = await getOneMember(loginState.email);
        setMember(data);
        localStorage.setItem('member', JSON.stringify(data));
        console.log('Updated member info:', data);
      } catch (error) {
        console.error('Failed to fetch member info:', error);
      }
    };
  
    useEffect(() => {
      if (loginState.email) {
        updateMemberInfo();
      }
    }, [loginState.email]);

    useEffect(() => {
      const interval = setInterval(async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return;
  
        const isTokenValid = true; 
        if (!isTokenValid) {
          console.log('Refreshing accessToken...');
          await updateMemberInfo();
        }
      }, 10000); // 1분마다 확인
  
      return () => clearInterval(interval); 
    }, []);
     
  return (
    <div>
      {/* 상단 헤더 메뉴 */}
        <Navbar expand="lg" className="bg-body-white mb-5 border-bottom" style={{ fontFamily : "Rowdies, GmarketSansMedium" }}>
          <Container>
            <Navbar.Brand href="/"><Image style={{ width: '150px'}} src='/images/logo1.jpg' /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {/* 헤더 기본 서브 메뉴 */}
              <Nav className="me-auto ms-5 pt-5" style={{fontSize : "1.1rem",  fontWeight : "bold"}}>
                {/* <Nav.Link href="/products/brandnew" className='me-3' >신상</Nav.Link> */}
                <Nav.Link href="/products/brand" className='me-3'>BRAND</Nav.Link>
                <Nav.Link href="/products/luxary" className='me-3'>LUXURY</Nav.Link>
                <Nav.Link href="/products/collection" className='me-3'>SEASON</Nav.Link>
                <Nav.Link href="/products/size" className='me-3'>SIZE</Nav.Link>
                <Nav.Link href="/products/price" >PRICE</Nav.Link>
              </Nav>
              {/* 사용자 메뉴 기능 */}
              <div>
                <Nav bg="white" variant="light" className="justify-content-end mb-2" style={{fontSize : "0.8rem"}}>
                  { loginState.email === adminAccount ? <Nav.Link href='/admin'><Incognito /></Nav.Link> : <></>}
                  <Nav.Link href="/board/notice">ABOUT</Nav.Link>
                  <Nav.Link href="/like?tab=cart">MY SHOP</Nav.Link>
                  <Nav.Link href="/mypage">MY PAGE</Nav.Link>
                  {/* <Nav.Link href="/like">관심</Nav.Link> */}
                  {isLogin ? (
                  <Nav.Link href="/member/logout" onClick={doLogout}>
                    {member && member.name ? `${member.name}님 로그아웃` : 'LOGOUT'}
                      </Nav.Link> ) : ( <Nav.Link href="/member/login">LOGIN</Nav.Link>)}
                  </Nav>
                  <Form className="d-flex mt-2" onSubmit={(e) => e.preventDefault()}>
                <InputGroup>
                  <InputGroup.Text
                    id="search-addon"
                    style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '15px 0 0 15px', cursor: 'pointer' }}
                    onClick={handleSearch}
                  >
                    <Search />
                  </InputGroup.Text>
                  <FormControl
                    type="search"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyPress} // 엔터로 검색
                    style={{ border: '1px solid black', borderRadius: '0 15px 15px 0' }}
                  />
                </InputGroup>
              </Form>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>
          <Row>
            <Col md={1}></Col>
            <Col md={10}><Outlet /></Col>
            <Col md={1}></Col>
          </Row>
        </Container>

        {/* 하단 푸터 */}
        <Container >
          <FooterWrapper style={{ fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244"}}>
            <LeftFooter className='mt-3'>
              <div className='footerNav' style={{fontSize : "0.9rem"}} >
                <div><Nav.Link href="https://youtu.be/ULp3xsZXH54">회사소개</Nav.Link></div>
                <div><Nav.Link href="/board/agreement">이용약관</Nav.Link></div>
                <div style={{minWidth : "110px"}}><Nav.Link href="/board/privacy">개인정보 처리방침</Nav.Link></div>
                <div style={{minWidth : "100px"}}><Nav.Link href="https://www.nike.com/kr/a/how-to-clean-shoes">운동화 세탁 방법</Nav.Link></div>
              </div>
              <div className='logoBox'>
                <img src='/images/logo.png' alt='logo' />
              </div>
            </LeftFooter>
            <RightFooter className='mt-3 me-3 text-end' style={{fontSize : "0.9rem"}}>
              <Nav.Link href="/board/faq"><span>FAQ</span></Nav.Link>
              <Nav.Link href="/board/notice"><span>NOTICE</span></Nav.Link>
              <Nav.Link href="/board/aboutus"><span>NEWS LETTER</span></Nav.Link>
              <Nav.Link href="https://hexaceps-concept.my.canva.site/hexaceps-shop"><span>ABOUT HEXACEPS</span></Nav.Link>
              {/* <DonaButton>기부하기</DonaButton> */}
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
  font-size: 100%;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  @media (max-width: 765px) {
    font-size: 14px;
  }
  .footerNav {
    text-align: center;
    display: flex;
    flex-direction: row; /* 기본은 가로 정렬 */
    gap: 21px;
    div {
      width: 100%;
    }
    @media (max-width: 765px) {
      flex-direction: column; /* 모바일에서는 세로 정렬 */
      gap: 8px;
      align-items: center;
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
`;

// const LeftFooter = styled.div`
//   font-size: 20px;
//   font-weight: 500;
//   display: flex;
//   flex-direction: column;
//   @media (max-width: 765px) {
//     font-size: 14px;
//   }
//   .footerNav {
//     text-align: center;
//     display: flex;
//     flex-direction: row;
//     gap: 21px;
//     div {
//       width: 100%;
//     }
//     @media (max-width: 765px) {
//       gap: 8px;
//     }
//   }
//   .logoBox {
//     width: 103px;
//     height: 103px;
//     @media (max-width: 765px) {
//       width: 85px;
//       height: 85px;
//     }
//   }
//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `

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