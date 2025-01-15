import React from 'react'
import HelpDeskLayout from '../../layout/HelpDeskLayout'
import { Container } from 'react-bootstrap'
import AboutUsComponent from '../../components/board/AboutUsComponent'

const AboutUsPage = () => {
  return (
    <Container style={{ fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244"}}>
        <HelpDeskLayout></HelpDeskLayout>
        {/* <div className='mb-3 mt-5 text-center fs-2'>About Us Page</div> */}
        <AboutUsComponent />
        
    </Container>
  )
}

export default AboutUsPage