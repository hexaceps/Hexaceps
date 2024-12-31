import React from 'react'
import Pagination from 'react-bootstrap/Pagination';

const PageComponent = ({ serverData, moveToList}) => {
    console.log("현재페이지" + serverData.current)
  return (
    <>
    {/* http://localhost:3000/todo/list?page=11&size=10 */}
        <Pagination className='justify-content-center'>
            {serverData.prev ? 
                <Pagination.Prev 
                    onClick={()=>moveToList({page : serverData.prevPage})}
                /> : <></>}
            {serverData.pageNumList.map(pageNum => 
                <Pagination.Item
                    active = {serverData.current === pageNum}
                    onClick = { () => moveToList({page : pageNum})}
                >
                    {pageNum}
                </Pagination.Item>
            )}
            {serverData.next ? 
                <Pagination.Next 
                    onClick={() => moveToList({page : serverData.nextPage})}
                /> 
                : <></>}  
        </Pagination>
    </>
  )
}

export default PageComponent