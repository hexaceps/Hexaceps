import React, { useEffect, useState } from 'react'
import { Table, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';
import { getCategoryList } from '../../api/boardApi';
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

const FAQListComponent = () => {
  const { page, size, moveToList, refresh } = useCustomMove()
  const [currentPage, setCurrentPage] = useState(1)
  const [serverData, setServerData] = useState(initState)
  const [fetching, setFetching] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  
  useEffect(() => { // FAQ 가져오는 로직
    setFetching(true)
    console.log("FAQ 리스트 useEffect 진입")
    const fetchData = async () => {
          console.log("FAQ 리스트 API 리스트 가져오는 중")
          const data = await getCategoryList({ category: "faq", pageParam: { page: currentPage, size } })
          setServerData(data)
          setFetching(false)
          console.log(data)
        }
        fetchData()
      }, [currentPage, size, refresh])

  const navigate = useNavigate();
  const moveToRead = (board_id) => { // FAQ 타이틀 선택 하면 세부 항목으로 이동하는 로직
    navigate(`/board/${board_id}`)
    console.log("Board ID 게시글로 이동 : ", board_id)
  }

  const search = (e) => { // 검색 창 로직
    if (e.key === "Enter") {
      e.preventDefault()
      const trimKeyword = searchValue.trim()
      if (!trimKeyword) {
        alert("검색어가 입력되지 않았습니다")
        return
      }
      navigate(`/board/search?category=faq&query=${encodeURIComponent(trimKeyword)}`)
      console.log ("조회를 요청 합니다", trimKeyword)
    }
  }
  
  return (
    <>
      {fetching ? <FetchingModal /> : <></>}
      <Container className='ms-3' style={{ fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244"}}>
        <Row className="" style={{width : "50%", margin : "0 auto"}}>
          <form className='border border-dark rounded-pill mb-3 d-flex justfy-content-end align-items-center help' role='search'>
            <Search className='ms-3'/>
            <input className='form-control me-2 border-0 border-bottom' type='search' placeholder='Search' 
              value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onKeyDown={search}/> 
          </form>
        </Row>
        <Table hover className='mt-5' style={{borderBottom : "1px solid #625244"}}>
          <tbody>
            {serverData.dtoList && serverData.dtoList.length > 0 ? (
              serverData.dtoList.map((noticeList) => (
                <tr key={noticeList.id}>
                  <td className='text-center'>{noticeList.category==="faq" ? "FAQ" : "기타"}</td>
                  <td onClick={() => moveToRead(noticeList.id)} style={{cursor : "pointer", paddingLeft : "30px"}}>{noticeList.title}</td>
                  <td className='text-center'>{dateFormatted(noticeList.createdAt)}</td>
                  <td className='text-center'>조회수 {noticeList.count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={"4"} className='text-secondary text-center bold'><h2>아직 등록 된 FAQ가 없습니다</h2></td>
              </tr>
            )}
          </tbody>
        </Table>
        <Row>
          <div className='my-5'>
            <PageComponent  serverData={serverData} moveToList={moveToList}  currentPage={currentPage} setCurrentPage={setCurrentPage} />    
          </div>
        </Row>
      </Container>
    </>
  )
}

export default FAQListComponent