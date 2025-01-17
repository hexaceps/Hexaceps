import React, { useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import AdminBoardComponent from './AdminBoardComponent'
import AdminQnAComponent from './AdminQnAComponent'
import AdminReviewComponent from './AdminReviewComponent'
import AdminPaymentComponent from './AdminPaymentComponent'
import AdminMemberComponent from './AdminMemberComponent'

const AdminComponent = () => {

  const [key, setKey] = useState('board')

  return (
    <>
      <Container>
          <Row>
              <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="uncontrolled-tab-example" className="mb-3" >
                  <Tab eventKey="board" title="공지사항/FAQ 관리"><AdminBoardComponent /></Tab>
                  {/* <Tab eventKey="qna" title="Q&A"><AdminQnAComponent /></Tab> */}
                  <Tab eventKey="review" title="리뷰"><AdminReviewComponent /></Tab>
                  <Tab eventKey="payment" title="결제"><AdminPaymentComponent /></Tab>
                  <Tab eventKey="delivery" title="배송"></Tab>
                  <Tab eventKey="member" title="회원"><AdminMemberComponent /></Tab>
              </Tabs>
          </Row>
      </Container>
    </>
  )
}

export default AdminComponent