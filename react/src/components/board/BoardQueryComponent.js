import React, { useEffect, useState } from 'react'
import { Button, Container, Table, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';
import { getCategoryBoardSearchByKeyword, getCategoryList } from '../../api/boardApi';

const initState = {
  id: 0,
  category: "faq",
  title: null,
  content: null,
  author: null,
  createdAt: null,
  updatedAt: null,
  count: 0,
  visible: false
}

const dateFormatted = (dateString) => {
  if (!dateString) return "1970-01-01 00:00:00";
  const date = new Date(dateString);
  const pad = (n) => (n < 10 ? `0${n}` : n);
  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  // const hh = pad(date.getHours());
  // const mm = pad(date.getMinutes());
  // const ss = pad(date.getSeconds());
  return `${yyyy}-${MM}-${dd}` // ${hh}:${mm}:${ss}`
};

const BoardQueryComponent = ({ category, keyword }) => {
  const [serverData, setServerData] = useState(initState)
  const navigate = useNavigate()

  useEffect(() => {
    console.log("쿼리 페이지에서 넘어온 값 확인 : "+category+", "+keyword)
    if(!category || !keyword) {
        return
    }
    getCategoryBoardSearchByKeyword({ category, keyword }).then(data => {
        console.log("Board Query Data recieved from back-end server : ", data)
        setServerData(data)
    })
  }, [category, keyword])

  
  const moveToRead = (board_id) => {
    navigate(`/board/${board_id}`)
  }

  const moveToList = () =>{
    navigate(`/board/${category}`)
  }
  
  return (
    <>
      <Container className='ms-3' style={{ fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244"}}>
        <Table striped bordered hover
          className='mt-5' style={{borderBottom : "1px solid #625244"}} >
          <thead>
            <tr className='text-center'>
              <th>번호</th>
              <th>제목</th>
              <th>작성일</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {serverData && serverData.length > 0 ? (
              serverData.map((queryList) => (
                <tr key={queryList.id}>
                  <td className='text-center'>{queryList.category==="faq" ? "FAQ" : queryList.category=="notice" ? "NOTICE" : "기타"}</td>
                  <td onClick={() => moveToRead(queryList.id)} style={{cursor : "pointer", paddingLeft : "30px"}}>{queryList.title}</td>
                  <td className='text-center'>{dateFormatted(queryList.createdAt)}</td>
                  <td className='text-center'>조회수 {queryList.count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={"4"} className='text-center bold' style={{ color : "#625244" }} ><h5> <Search></Search> 요청하신 {keyword} (으)로 검색된 결과가 없습니다</h5></td>
              </tr>
            )}
          </tbody>
        </Table>
        <Row>
          <div className='text-end'>
            <Button variant='outline-secondary' onClick={() => moveToList()} >리스트</Button>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default BoardQueryComponent