import React, { useEffect, useRef, useState } from 'react'
import useCustomMove from '../../hooks/useCustomMove'
import useCustomLogin from '../../hooks/useCustomLogin'
import { checkPw, getList, replyOne } from '../../api/qnaApi'
import { Table, Collapse, Container, Row, Col , Button,Form, Nav, Dropdown, DropdownButton} from 'react-bootstrap'
import PageComponent from '../common/PageComponent'
import { Navigate, useNavigate } from 'react-router-dom'
import AddComponent from '../qna/AddComponent'
import ModifyComponent from '../qna/ModifyComponent'
import { adminAccount } from '../../adminEnv'
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
  password: null,
  secret : 0
}

const AdminQnAComponent = ({ productId, setSelectedQna, selectedQna, moveToRead }) => {
    const {loginState,isLogin,doLogout } = useCustomLogin()
    const {page, size, moveToList, refresh} = useCustomMove()
    const [serverData, setServerData] = useState(initState)
    const [excludeSecret, setExcludeSecret] = useState(false);
    const [showMyQnaOnly, setShowMyQnaOnly] = useState(false);
    const [openQna, setOpenQna] = useState(null)
    const [reply, setReply] = useState({})
    const [showAddComponent, setShowAddComponent] = useState(false)
    const [newQnaData, setNewQnaData] = useState(initStateQna)
    const [password, setPassword] = useState({});
    const [passwordInputQna, setPasswordInputQna] = useState(null); 
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [member, setMember] = useState(() => {
        const storedMember = localStorage.getItem('member');
        return storedMember ? JSON.parse(storedMember) : null;
      });
  
    const handleExcludeSecretChange = () => {
      setExcludeSecret(!excludeSecret);
    }
  
    const handleShowMyQnaOnlyChange = () => {
      setShowMyQnaOnly(!showMyQnaOnly);
    }
  
    const filteredQnaList = serverData.dtoList
      .filter((qna) => {
        if(selectedStatus === "all") return true;
        return qna.replyAt === parseInt(selectedStatus);
      })
      .filter((qna) => (excludeSecret ? qna.secret === 0 : true))
      .filter((qna) => (showMyQnaOnly ? qna.memberId?.email === loginState.email : true));
  
    const handleQnaClick = (qna) => {
      console.log("qnaMemberId", qna.memberId)
      // 관리자일 경우, 비밀번호 인증 없이 콜랩스를 열 수 있도록 처리
  
    if (loginState.email == adminAccount) {
      setOpenQna(openQna === qna.qno ? null : qna.qno);  // 이미 펼쳐져 있으면 닫기
    } else {
      if (qna.secret == 1 ) {
      } else if (qna.secret == 0) {
        setOpenQna(openQna == qna.qno ? null : qna.qno); 
      }
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
        getList({ page : currentPage, size },productId).then(data => {
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
      if(!member){
        alert('로그인을 해야 작성할 수 있어요');
        return;
      }else {
        setShowAddComponent(true);  
      }
    }
  
    const handleNewQnaChange = (e) => {
      const { name, value } = e.target;
      setNewQnaData(prevData => ({
        ...prevData,  // 기존 상태를 유지
        [name]: value, // 변경된 필드만 업데이트
      }));      
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
      if(member){
        console.log('새 문의글 저장:', newQnaData)
        console.log("pno?",productId) 
        console.log("id?",member.id) 
        postAdd(newQnaData,productId,member.id).then(result => {
            console.log("pno?",productId) 
            console.log("id?",member.id) 
            getList({ page: currentPage, size },productId).then(data => {
            setServerData(data);  
          }).catch(e => {
            console.error("게시글 목록 불러오기 실패:", e);
          });
            setNewQnaData({...initStateQna})
        }).catch(e => {
            console.error(e)
        })
        setShowAddComponent(false)
      }else{       return <Navigate  replace to="/member/login" />; }
    }
  
    const handlePasswordSubmit = (qna) => {
      // 비밀번호 입력창을 열 때만 비밀번호 확인을 요구할 QNA의 qno를 설정
      if (qna.secret === 1 && passwordInputQna !== qna.qno) {
        setPasswordInputQna(qna.qno);
      }
    };
  
    const handlePasswordChange = (e, qna) => {
      setPassword({
        ...password,
        [qna.qno]: e.target.value, 
      });
    };
  
   const checkPassword = (qna) => {
      console.log("비번", password[qna.qno]); // 각 qno에 맞는 비밀번호
      checkPw(qna.qno, { password: password[qna.qno] })
        .then((res) => {
          if (res.success) {
            setPasswordInputQna(null); // 비밀번호 맞으면 입력창을 숨기기
            setOpenQna(qna.qno); // 비밀번호가 맞으면 콜랩스를 열 수 있게 설정
            setPassword('')
          } else {
            alert('비밀번호가 틀렸습니다.');
          }
        })
        .catch((error) => {
          console.error('비밀번호 검증 실패', error);
        });
    };
    
    const handleCancel = () => {
      setShowAddComponent(false);
    }
  
      useEffect(()=>{
          getList({page :currentPage, size},productId).then(data => {
              console.log("data",data.dtoList)
              console.log("pno",productId)
             // console.log("id", member.id)
              setServerData(data)
              console.log("server",serverData)
             
          })
      }, [currentPage, size, refresh])
  
      const styles = {
        borderline: {
          borderBottom: '1px solid black', // Change 'black' to your desired color
        },
        headline:{
          borderTop: '3px solid black',
        }
      };
  
      const handleStatusChange = (status) => {
        setSelectedStatus(status);
      };
  
      const navigate = useNavigate();
  
      const handleMyQnaClick = () => {
        if(!member){
          alert('로그인을 해야 볼 수 있어요');
          return;
        }else {
          navigate("/mypage?page=C");
        }
      }
  
    return (
      <>
        <Container>
        <Row>
          <Col>
        {!showAddComponent && (
        <div className="d-flex">
            <Button variant= 'dark' className='me-2' style={{borderRadius:'15px', marginBottom:'15px'}} onClick={createQna}>문의글 작성하기</Button>
            <Button variant= 'outline-dark' className='me-2' style={{borderRadius:'15px', marginBottom:'15px', marginLeft: '10px'}} onClick={handleMyQnaClick}>나의 Q&A 조회 &gt; </Button>
        </div>
        )}
          </Col>
          <Col className="d-flex justify-content-end">
            <Form.Check type="checkbox"  label="비밀글 제외" style={{marginRight: "10px", marginTop: "7px"}}
                        checked ={excludeSecret} onChange={handleExcludeSecretChange} />
  
            <Form.Check type="switch" label="내 Q&A 보기" style={{marginRight: "10px", marginTop: "7px", color: "black"}}
                        checked ={showMyQnaOnly} onChange={handleShowMyQnaOnlyChange} />
  
            <DropdownButton variant= "outline-dark" id="dropdown-basic-button" 
                            title = {selectedStatus === "all" ? "답변상태" : selectedStatus === "0" ? "답변대기중" : "답변완료"}  
                            onSelect={handleStatusChange} >
              <Dropdown.Item eventKey="all" >답변상태</Dropdown.Item>
              <Dropdown.Item eventKey="0">답변대기중</Dropdown.Item>
              <Dropdown.Item eventKey="1">답변완료</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        </Container>
        <Container>
        {showAddComponent ? (
          <AddComponent newQnaData={newQnaData} handleNewQnaChange={handleNewQnaChange} handleSaveQna={handleSaveQna}
                        handleNewQnaSecret={handleNewQnaSecret} handleCancel={handleCancel} /> ) : (
          <Table hover >
          <thead className='text-center' style = {styles.headline}>
            <tr style = {styles.borderline}>
              <th>답변상태</th>
              <th>글제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
            </thead>
            <tbody>
            {filteredQnaList.map((qna) => (
              <React.Fragment key={qna.qno}>
                <tr style = {styles.borderline}>
                  <td className="text-center" style={{ width: '10%', fontSize: '1em', verticalAlign: 'middle' }}>
                    <span style = {{ color: qna.replyAt === 0 ? 'red' : 'black'}}>
                      {qna.replyAt === 0 ? '답변대기중' : '답변완료'}
                    </span>
                  </td>
                  <td onClick={ qna.secret === 1 && passwordInputQna !== qna.qno ? () => handlePasswordSubmit(qna): () => handleQnaClick(qna) }
                      className="text-center" style={{ cursor: 'pointer', width: '60%'}} >
                    {loginState.email === 'admin@hexa.com' || qna.secret === 0 ? ( <span> {qna.subject} </span> ) : passwordInputQna === qna.qno ? (
                    <div>
                      <input type='password' placeholder="비밀번호를 입력하세요" value={password[qna.qno] || ''} 
                          onChange={(e) => handlePasswordChange(e, qna)} style = {{borderRadius : "20px"}} />
                      <button style = {{marginLeft: "5px", borderRadius: "20px", color: "white", background: "#212529"}} onClick={() => checkPassword(qna)}>확인</button>
                    </div> ) :  openQna === qna.qno ? ( <span>{qna.subject} </span> ) : ( <span style = {{color: "gray"}}>비밀글입니다.</span>)
                    }
                  </td>
                  <td className="text-center" style={{width: '20%'}}>{qna.memberId.name}</td>
              
                  <td className="text-center" style={{width: '20%'}}>{new Date(qna.qnaDate).toISOString().split('T')[0]}</td>
                </tr>
                
                {/* Q&A 내용이 펼쳐지도록 Collapse 적용 */}
                <Collapse in={openQna === qna.qno}>
                <tr id={`qna-${qna.qno}`}  style = {styles.borderline}>
                  <td colSpan="4">
                    <div style={{ position: 'relative', marginTop: '10px' }} >
                      <p>내용 : {qna.content}</p>
                      {/* {id == qna.memberId.id ? <Button variant = "outline-dark" style = {{borderRadius : "15px", marginBottom: "10px"}} >수정</Button> : <></>} */}
                    </div>
                    {qna.replyAt === 1 || loginState.email == "admin@hexa.com" ? <hr/> : <></>}
                    <div>
                      {loginState.email == "admin@hexa.com" && !qna.reply ? 
                        <>
                        <Form.Group className="mb-3" controlId="titleForm.ControlInput1">
                            <Form.Label>답글 :</Form.Label>
                            <Form.Control   type={"text"}  name={`reply-${qna.qno}`} value={reply[qna.qno] || ''} 
                              style = {{border : '1px solid black', borderRadius : "15px"}}
                              onChange={(e) => handleChangeReply(e, qna)} placeholder="내용을 입력하세요" />
                        </Form.Group>
                        <Button variant = "dark" className='me-1' style = {{border : '1px solid black', borderRadius : "15px"}} onClick={() => createReply(qna)}>댓글 작성</Button></> : <></>  
                      }
                      <p></p>   
                      {qna.replyAt === 1 ? <p> 답글 : {qna.reply} </p>  : <></>}    
                      <p/>
                      {qna.replyAt === 1 ? <p> 작성자 : 관리자 {qna.replyDate} </p> : <></>}  
                      {/* <p/> {qna.replyAt === 1 && loginState.email == "admin@hexa.com" ? <Button variant = "outline-dark" style = {{borderRadius : "15px"}}>수정</Button> : <></>} */}
                      <p/>       
                    </div>
                  </td>
                </tr>
              </Collapse>
            </React.Fragment> ))}
          </tbody>
        </Table> )}
      </Container>
      <PageComponent  serverData={serverData} moveToList={moveToList}  currentPage={currentPage} setCurrentPage={setCurrentPage} /> 
      </>
    )
  }
  
  export default AdminQnAComponent