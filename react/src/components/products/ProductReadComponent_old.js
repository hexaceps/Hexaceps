import React , { useEffect, useState } from 'react'
import {  Button, Container ,Row,Col, Image, Nav} from 'react-bootstrap';
import useCustomMove from '../../hooks/useCustomMove';
import useCustomLogin from '../../hooks/useCustomLogin';
import { productGetOne } from '../../api/productsApi';
import { getOneMember } from '../../api/memberApi';
// import { API_SERVER_HOST } from '../../api/qnaApi';
import { API_SERVER_HOST } from '../../serverEnv'
import FetchingModal from '../common/FetchingModal';
import ProductSubdesc from '../productSub/ProductSubdesc'
import ProductSubQna from '../productSub/ProductSubQna'
import ProductSubRefund from '../productSub/ProductSubRefund'
import ProductSubReview from '../productSub/ProductSubReview'


const initState = {
  productId:0,
  productName:'',
  productBrand:'',
  productDescription:'',
  price:0,
  uploadFileNames: []
}

const ProductReadComponent = ({productId}) => {
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


        const getSiteName = (siteUrl) => {
          if (siteUrl.includes('kream')) {
            return '크림';
          } else if (siteUrl.includes('stockx')) {
            return '스톡';
          } else {
            return 'Hexa'; 
          }
        };
      

  
        useEffect(() => {
          if (loginState.email) {
            getOneMember(loginState.email).then(data => {
              setMember(data);
              console.log("data", data);
              localStorage.setItem('member', JSON.stringify(data));
            });
          }
        
          if (productId) {
            setFetching(true);
            productGetOne(productId).then(data => {
              console.log("product", data);
              setProduct(data);
              setFetching(false);
            });
          }
        }, [loginState, productId]);  
        

  return (
    <>
    {fetching ? <FetchingModal /> : <> </>}
    <Container>
        <Row>
        <Col md={5}>   <Image src={`${host}/api/product/view/${product.uploadFileNames[0]}`} fluid/> </Col>
            <Col md={7} className='ms-auto p-3'>  
            <p>상품번호 : {product.productId} </p> 
            <p>상품명 : {product.productName} </p> 
            <p>브랜드 : {product.productBrand} </p> 
            <p>상세설명 : {product.productDescription} </p>
            <p>가격 : {product.price} </p>
            <p>제품 재고: {product.productStock ? "재고있음" : "재고없음"}</p> 
            <p>제품 사이트</p>
              <div>
                {product.productSiteNames && product.productSiteNames.length > 0 ? (
                  product.productSiteNames.map((siteUrl, index) => (
                    <span key={index} style={{ marginRight: '10px' }}>
                      <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                        {getSiteName(siteUrl)}
                      </a>
                    </span>
                  ))
                ) : (
                  <p>등록된 사이트가 없습니다.</p>
                )}
              </div>
            <div className='mt-3 text-end'>
          <Button variant='primary'  className='me-3' onClick={moveToList}>목록보기</Button>
          <Button variant='secondary' onClick={() => moveToModify(productId)}>수정</Button>
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

      {page === 'A' ? <ProductSubdesc productId={productId} /> : <></>}
      {page === 'B' ? <ProductSubReview productId={productId}/> : <></>}
      {page === 'C' ? <ProductSubQna productId={productId} id={member.id} setSelectedQna={setSelectedQna} moveToRead={moveToRead} selectedQna={selectedQna}/> : <></>}
      {page === 'D' ? <ProductSubRefund /> : <></>}

    </Container>
    </>
  )
}

export default ProductReadComponent


