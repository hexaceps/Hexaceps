import React, { useEffect, useRef, useState } from 'react'
import useCustomMove from '../../hooks/useCustomMove'
import useCustomLogin from '../../hooks/useCustomLogin'
import { checkPw, getList, getListId, replyOne } from '../../api/qnaApi'
import { Table, Collapse, Container, Row, Col , Button,Form, Nav} from 'react-bootstrap'
import PageComponent from '../common/PageComponent'



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



const MyPageSubQna = ({id}) => {
  const {loginState,isLogin,doLogout } = useCustomLogin()
  const {page, size, moveToList, refresh} = useCustomMove()
  const [serverData, setServerData] = useState(initState)
  const [openQna, setOpenQna] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)





  const handleQnaClick = (qna) => {

    // 관리자일 경우, 비밀번호 인증 없이 콜랩스를 열 수 있도록 처리
if (loginState.email == 'admin@hexa.com') {
  setOpenQna(openQna === qna.qno ? null : qna.qno);  // 이미 펼쳐져 있으면 닫기
} else {
  setOpenQna(openQna == qna.qno ? null : qna.qno); 
  }

};


  useEffect(()=>{
      getListId({page :currentPage, size},id).then(data => {
          console.log("data",data.dtoList)
          console.log("pno",id)
          setServerData(data)
          console.log("server",serverData)
         
      })
  }, [currentPage, size, refresh])

  
return (
  <>
  <Container>
   
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
    {serverData.dtoList.filter(qna => qna.memberId.id == id).map((qna,index) => (
                             <React.Fragment key={qna.qno}>
                             <tr>
                               <td className="text-center" style={{ width: '10%' }}>{index + 1}번</td>
                               <td
                         onClick={() => handleQnaClick(qna)}
                        className="text-center"
                        style={{ cursor: 'pointer', width: '60%' }}
                      >
                        
                     
                          <span> {qna.subject} <span
                              style={{
                                fontSize: '0.5em',
                                float: 'right',
                                color: '#888',
                              }}
                            >
                              {qna.replyAt === 0 ? '답변대기중' : '답변완료'}
                            </span></span>
                      
                               </td>
                               <td className="text-center" style={{
                                     fontSize: '0.8em' , width: '20%'}}>{qna.memberId.name}</td>
                      
                               <td className="text-center" style={{
                                     fontSize: '0.5em' , width: '20%'}}>{qna.qnaDate}</td>
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
                                        {qna.qnaDate}
                                      </span>                              
                                   </div>
                                   <div>
                                    
                                     <p></p>   
                                     {qna.replyAt === 1 ? <p> {qna.reply} 작성자 : 관리자 {qna.replyDate}</p>  : <></>}               
                                     </div>
                                   </td>
                                   </tr>
                                 </Collapse>
                        
                           </React.Fragment>
                         ))}
                     </tbody>
  </Table>
              
  </Container>
  <PageComponent  serverData={serverData} moveToList={moveToList}  currentPage={currentPage} setCurrentPage={setCurrentPage} /> 

 

  </>
)
}

export default MyPageSubQna
