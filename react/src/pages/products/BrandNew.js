import React, { useEffect, useState } from 'react'
import { getListFilter, productGetList } from '../../api/productsApi'
import {  Button, Card,Row , Col, Container} from 'react-bootstrap'
import PageComponent from '../../components/common/PageComponent'
import useCustomMove from '../../hooks/useCustomMove'
import FetchingModal from '../../components/common/FetchingModal'
import { API_SERVER_HOST } from '../../api/qnaApi'

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

const BrandNew = () => {
    const {page, size, moveToList, refresh, moveToRead} = useCustomMove()
    const [serverData, setServerData] = useState(initState)
    const [fetching, setFetching] = useState(false)
    const host = API_SERVER_HOST
    const defaultImage = '/path/to/default-image.jpg'
useEffect(()=>{
    setFetching(true)
    getListFilter({page, size},"BRANDNEW").then(data => {
        console.log(data)
        setServerData(data) 
        setFetching(false)
    })
}, [page, size, refresh])
  return (
    <>
        {fetching ? <FetchingModal /> : <></>}


          <Container>
        <Row >
             {serverData.dtoList.filter(product => product.category == "BRANDNEW").map((product,index) => (
        <Col md={6}>
                 <Card  className='mb-5 '>
      <Card.Img variant="top " className='mx-auto my-3' style={{ width: '18rem' , height:'18rem'}} src={`${host}/api/product/view/${product.uploadFileNames[0]}`}
       onError={(e) => e.target.src = defaultImage}/> 
      <Card.Body className='ms-3'>
        <Card.Title>{product.productName}</Card.Title>
        <Card.Text>No : {product.productId}      </Card.Text>
        <Card.Text>브랜드 : {product.productBrand}        </Card.Text>
        <Card.Text>카테고리 : {product.category}        </Card.Text>
        <Button variant="outline-info" onClick={() => moveToRead(product.productId)}>상품상세보기</Button>
      </Card.Body>
    </Card> 
           
        </Col>
      ))}
    </Row>
    <div className='my-5'>
    <PageComponent  serverData={serverData} moveToList={moveToList}/>
    </div>
    </Container>
    </>
  )
  
}



export default BrandNew
