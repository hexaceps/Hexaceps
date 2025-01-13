import React from 'react'
import Pagination from 'react-bootstrap/Pagination';

const PageComponent = ({ serverData, moveToList,currentPage,setCurrentPage}) => {
    console.log("현재페이지 : " + serverData.current)
  return (
    <>
    {/* http://localhost:3000/todo/list?page=11&size=10 */}
        <Pagination className='justify-content-center'>
            {serverData.prev ? 
                <Pagination.Prev 
                onClick={() => { 
                    setCurrentPage(serverData.prevPage); 
                    moveToList({ page: serverData.prevPage })}} 
                /> : <></>}
            {serverData.pageNumList.map(pageNum => 
                <Pagination.Item
                active={currentPage === pageNum}  
                onClick={() => {
                    setCurrentPage(pageNum);
                    moveToList({ page: pageNum })  }}
                >
                    {pageNum}
                </Pagination.Item>
            )}
            {serverData.next ? 
                <Pagination.Next 
                onClick={() => { 
                    setCurrentPage(serverData.nextPage); 
                    moveToList({ page: serverData.nextPage }) 
                }}
                /> 
                : <></>}  
        </Pagination>
    </>
  )
}

export default PageComponent