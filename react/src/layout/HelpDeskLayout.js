import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

const HelpDeskLayout = () => {
  return (
    <>
        <Container style={{ fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244"}}>
            <Nav className='justify-content-start' variant="tabs " style={{color : "#625244", fontFamily : "'GmarketSansMedium', Rowdies, sans-serif", borderBottom: "1px solid #625244"}}>
                <Nav.Item>
                    <LinkContainer to="/board/notice">
                        <Nav.Link className='text-secondary'>NOTICE</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="/board/faq">
                        <Nav.Link className='text-secondary'>FAQ</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="/board/aboutus">
                        <Nav.Link className='text-secondary'>AboutUs</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                {/* <Nav.Item>
                    <LinkContainer to="/board/qna">
                        <Nav.Link className='text-secondary'>Q&A(삭제예정)</Nav.Link>
                    </LinkContainer>
                </Nav.Item> */}
            </Nav>
        </Container>
    </>
  )
}

export default HelpDeskLayout