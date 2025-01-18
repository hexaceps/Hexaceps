import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { getAllCategoryList } from '../../api/boardApi';
import useCustomLogin from '../../hooks/useCustomLogin';
import { getOneMember } from '../../api/memberApi';
import { adminAccount } from '../../adminEnv'
import PageComponent from '../common/PageComponent'
import useCustomMove from '../../hooks/useCustomMove'
import FetchingModal from '../common/FetchingModal'

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

const dateFormatted = (dateString) => {
  if (!dateString) return "1970-01-01 00:00:00";
  const date = new Date(dateString);
  const pad = (n) => (n < 10 ? `0${n}` : n)
  const yyyy = date.getFullYear()
  const MM = pad(date.getMonth() + 1)
  const dd = pad(date.getDate())
  return `${yyyy}-${MM}-${dd}`
}

const AdminBoardComponent = () => {

  const { page, size, moveToList, refresh } = useCustomMove()
  const [currentPage, setCurrentPage] = useState(1)
  const [serverData, setServerData] = useState(initState)
  const [fetching, setFetching] = useState(false)
  const [member, setMember] = useState("")
  const { loginState } = useCustomLogin()
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => { // 공지사항 리스트 가져오는 로직
    setFetching(true)
    console.log("전체 게시판 리스트 useEffect 진입")
    const fetchData = async () => {
      console.log("전체 게시판 API 리스트 가져오는 중")
      const data = await getAllCategoryList({ pageParam: { page: currentPage, size } })
      setServerData(data)
      setFetching(false)
      console.log(data)
    }
    fetchData()
  }, [currentPage, size, refresh])


  useEffect(() => {
    setFetching(true)
    console.log("useEffect 에서 화면 진입시 회원정보를 가져오고 댓글 창을 관리할 관리자 모드를 확인 합니다")
    if (loginState.email) {
      getOneMember(loginState.email).then(data => {
        setMember(data)
        localStorage.setItem('member', JSON.stringify(data))
        console.log("사용자 정보 확인 : ", member)
        setFetching(false)
      })
    }
  }, [loginState])

  const navigate = useNavigate()

  const moveToRead = (board_id) => { // 타이틀 선택 하면 세부 항목으로 이동하는 로직
    navigate(`/board/${board_id}`)
    console.log("Board ID 게시글로 이동 : ", board_id)
  }

  const createBoard = () => {
    navigate('/board/create')
  }

  return (
    <>
      {fetching ? <FetchingModal /> : <></>}
      <Row className='mt-5 text-end'>
        <Col>
        {member.email === adminAccount ? <Button variant='outline-dark' onClick={createBoard}>게시글작성</Button> : <></>}
        </Col>
      </Row>
      <Container className='ms-3' style={{ fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244"}}>
        <Table hover className='mt-5' style={{borderBottom : "1px solid #625244"}}>
          <tbody>
            {serverData.dtoList && serverData.dtoList.length > 0 ? (
              serverData.dtoList.map((noticeList) => (
                <tr key={noticeList.id}>
                  <td className='text-center'>{noticeList.category==="notice" ? "공지" : "기타"}</td>
                  <td onClick={() => moveToRead(noticeList.id)} style={{cursor : "pointer", paddingLeft : "30px"}}>{noticeList.title}</td>
                  <td className='text-center'>{dateFormatted(noticeList.createdAt)}</td>
                  <td className='text-center'>조회수 {noticeList.count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={"4"} className='text-secondary text-center bold'><h2>아직 등록 된 공지사항이 없습니다</h2></td>
              </tr>
            )}
          </tbody>
        </Table>
        <Row>
          <div className='my-5'>
            <PageComponent  serverData={serverData} moveToList={moveToList} currentPage={currentPage} setCurrentPage={setCurrentPage} />    
          </div>
        </Row>
      </Container>
    </>
  )
}

export default AdminBoardComponent