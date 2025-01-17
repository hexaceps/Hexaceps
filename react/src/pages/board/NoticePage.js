import React from 'react'
import NoticeListComponent from '../../components/board/NoticeListComponent'
import HelpDeskLayout from '../../layout/HelpDeskLayout'
import { Container } from 'react-bootstrap'


const NoticePage = () => {
  return (
    <>
      <Container style={{ fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244"}}>
        {console.log("NoticePage() 동작 확인")}
        <HelpDeskLayout></HelpDeskLayout>
        <div className='mb-3 mt-5 text-center'><h2>공지사항</h2></div>
        <NoticeListComponent />
      </Container>
    </>
  )
}

export default NoticePage