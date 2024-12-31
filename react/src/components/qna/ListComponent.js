import React, { useEffect, useState } from 'react'
import useCustomMove from '../../hooks/useCustomMove'
import useCustomLogin from '../../hooks/useCustomLogin'
import { checkPw, getList, replyOne } from '../../api/qnaApi'
import { Table, Collapse, Container, Row, Col , Button,Form, Nav} from 'react-bootstrap'
import PageComponent from '../common/PageComponent'
import { useNavigate } from 'react-router-dom'
import AddComponent from './AddComponent'
import { postAdd } from '../../api/qnaApi'



const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const initStateQna = {
  subject: '',
  content: '',
  password: '',
  secret : 0
}



const ListComponent = ({pno,id, setSelectedQna, selectedQna, moveToRead })=> {
    const {loginState,isLogin,doLogout } = useCustomLogin()
    const {page, size, moveToList, refresh} = useCustomMove()
    const [serverData, setServerData] = useState(initState)
    const [openQna, setOpenQna] = useState(null)
    const [reply, setReply] = useState({})
    const [showAddComponent, setShowAddComponent] = useState(false)
    const [newQnaData, setNewQnaData] = useState(initStateQna)
    const [password, setPassword] = useState('');
    const [passwordInputQna, setPasswordInputQna] = useState(null); 


 

    const handleQnaClick = (qna) => {
      // 비밀번호 인증이 완료된 경우에만 QNA를 열 수 있도록 처리
      if (passwordInputQna === null || passwordInputQna !== qna.qno) {
        setOpenQna(openQna === qna.qno ? null : qna.qno); // 이미 펼쳐져 있으면 닫기
      }
    };

    const handleChangeReply = (e,qna) => {
      setReply({
        ...reply,  
        [qna.qno] : e.target.value
      });
    };
    
    const createReply = (qna) => {
      const replyData = {
        reply: reply[qna.qno], 
        qno: qna.qno
      };
    
      replyOne(replyData).then(result => {
        console.log("답변 작성 결과", result);
        // 답변 작성 후 서버에서 데이터를 다시 가져와서 상태를 갱신
        getList({ page, size }).then(data => {
          setServerData(data);  // 새로 가져온 데이터로 갱신
        }).catch(e => {
          console.error("게시글 목록 불러오기 실패:", e);
        });
        setReply({});  
      }).catch(e => {
        console.error("에러", e);
      });
    }; 

    const createQna = () =>{
      setShowAddComponent(true);  

    }

    const handleNewQnaChange = (e) => {
      newQnaData[e.target.name] = e.target.value;
      setNewQnaData({ ...newQnaData, })

      
  }

  const handleNewQnaSecret = (e) => {
    const { name, checked } = e.target;
    // checked가 true이면 1, false이면 0으로 설정
    setNewQnaData({
      ...newQnaData,
      [name]: checked ? 1 : 0,
    });
  };

  const handleSaveQna = () => {
      console.log('새 문의글 저장:', newQnaData)
      console.log("pno?",pno) 
      console.log("id?",id) 
      postAdd(newQnaData,pno,id).then(result => {
               console.log("pno?",pno) 
               console.log("id?",id) 
               getList({ page, size }).then(data => {
                setServerData(data);  
              }).catch(e => {
                console.error("게시글 목록 불러오기 실패:", e);
              });
               setNewQnaData({...initStateQna})
           }).catch(e => {
               console.error(e)
           })
      setShowAddComponent(false)
  }

  const handlePasswordSubmit = (qna) => {
    // 비밀번호 입력창을 열 때만 비밀번호 확인을 요구할 QNA의 qno를 설정
    if (qna.secret === 1 && passwordInputQna !== qna.qno) {
      setPasswordInputQna(qna.qno);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const checkPassword = (qna) => {
    console.log("비번",password)
    // 비밀번호 확인 로직
    checkPw(qna.qno, {password})
      .then((res) => {
        if (res.success) {
          setPasswordInputQna(null); // 비밀번호 맞으면 입력창을 숨기기
          setOpenQna(qna.qno); // 비밀번호가 맞으면 콜랩스를 열 수 있게 설정
        } else {
          alert('비밀번호가 틀렸습니다.');
        }
      })
      .catch((error) => {
        console.error('비밀번호 검증 실패', error);
      });
  };





    useEffect(()=>{
        getList({page, size}).then(data => {
            console.log("data",data.dtoList)
            setServerData(data)
            console.log("server",serverData)
           
        })
    }, [page, size, refresh])

    
  return (
    <>
    <Container>
    {showAddComponent ? (
                    <AddComponent
                        newQnaData={newQnaData}
                        handleNewQnaChange={handleNewQnaChange}
                        handleSaveQna={handleSaveQna}
                        handleNewQnaSecret={handleNewQnaSecret}
                    />
                ) : (
    <Table striped bordered hover >
    <thead className='text-center'>
        <tr>
          <th>#</th>
          <th >글제목</th>
          <th>작성자</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
      {serverData.dtoList.filter(qna => qna.product_id.pno == pno).map((qna,index) => (
                               <React.Fragment key={qna.qno}>
                               <tr>
                                 <td className="text-center" style={{ width: '10%' }}>{index + 1}번</td>
                                 <td
                           onClick={
                            qna.secret === 1 && passwordInputQna !== qna.qno
                              ? () => handlePasswordSubmit(qna)
                              : () => handleQnaClick(qna)
                          }
                          className="text-center"
                          style={{ cursor: 'pointer', width: '60%' }}
                        >
                          {qna.secret === 1 &&  passwordInputQna !== qna.qno && openQna !== qna.qno? (
                            <span>비밀글입니다.       <span
                                style={{
                                  fontSize: '0.5em',
                                  float: 'right',
                                  color: '#888',
                                }}
                              >
                                {qna.reply_at === 0 ? '답변대기중' : '답변완료'}
                              </span></span>
                          ) : passwordInputQna === qna.qno ? (
                            <div>
                              <input
                              type='password'
                              placeholder="비밀번호를 입력하세요"
                                value={password}
                                onChange={handlePasswordChange}
                              />
                              <button onClick={() => checkPassword(qna)}>확인</button>
                            </div>
                          ) : (
                            <span>
                              {qna.subject}
                              <span
                                style={{
                                  fontSize: '0.5em',
                                  float: 'right',
                                  color: '#888',
                                }}
                              >
                                {qna.reply_at === 0 ? '답변대기중' : '답변완료'}
                              </span>
                                   </span>)}
                                 </td>
                                 <td className="text-center" style={{
                                       fontSize: '0.8em' , width: '20%'}}>{qna.member_id.name}</td>
                        
                                 <td className="text-center" style={{
                                       fontSize: '0.5em' , width: '20%'}}>{qna.qna_Date}</td>
                               </tr>
               
                               {/* Q&A 내용이 펼쳐지도록 Collapse 적용 */}
                               <Collapse in={openQna === qna.qno}>
                               <tr id={`qna-${qna.qno}`}>
                                 <td colSpan="4">
                                   <div
                                   style={{
                                          position: 'relative',
                                          padding: '10px',
                        
                                        }}
                                      >
                                        <p>내용 : {qna.content}</p>

                                        {/* 날짜 부분을 오른쪽 아래로 배치 */}
                                        <span
                                          className="m-b me"
                                          style={{
                                            fontSize: '0.5em',
                                            position: 'absolute',
                                            bottom: '5px', 
                                            right: '5px',  
                                            color: '#898989',
                                          }}
                                        >
                                          {qna.qna_Date}
                                        </span>                              
                                     </div>
                                     <div>
                                        {loginState.email == "admin@hexa.com" && !qna.reply ? 
                                        <>
                                         <Form.Group className="mb-3" controlId="titleForm.ControlInput1">
                                            <Form.Label>답글</Form.Label>
                                            <Form.Control   type={"text"} 
                                              name={`reply-${qna.qno}`} 
                                              value={reply[qna.qno] || ''} 
                                              onChange={(e) => handleChangeReply(e, qna)} 
                                          />
                                          </Form.Group>
                                      <Button className='me-1' onClick={() => createReply(qna)}>댓글작성</Button></> : <></>  
                                      }
                                       <p></p>   
                                       {qna.reply_at === 1 ? <p> {qna.reply} 작성자 : 관리자 {qna.reply_Date}</p>  : <></>}               
                                       </div>
                                     </td>
                                     </tr>
                                   </Collapse>
                          
                             </React.Fragment>
                           ))}
                       </tbody>
    </Table>
                )}
    </Container>
    <PageComponent serverData={serverData} moveToList={moveToList}/>
    {!showAddComponent && (
    <div className="d-flex justify-content-end">
        <Button className='btn-secondary me-5' onClick={createQna}>문의글 작성하기</Button>
    </div>
    )}
   

    </>
  )
}

export default ListComponent