import React from 'react'
import { useParams} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import ReadComponent from '../../components/qna/ReadComponent'

const ReadPage = () => {
  const {qno} = useParams()
 
  return (
    <>
    <Container>
      <div className='my-5'>{qno} 번 data</div>
      <ReadComponent qno={qno} />
    </Container>
    </>
  )
}

export default ReadPage