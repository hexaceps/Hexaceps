import React, { useEffect, useState } from 'react'
import PageComponent from '../../components/common/PageComponent'
import useCustomMove from '../../hooks/useCustomMove'
import FetchingModal from '../../components/common/FetchingModal'
import { API_SERVER_HOST } from '../../api/qnaApi'
import { getListFilter, getListFilterBrand, productGetList } from '../../api/productsApi'
import {  Button, Card,Row , Col, Container,Form,Dropdown } from 'react-bootstrap'
import { ArrowDownUp } from 'react-bootstrap-icons'; 

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

const Size = () => {
  const {page, size, moveToList, refresh, moveToRead} = useCustomMove()
  const [serverData, setServerData] = useState(initState)
  //필터클릭시 페이지네이션 1록가게
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(false)
  const [productSize, setProductSize] = useState(null)
  const [sortBy, setSortBy] = useState('productId');  
  const [sortOrder, setSortOrder] = useState('desc');  
  const host = API_SERVER_HOST
  const defaultImage = '/path/to/default-image.jpg'

      //브랜드명 현재 나이키 아디다스 구찌
  const cheangeWomen = () => {  if (productSize === 240) {setProductSize(null);} else {setProductSize(240) } setCurrentPage(1)}
  const cheangeMan = () => {if (productSize === 245) {setProductSize(null); } else {setProductSize(245)}  setCurrentPage(1)}

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1); 
  };

  useEffect(()=>{
      setFetching(true)
      getListFilter({page :currentPage, size},null,null,productSize,null,null,sortBy, sortOrder).then(data => {
          console.log(data)
          setServerData(data) 
          setFetching(false)
      })
  }, [currentPage, size, refresh,productSize, sortBy, sortOrder])

  return (
    <>
      {fetching ? <FetchingModal /> : <></>}
      <Container>
        <div>
          <p>전체 제품 수: {serverData.totalCount}</p>
        </div>
        <div > 
          <Form.Group className="mt-5 text-center" controlId="formBasicCheckbox" >
            <Form.Check className='mb-2 me-5  d-inline-block' type="checkbox" label="여성용(240이하)" onClick={cheangeWomen}  checked={productSize === 240} />
            <Form.Check className='mb-2 me-5 d-inline-block' type="checkbox" label="남성용(245이상)" onClick={cheangeMan}  checked={productSize === 245} />
          </Form.Group>
        </div>
        <div className="text-end mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              <ArrowDownUp className="me-2" />정렬
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSortChange('price', 'desc')}>가격 높은 순</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange('price', 'asc')}>가격 낮은 순</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange('productId', 'desc')}>신상품 순</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Row >
        {serverData.dtoList.filter(product => !productSize || parseInt(product.productSize) <= productSize || parseInt(product.productSize) >= productSize).map((product,index) => (
          <Col md={6}>
            <Card  className='mb-5 '>
            <Card.Img variant="top " className='mx-auto my-3' 
                      style={{ width: '18rem' , height:'18rem'}} src={product.uploadFileNames[0]}
                      onError={(e) => e.target.src = defaultImage}/> 
              <Card.Body className='ms-3'>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text>No : {product.productId}</Card.Text>
                <Card.Text>브랜드 : {product.productBrand}</Card.Text>
                <Card.Text>카테고리 : {product.category}</Card.Text>
                <Card.Text>가격 : {product.price}</Card.Text>
                <Card.Text>사이즈 : {product.productSize}</Card.Text>
                <Button variant="outline-info" onClick={() => moveToRead(product.productId)}>상품상세보기</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
        </Row>
        <div className='my-5'>
          <PageComponent  serverData={serverData} moveToList={moveToList}  currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </Container>
    </>
  )
}

export default Size
