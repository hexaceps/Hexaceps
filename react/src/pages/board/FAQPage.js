import React from 'react'
import FAQListComponent from '../../components/board/FAQListComponent'
import HelpDeskLayout from '../../layout/HelpDeskLayout'
import { Container } from 'react-bootstrap'


const FAQPage = () => {
  return (
    <>
      <Container>
        <HelpDeskLayout></HelpDeskLayout>
        <div className='mb-3 mt-5 text-center fs-2'>FAQPage</div>
        <FAQListComponent />
      </Container>
    </>
  )
}

export default FAQPage