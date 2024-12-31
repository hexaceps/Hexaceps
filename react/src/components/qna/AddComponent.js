import React, { useState } from 'react'
import {Form, Button } from 'react-bootstrap'
import { postAdd } from '../../api/qnaApi'
import ResultModal from '../common/ResultModal'
import useCustomMove from '../../hooks/useCustomMove'

const initState = {
    subject: '',
    content: '',
    qna_Date: ''
}

const AddComponent = ({ newQnaData, handleNewQnaChange, handleSaveQna,handleNewQnaSecret }) => {

    //결과 데이터가 있으면 resultModal을 보여준다.
    const [result, setResult] = useState(null)


  

    const closeModal = () => {
        setResult(null)
        
    }
  return (
    <>
    {result? <ResultModal title={'Add Result'} content={`New ${result} Added`} callbackFn={closeModal}/> : <></>}
    <Form.Group className="mb-3" controlId="titleForm.ControlInput1">
        <Form.Label>제목</Form.Label>
        <Form.Control type={"text"} name="subject" placeholder="제목을 입력하세요"    value={newQnaData.subject}
                        onChange={handleNewQnaChange}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="contentForm.ControlInput1">
        <Form.Label>내용</Form.Label>
        <Form.Control type={"text"} name="content" placeholder="내용을 입력하세요" value={newQnaData.content}
                        onChange={handleNewQnaChange}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="password.ControlInput1">
        <Form.Label>비번</Form.Label>
        <Form.Control type={"text"} name="password" placeholder="비번을 입력하세요" value={newQnaData.password}
                        onChange={handleNewQnaChange}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="secretControl">
        <Form.Label>비밀글</Form.Label>
        <Form.Check
            type="checkbox"
            name="secret"
            label="비밀글로 설정"
            checked={newQnaData.secret === 1}  // 1이면 체크됨, 0이면 체크되지 않음
            onChange={handleNewQnaSecret}
        />
    </Form.Group>
  
    <Button variant="primary" type="button" onClick={handleSaveQna}>Submit</Button>
    </>
  )
}

export default AddComponent