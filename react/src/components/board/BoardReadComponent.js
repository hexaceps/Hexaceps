import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCategoryBoardDetailById } from '../../api/boardApi';
import { Button, Card, CardBody, Container, Table } from 'react-bootstrap';
import { adminAccount } from '../../adminEnv';

const initState = {
  id: 0,
  category: null,
  title: null,
  content: null,
  author: null,
  createdAt: null,
  updatedAt: null,
  count: 0,
  visible: false
}

const dateFormatted = (dateString) => {
  if (!dateString) return "1970-01-01";
  const date = new Date(dateString);
  const pad = (n) => (n < 10 ? `0${n}` : n);
  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  return `${yyyy}-${MM}-${dd}`;
};

const BoardReadComponent = ({ board_id }) => {

  console.log("page에서 받은 id 값", board_id)
  const [board, setBoard] = useState(initState);
  const [member, setMember] = useState("")

  const navigate = useNavigate()
  const moveToList = (category) => {
    navigate(`/board/${category}`)
  }
  const moveToUpdate = (board_id) => {
    navigate(`/board/update/${board_id}`)
  }

  useEffect(() => {
    getCategoryBoardDetailById(board_id).then(data => {
      console.log("Notice Deatil recieved from back-end serve : ", data)
      setBoard(data)
    })
  }, [board_id])

  useEffect(() => {
    const storedMember = localStorage.getItem("member");
    if (storedMember) {
        const parsedMember = JSON.parse(storedMember);
        setMember(parsedMember);
        console.log("Member 초기화 완료:", parsedMember.email);
    } else {
        console.warn("로컬 스토리지에 member 정보가 없습니다.");
    }
  }, []);

  return (
    <>
      <Container style={{ fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244"}}>
        <div className='mb-3 mt-5 text-center'><h2>{board.category==="notice" ? "공지사항" : "faq" ? "FAQ" : "HEXACEPS 안내"}</h2></div>
        <div>
          <Table className='mt-5' style={{borderBottom : "1px solid #625244"}}>
            <thead>
              <tr className='text-center'>
                  <td></td>
                  <td>TITLE</td>
                  <td>DATE</td>
                  <td>WRITER</td>
              </tr>
              <tr className='text-center'>
                <td>{board.category==="notice" ? "공지" : "faq" ? "FAQ" : "기타"}</td>
                <td>{board.title}</td>
                <td>{dateFormatted(board.createdAt)}</td>
                <td>{board.author}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4}>
                  <Card className="mx-auto mb-3 mt-3">
                    <CardBody>
                      <Card.Text className='text-secondary'>
                        {board.content}
                      </Card.Text>
                    </CardBody>
                  </Card>
                </td>
              </tr>
            </tbody>
          </Table>
          <div className='mt-3 text-end'>
            <Button variant='primary'  className='me-3' onClick={() => moveToList(board.category)}>목록보기</Button>
            {member.email === adminAccount ? 
              <Button variant='outline-danger' className='me-2' onClick={() => moveToUpdate(board_id)}>수정</Button> : <></>
            }
          </div>
        </div>
      </Container>
    </>
  )
}

export default BoardReadComponent