import React from 'react'
import QnAListComponent from '../../components/board/QnAListComponent'
import HelpDeskLayout from '../../layout/HelpDeskLayout'
import { Container } from 'react-bootstrap'

const QnAPage = () => {
  return (
    <>
      <Container>
        <HelpDeskLayout></HelpDeskLayout>
        <div className='mb-3 mt-5 text-center fs-2'>QnAPage</div>
        <QnAListComponent />
      </Container>
    </>
  )
}

export default QnAPage