import React from 'react'
import NoticeListComponent from '../../components/board/NoticeListComponent'
import HelpDeskLayout from '../../layout/HelpDeskLayout'
import { Container } from 'react-bootstrap'


const NoticePage = () => {
  return (
    <>
      <Container>
        <HelpDeskLayout></HelpDeskLayout>
        <div className='mb-3 mt-5 text-center'><h2>공지사항</h2></div>
        <NoticeListComponent />
      </Container>
    </>
  )
}

export default NoticePage