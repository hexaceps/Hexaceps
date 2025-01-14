import React, { useState } from 'react'
import {Form, Button } from 'react-bootstrap'
import { postAdd } from '../../api/qnaApi'
import ResultModal from '../common/ResultModal'

const initState = {
    subject: '',
    content: '',
    qnaDate: '',
    password: '',
    secret: 0

}

const AddComponent = ({ newQnaData, handleNewQnaChange, handleSaveQna,handleNewQnaSecret, handleCancel}) => {

    //결과 데이터가 있으면 resultModal을 보여준다.
    const [result, setResult] = useState(null)
    const [titleError, setTitleError] = useState('')
    const closeModal = () => {
        setResult(null)
        
    }
    const handleTitleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'subject') {
            if (value.length <= 50) {
                handleNewQnaChange(e)
                setTitleError("")
            } else {
                setTitleError('제목은 50자 이내로 입력해주세요.');
            }
        }
        handleNewQnaChange(e); // 부모 컴포넌트의 상태 변경 함수 호출
    }
    const isAddButtonDisabled = titleError !== '' || newQnaData.subject.trim().length === 0
  return (
    <>
    {result? <ResultModal title={'Add Result'} content={`New ${result} Added`} callbackFn={closeModal}/> : <></>}
    <Form.Group className="mb-3" controlId="titleForm.ControlInput1">
        <Form.Label>제목</Form.Label>
        <Form.Control type={"text"} name="subject" placeholder="제목을 입력하세요" value={newQnaData.subject}
            onChange={handleTitleChange} style = {{border : '1px solid black', borderRadius : "15px", width : "50%"}} maxLength={50}/>
        {titleError && <small style={{ color: 'red' }}>{titleError}</small>}
    </Form.Group>

    <Form.Group className="mb-3" controlId="contentForm.ControlInput1">
        <Form.Label>내용</Form.Label>
        <Form.Control as="textarea" rows={4} name="content" placeholder="내용을 입력하세요" value={newQnaData.content}
            onChange={handleNewQnaChange} style = {{border : '1px solid black', borderRadius : "15px", width : "80%"}} maxLength={200}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="password.ControlInput1">
        <Form.Label>비번</Form.Label>
        <Form.Control type={"text"} name="password" placeholder="비번을 입력하세요" value={newQnaData.password}
            onChange={handleNewQnaChange} style = {{border : '1px solid black', borderRadius : "15px", width : "20%"}}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="secretControl">
        <Form.Label>비밀글</Form.Label>
        <Form.Check type="checkbox" name="secret" label="비밀글로 설정"
            checked={newQnaData.secret === 1}  // 1이면 체크됨, 0이면 체크되지 않음
            onChange={handleNewQnaSecret} style = {{accentColor : "black"}} />
    </Form.Group>

    <Button variant= 'outline-dark' type="button" onClick={handleSaveQna}  style={{borderRadius:'15px'}} disabled={isAddButtonDisabled}>추가</Button>
    <Button variant= 'dark' type="button" onClick={handleCancel}  style={{borderRadius:'15px', marginLeft: '10px'}}>취소</Button>
    </>
  )
}

export default AddComponent