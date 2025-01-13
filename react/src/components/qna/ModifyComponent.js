import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { deleteOne, getOne, putOne } from '../../api/qnaApi'
import useCustomMove from '../../hooks/useCustomMove'
import ResultModal from '../common/ResultModal'
//데이터를 가져와야 한다
const initState = {
    qno:0,
    subject:'',
    content:'',
    qnaDate:null,
    replyAt:false
}

const ModifyComponent = ({qno}) => {
    const [qna, setQna] = useState({...initState})

    //결과 데이터가 있으면 resultModal을 보여준다.
    const [result, setResult] = useState(null)

    const { moveToList, moveToRead} = useCustomMove()

    useEffect(()=>{
        getOne(qno).then(data => setQna(data))
    }, [qno])

    const handleChangeQna = (e) => {
        qna[e.target.name]= e.target.value
         setQna({...qna})
    }

    const handleChangeQnaComplete = (e) => {
         const value = e.target.value
         qna.complete = (value === 'Y')
         setQna({...qna})
    }

    //수정버튼 클릭
    const handleClickModify = () => {
        putOne(qna).then(data => {
            console.log("수정완료" + data)
            setResult('Modified')
        })
    }

    //삭제버튼 클릭
    const handleClickDelete = () => {
        deleteOne(qno).then(data => {
            console.log("삭제완료" + data)
            setResult('Deleted')
        })
    }

    const closeModal = () => {
        if(result === 'Deleted') {
            moveToList()
        } else {
            moveToRead(qno)
        }     
    }

  return (
    <>
        {result ?  <ResultModal title={'처리결과'} content={result} callbackFn={closeModal}/> : <></>}
        <Form.Group className="mb-3" controlId="titleForm.ControlInput1">
            <Form.Label>QNO</Form.Label>
            <Form.Control type={"text"} name="tno" value={qna.qno} onChange={handleChangeQna} disabled />
        </Form.Group>
        <Form.Group className="mb-3" controlId="titleForm.ControlInput1">
            <Form.Label>subject</Form.Label>
            <Form.Control type={"text"} name="title" value={qna.subject} onChange={handleChangeQna}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="contentForm.ControlInput1">
            <Form.Label>CONTENT</Form.Label>
            <Form.Control type={"text"} name="content" value={qna.content} onChange={handleChangeQna}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>qna_Date</Form.Label>
            <Form.Control type={"date"} name="dueDate" value={qna.qnaDate} onChange={handleChangeQna} />
        </Form.Group>
        <Form.Select aria-label="COMPLETE"
            value={qna.replyAt ? 'Y' : 'N'}
            onChange={handleChangeQnaComplete}
        >
            <option value="Y">답변완료</option>
            <option value="N">답변대기중 yet</option>
        </Form.Select>

        <div className='mt-3 text-end'>
            <Button variant="primary" className='me-3' onClick={handleClickModify}>수정</Button>
            <Button variant="secondary" onClick={handleClickDelete}>삭제</Button>
        </div>
    </>
  )
}

export default ModifyComponent