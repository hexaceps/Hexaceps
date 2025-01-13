import React, { useEffect, useState } from 'react'
import { getOne } from '../../api/qnaApi';
import { Card, Button } from 'react-bootstrap';
import useCustomMove from '../../hooks/useCustomMove';

const initState = {
    qno:0,
    subject:'',
    content:'',
    qnaDate:null,
    replyAt:false
}

const ReadComponent = ({qno}) => {
  const [qna, setQna] = useState(initState);
    const { moveToList, moveToModify } = useCustomMove()
    useEffect(()=>{
        getOne(qno).then(data => {
            console.log("qna read",data)
            setQna(data)
        })
    }, [qno])
  return (
    <>
        {makeDiv('qno', qna.qno)}
        {makeDiv('subject', qna.subject)}
        {makeDiv('content', qna.content)}
        {makeDiv('dueDate', qna.qnaDate)}
        {makeDiv('complete', qna.replyAt ? '답변완료' : '답변대기중')}
        <div className='mt-3 text-end'>
          <Button variant='primary'  className='me-3' onClick={moveToList}>목록보기</Button>
          <Button variant='secondary' onClick={() => moveToModify(qno)}>수정</Button>
        </div>
    </>
  )
}

function makeDiv(title, value) {
    return (
      <Card className="mx-auto mb-2">
        <Card.Body className='d-flex'>
          <Card.Title className='w-25 text-primary'>{title}</Card.Title>
          <Card.Text>
            : { value }
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

export default ReadComponent