import React, { useEffect, useState } from 'react'
import PageComponent from '../../components/common/PageComponent'
import useCustomMove from '../../hooks/useCustomMove'
import FetchingModal from '../../components/common/FetchingModal'
import { API_SERVER_HOST } from '../../api/qnaApi'
import { getListFilter, getListFilterBrand, productGetList } from '../../api/productsApi'
import {  Button, Card,Row , Col, Container,Form} from 'react-bootstrap'

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

const Price = () => {
    const {page, size, moveToList, refresh, moveToRead} = useCustomMove()
    const [serverData, setServerData] = useState(initState)
    const [currentPage, setCurrentPage] = useState(1)
    const [fetching, setFetching] = useState(false)
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const host = API_SERVER_HOST
    const defaultImage = '/path/to/default-image.jpg'

    

        //가격 범위
        const cheangeLev1 = () => {if (maxPrice === 100000)  {setMinPrice("0"); setMaxPrice(null);} else { setMinPrice("0"); setMaxPrice(100000);}setCurrentPage(1)};
        const cheangeLev2 = () => {if (maxPrice === 1000000) {setMinPrice("0");setMaxPrice(null);} else {setMinPrice("100000");setMaxPrice(1000000);}setCurrentPage(1)};
        const cheangeLev3 = () => {if (minPrice === "1000000") {setMinPrice("0");setMaxPrice(null);} else {setMinPrice("1000000");setMaxPrice(99999999);}setCurrentPage(1)};

useEffect(()=>{
    setFetching(true)
    getListFilter({page :currentPage, size},null,null,null, minPrice, maxPrice).then(data => {
        console.log(data)
        setServerData(data) 
        setFetching(false)
    })
}, [currentPage, size, refresh,minPrice,maxPrice])
  return (
    <>
        {fetching ? <FetchingModal /> : <></>}

          <Container>

        <div > 
        <Form.Group className="mt-5 text-center" controlId="formBasicCheckbox" >
              <Form.Check className='mb-2 me-5  d-inline-block' type="checkbox" label="10만원이하" onClick={cheangeLev1}    checked={minPrice === "0" && maxPrice === 100000}  />
              <Form.Check className='mb-2 me-5 d-inline-block' type="checkbox" label="10만~100만" onClick={cheangeLev2}     checked={minPrice === "100000" && maxPrice === 1000000}/>
              <Form.Check className='mb-2 me-5 d-inline-block' type="checkbox" label="100만원이상" onClick={cheangeLev3}     checked={minPrice === "1000000" && maxPrice === 99999999} />
          </Form.Group>
        </div>


        <Row >
             {serverData.dtoList.filter(product => (minPrice === null || parseInt(product.price) >= parseInt(minPrice)) &&
                (maxPrice === null || parseInt(product.price) <= maxPrice) ).map((product,index) => (
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
    <PageComponent  serverData={serverData} moveToList={moveToList}  currentPage={currentPage} setCurrentPage={setCurrentPage} />    </div>
    </Container>
    </>
  )
  
}
export default Price
