import React from 'react'
import FAQListComponent from '../../components/board/FAQListComponent'
import HelpDeskLayout from '../../layout/HelpDeskLayout'
import { Container } from 'react-bootstrap'


const FAQPage = () => {
  return (
    <>
      <Container style={{ fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244"}}>
        <HelpDeskLayout></HelpDeskLayout>
        <div className='mb-3 mt-5 text-center fs-2'>FAQ</div>
        <FAQListComponent />
      </Container>
    </>
  )
}

export default FAQPage