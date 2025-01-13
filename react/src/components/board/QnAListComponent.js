import React from 'react'
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';

const QnAListComponent = () => {
  const navigate = useNavigate();
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성일</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>NIKE x SCOTT Midinight Edition 제품 입고 안되나요?</td>
              <td>2025-01-01</td>
              <td>프로되팔렘</td>
            </tr>
            <tr>
              <td>2</td>
              <td>스니커즈매니아 대신 여기서 구매하면 어떤 혜택이 있나요?</td>
              <td>2024-12-29</td>
              <td>stockX</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default QnAListComponent