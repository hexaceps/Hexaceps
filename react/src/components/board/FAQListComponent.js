import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';
import { getCategoryList } from '../../api/boardApi';

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
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
};

const FAQListComponent = () => {
  const [serverData, setServerData] = useState(initState)
    useEffect(() => {
      getCategoryList("faq").then(data => {
        console.log("FAQ Data recieved from back-end server : ", data)
        setServerData(data)
      })
    }, [])

  const navigate = useNavigate();
  const moveToRead = (board_id) => {
    navigate(`/board/${board_id}`)
  }
  const search = (e) => {
    if(e.key === "Enter") {
      e.preventDefault();
      console.log("Enter 확인", e.key, e.target.value);
      let keyword = e.target.value;
      navigate(`/?q=${keyword}`);
    }
  }
  
  return (
    <>
      <div className='ms-3'>
        <div className="" style={{width : "50%", margin : "0 auto"}}>
          <form className='border border-dark rounded-pill mb-3 d-flex justfy-content-end align-items-center help' role='search'>
            <Search className='ms-3'/>
            <input className='form-control me-2 border-0 border-bottom' type='search' placeholder='Search' 
            onKeyDown={(e) => search(e)}/>
          </form>
        </div>
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
            {serverData.dtoList && serverData.dtoList.length > 0 ? (
              serverData.dtoList.map((faqList) => (
                <tr key={faqList.id}>
                  <td className='text-center'>{faqList.category==="faq" ? "FAQ" : "기타"}</td>
                  <td onClick={() => moveToRead(faqList.id)} style={{cursor : "pointer", paddingLeft : "30px"}}>{faqList.title}</td>
                  <td className='text-center'>{dateFormatted(faqList.createdAt)}</td>
                  <td className='text-center'>조회수 {faqList.count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={"4"} className='text-warning text-center bold'><h2>아직 등록 된 FAQ가 없습니다</h2></td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default FAQListComponent