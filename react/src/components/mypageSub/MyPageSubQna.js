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

const initStateQna = {
subject: '',
content: '',
password: '',
secret : 0
}

const MyPageSubQna = () => {
  const {loginState,isLogin,doLogout } = useCustomLogin()
  const {page, size, moveToList, refresh} = useCustomMove()
  const [serverData, setServerData] = useState(initState)
  const [openQna, setOpenQna] = useState(null)
  const [reply, setReply] = useState({})
  const [password, setPassword] = useState({});
  const [passwordInputQna, setPasswordInputQna] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1)
  const [member, setMember] = useState(() => {
      const storedMember = localStorage.getItem('member');
      return storedMember ? JSON.parse(storedMember) : null;
    });

    const styles = {
      borderline: {
        borderBottom: '1px solid black', // Change 'black' to your desired color
      },
      headline:{
        borderTop: '3px solid black',
      }
    };

  const handleQnaClick = (qna) => {

    // 관리자일 경우, 비밀번호 인증 없이 콜랩스를 열 수 있도록 처리
if (loginState.email == 'admin@hexa.com') {
  setOpenQna(openQna === qna.qno ? null : qna.qno);  // 이미 펼쳐져 있으면 닫기
} else {
  setOpenQna(openQna == qna.qno ? null : qna.qno); 
  }
};

  useEffect(()=>{
      getListId({page :currentPage, size},member.id).then(data => {
          console.log("data",data.dtoList)
          console.log("pno",member.id)
          setServerData(data)
          console.log("server",serverData)
         
      })
  }, [currentPage, size, refresh])

  
return (
  <>
  <Container>
    <Table  hover >
    <thead className='text-center' style = {styles.headline}>
      <tr style = {styles.borderline}>
        <th>번호</th>
        <th>글제목</th>
        <th>작성자</th>
        <th>날짜</th>
      </tr>
    </thead>
    <tbody>
      {serverData.dtoList.filter(qna => qna.memberId.id == member.id).map((qna,index) => (
        <React.Fragment key={qna.qno}>
          <tr style = {styles.borderline}>
            <td className="text-center" style={{ width: '10%', fontSize: '0.9rem', verticalAlign: 'middle' }}>
              <span style = {{ color: qna.replyAt === 0 ? 'red' : 'black'}}>
                {qna.replyAt === 0 ? '답변대기중' : '답변완료'}
              </span>
            </td>
            <td onClick={() => handleQnaClick(qna)} className="text-center" style={{ cursor: 'pointer', width: '60%' }} >
              <span> {qna.subject} </span>
            </td>
            <td className="text-center" style={{ width: '20%' }}>{qna.memberId.name}</td>
            <td className="text-center" style={{ width: '20%' }}>{new Date(qna.qnaDate).toISOString().split('T')[0]}</td>
          </tr>
            {/* Q&A 내용이 펼쳐지도록 Collapse 적용 */}
            <Collapse in={openQna === qna.qno}>
              <tr id={`qna-${qna.qno}`} style = {styles.borderline}>
                <td colSpan="4">
                  <div style={{ position: 'relative', marginTop: '10px' }} >
                    <p>내용 : {qna.content}</p>                        
                  </div> {qna.replyAt === 1 ? <hr/> : <></>} 
                  <div>
                    <p></p>   
                    {qna.replyAt === 1 ? 
                    <p> 답글 : {qna.reply} </p>  : <></>}    
                    <p/>
                    {qna.replyAt === 1 ? 
                    <p> 작성자 : 관리자 {qna.replyDate} </p> : <></>}               
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