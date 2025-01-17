import React, { useEffect, useState } from 'react'
// import { API_SERVER_HOST } from '../../api/qnaApi';
import { API_SERVER_HOST } from '../../serverEnv'
import useCustomMove from '../../hooks/useCustomMove';
import useCustomLogin from '../../hooks/useCustomLogin';
import ModifyMemberComponent from '../mypageSub/ModifyMemberComponent';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { getOneMember } from '../../api/memberApi';
import MyPageSubQna from '../mypageSub/MyPageSubQna';
import MypageSubReview from '../mypageSub/MypageSubReview';
import MyPageSubMemberCheck from '../mypageSub/MyPageSubMemberCheck';

const MyPageComponent = () => {

      const [page,setPage] = useState("A");
      const{moveToList, moveToModify, moveToRead } = useCustomMove();
      const host = API_SERVER_HOST;
      const {loginState,isLogin,doLogout } = useCustomLogin()
      const [member, setMember] = useState(() => {
          const storedMember = localStorage.getItem('member');
          return storedMember ? JSON.parse(storedMember) : null;
        });


    const handleTabClick = (pageName) => {
        setPage(pageName);
      };


  
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
    <>
    <Container>

        <hr />
  
    <Nav  fill  variant="tabs my-5"  activeKey={page}
      style={{
        width: '70%',
      height: '60px',  
      display: 'flex', 
      alignItems: 'stretch',
      fontSize : 'large' ,
      justifyContent: 'space-between'

     }}>
  <Nav.Item style={{ height: '100%',
              flex: 1, 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'}} >
    <Nav.Link
      eventKey="A"
      onClick={() => handleTabClick('A')}
      style={{
        backgroundColor: page === 'A' ? '#898989' : '',
        color: page === 'A' ? 'white' : '#777777',
        height: '100%', 
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center', 
      }}
    >
      회원정보 수정
    </Nav.Link>
  </Nav.Item>
  <Nav.Item style={{  height: '100%',
              flex: 1, 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center' }}>
    <Nav.Link
      eventKey="B"
      onClick={() => handleTabClick('B')}
      style={{
        backgroundColor: page === 'B' ? '#898989' : '',
        color: page === 'B' ? 'white' :  '#777777',
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
      }}
    >
      {member.name} 님의 리뷰
    </Nav.Link>
  </Nav.Item>
  <Nav.Item style={{  height: '100%',
              flex: 1, 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center' }}>
    <Nav.Link
      eventKey="C"
      onClick={() => handleTabClick('C')}
      style={{
        backgroundColor: page === 'C' ? '#898989' : '',
        color: page === 'C' ? 'white' :  '#777777',
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
      }}
    >
      {member.name} 님의 QNA
    </Nav.Link>
  </Nav.Item>
 
</Nav>

    <div style={{ width: '60%',margin: '0 auto' }}>
      {page === 'A' ? <MyPageSubMemberCheck id={member?.id} /> : <></>}
    </div>      
      {page === 'B' ? <MypageSubReview id={member?.id}/> : <></>}
      {page === 'C' ? <MyPageSubQna  id={member?.id} /> : <></>}
   

    </Container>
    </>
  )
}


export default MyPageComponent
