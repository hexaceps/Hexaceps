import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import AdminBoardComponent from './AdminBoardComponent'
import AdminReviewComponent from './AdminReviewComponent'
import AdminPaymentComponent from './AdminPaymentComponent'
import AdminMemberComponent from './AdminMemberComponent'
import AdminTrackingComponent from './AdminTrackingComponent'
import { adminAccount } from "../../adminEnv";

const AdminComponent = () => {

  const [key, setKey] = useState('board')
  const [member, setMember] = useState(null);

  useEffect(() => {
      const storedMember = localStorage.getItem("member");
      if (storedMember) {
        const parsedMember = JSON.parse(storedMember);
        setMember(parsedMember);
      }
    }, [])

  return (
    <>
      <Container>
        <Row>
            <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="uncontrolled-tab-example" className="mb-3" >
                <Tab eventKey="board" title="공지사항/FAQ 관리">{member?.email === adminAccount ? <AdminBoardComponent /> : <></>}</Tab>
                {/* <Tab eventKey="qna" title="Q&A"><AdminQnAComponent /></Tab> */}
                <Tab eventKey="review" title="리뷰">{member?.email === adminAccount ? <AdminReviewComponent /> : <></>}</Tab>
                <Tab eventKey="payment" title="결제">{member?.email === adminAccount ? <AdminPaymentComponent /> : <></>}</Tab>
                <Tab eventKey="delivery" title="배송">{member?.email === adminAccount ? <AdminTrackingComponent /> : <></>}</Tab>
                <Tab eventKey="member" title="회원">{member?.email === adminAccount ? <AdminMemberComponent /> : <></>}</Tab>
            </Tabs>
        </Row>
      </Container>
    </>
  )
}

export default AdminComponent