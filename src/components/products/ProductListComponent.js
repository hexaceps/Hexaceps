import React, { useEffect, useState } from 'react'
import { productGetList } from '../../api/productsApi'
import {  Button, Card,Row , Col, Container} from 'react-bootstrap'
import PageComponent from '../common/PageComponent'
import useCustomMove from '../../hooks/useCustomMove'
import FetchingModal from '../common/FetchingModal'
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


const ProductListComponent = () => {
    const {page, size, moveToList, refresh, moveToRead} = useCustomMove()
    const [serverData, setServerData] = useState(initState)
    const [fetching, setFetching] = useState(false)
    const host = API_SERVER_HOST

useEffect(()=>{
    setFetching(true)
    productGetList({page, size}).then(data => {
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
      {serverData.dtoList.map((product) => (
        <Col md={6}>
                 <Card  className='mb-5 '>
      <Card.Img variant="top " className='mx-auto my-3' style={{ width: '18rem' , height:'18rem'}} src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}/>
      <Card.Body className='ms-3'>
        <Card.Title>{product.product_name}</Card.Title>
        <Card.Text>No : {product.pno}      </Card.Text>
        <Card.Text>브랜드 : {product.product_brand}        </Card.Text>
        <Button variant="outline-info" onClick={() => moveToRead(product.pno)}>상품상세보기</Button>
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

export default ProductListComponent


