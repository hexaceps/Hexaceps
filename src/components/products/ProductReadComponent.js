import React , { useEffect, useState } from 'react'
import {  Button, Container ,Row,Col, Image, Nav} from 'react-bootstrap';
import useCustomMove from '../../hooks/useCustomMove';
import useCustomLogin from '../../hooks/useCustomLogin';
import { productGetOne } from '../../api/productsApi';
import { getOneMember } from '../../api/memberApi';
import { API_SERVER_HOST } from '../../api/qnaApi';
import FetchingModal from '../common/FetchingModal';
import ProductSubdesc from '../productSub/ProductSubdesc'
import ProductSubQna from '../productSub/ProductSubQna'
import ProductSubRefund from '../productSub/ProductSubRefund'
import ProductSubReview from '../productSub/ProductSubReview'


const initState = {
    pno:0,
    pname:'',
    pdesc:'',
    price:0,  
    delFlag:false,
    uploadFileNames: []
  
}

const ProductReadComponent = ({pno}) => {
const [page,setPage] = useState("A");
const[product,setProduct] = useState(initState);
const [selectedQna, setSelectedQna] = useState(null);
const{moveToList, moveToModify, moveToRead } = useCustomMove();
const [fetching, setFetching] = useState(false)
const host = API_SERVER_HOST;
const {loginState,isLogin,doLogout } = useCustomLogin()
const [member, setMember] = useState(() => {
    const storedMember = localStorage.getItem('member');
    return storedMember ? JSON.parse(storedMember) : null;
  });


    const handleTabClick = (pageName) => {
        setPage(pageName);
      };


  
        useEffect(() => {
          if (loginState.email) {
            getOneMember(loginState.email).then(data => {
              setMember(data);
              console.log("data",data)
              // Store member in localStorage
              localStorage.setItem('member', JSON.stringify(data));
            });
          }
        }, [loginState]);

useEffect(()=>{
    setFetching(true)
    productGetOne(pno).then(data => {
        console.log(data)
        setProduct(data)
        setFetching(false)
    })
},[pno])

  return (
    <>
    {fetching ? <FetchingModal /> : <> </>}
    <Container>
        <Row>
        <Col md={5}>   <Image src={`${host}/api/products/view/${product.uploadFileNames[0]}`} fluid/> </Col>
            <Col md={7} className='ms-auto p-3'>  
            <p>상품번호 : {product.pno} </p> 
            <p>상품명 : {product.product_name} </p> 
            <p>브랜드 : {product.product_brand} </p> 
            <p>상세설명 : {product.pdesc} </p>
            <p>product_stock: {product.product_stock ? "재고있음" : "재고없음"}</p>       
            <div className='mt-3 text-end'>
          <Button variant='primary'  className='me-3' onClick={moveToList}>목록보기</Button>
          <Button variant='secondary' onClick={() => moveToModify(pno)}>수정</Button>
        </div>      
            </Col>
        </Row>
        <hr />
  
        <Nav  fill  variant="tabs my-5"  activeKey={page}
                style={{
                    height: '60px',  // Nav의 높이 설정
                    display: 'flex', // Flex 컨테이너로 설정
                    alignItems: 'stretch',
                    fontSize : 'large' // 아이템들이 높이를 맞추도록 설정
                }}
        >
  <Nav.Item style={{ height: '100%' }} >
    <Nav.Link
      eventKey="A"
      onClick={() => handleTabClick('A')}
      style={{
        backgroundColor: page === 'A' ? '#898989' : '',
        color: page === 'A' ? 'white' : '#777777',
        height: '100%', 
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center', 
      }}
    >
      상세설명
    </Nav.Link>
  </Nav.Item>
  <Nav.Item style={{ height: '100%' }}>
    <Nav.Link
      eventKey="B"
      onClick={() => handleTabClick('B')}
      style={{
        backgroundColor: page === 'B' ? '#898989' : '',
        color: page === 'B' ? 'white' :  '#777777',
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
      }}
    >
      리뷰
    </Nav.Link>
  </Nav.Item>
  <Nav.Item style={{ height: '100%' }}>
    <Nav.Link
      eventKey="C"
      onClick={() => handleTabClick('C')}
      style={{
        backgroundColor: page === 'C' ? '#898989' : '',
        color: page === 'C' ? 'white' :  '#777777',
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
      }}
    >
      Q&A
    </Nav.Link>
  </Nav.Item>
  <Nav.Item style={{ height: '100%' }}>
    <Nav.Link
      eventKey="D"
      onClick={() => handleTabClick('D')}
      style={{
        backgroundColor: page === 'D' ? '#898989' : '',
        color: page === 'D' ? 'white' :  '#777777',
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
      }}
    >
      반품/환불
    </Nav.Link>
  </Nav.Item>
</Nav>

      {page === 'A' ? <ProductSubdesc pno={pno} /> : <></>}
      {page === 'B' ? <ProductSubReview pno={pno}/> : <></>}
      {page === 'C' ? <ProductSubQna pno={pno} id={member.id} setSelectedQna={setSelectedQna} moveToRead={moveToRead} selectedQna={selectedQna}/> : <></>}
      {page === 'D' ? <ProductSubRefund /> : <></>}

    </Container>
    </>
  )
}

export default ProductReadComponent


