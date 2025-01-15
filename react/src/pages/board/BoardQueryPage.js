import React from 'react'
import BoardQueryComponent from '../../components/board/BoardQueryComponent'
import { useParams, useLocation } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';

// import HelpDeskLayout from '../../layout/HelpDeskLayout'
import { Container } from 'react-bootstrap'

const BoardQueryPage = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const keyword = params.get("query")
  const category = params.get("category")

  console.log("category : ", category, " query : ", keyword)

  return (
    <>
      <Container style={{ fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244"}}>
        {/* <HelpDeskLayout></HelpDeskLayout> */}
        <div className='mb-3 mt-5 text-center fs-5' style={{ color : "#625244" }}> <Search></Search> {keyword} (으)로 검색된 { (category==="notice")?"공지사항" : "FAQ" } 게시물 입니다</div>
        <BoardQueryComponent keyword={keyword} category={category}/>
      </Container>
    </>
  )
}

export default BoardQueryPage