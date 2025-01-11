import React, { useEffect, useState } from 'react'
import { getListFilter, getListFilterBrand, productGetList } from '../../api/productsApi'
import { Button, Card, Row , Col, Container, Form, Dropdown } from 'react-bootstrap'
import { ArrowDownUp } from 'react-bootstrap-icons';
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa"
import PageComponent from '../../components/common/PageComponent'
import useCustomMove from '../../hooks/useCustomMove'
import FetchingModal from '../../components/common/FetchingModal'
import { API_SERVER_HOST } from '../../api/qnaApi'
import likeApi from '../../api/likeApi'

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
const BRAND_LIST = ["BALENCIAGA", "GUCCI", "HERMES", "DIOR", "NIKE", "ADIDAS", "SUPREME", "ASICS", "JORDAN", "NEWBALANCE", "UGG"];

const Brand = () => {

  const {page, size, moveToList, refresh, moveToRead} = useCustomMove()
  const [serverData, setServerData] = useState(initState)
  const [currentPage, setCurrentPage] = useState(1)  
  const [fetching, setFetching] = useState(false)
  const [productBrand, setProductBrand] = useState(null)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [sortBy, setSortBy] = useState('productId');  
  const [sortOrder, setSortOrder] = useState('desc');  
  const host = API_SERVER_HOST
  const defaultImage = "/images/default.png"
  const [member, setMember] = useState(null);
  const [selectedSortLabel, setSelectedSortLabel] = useState('정렬');

  // 브랜드명 현재 나이키 아디다스 구찌 (추가 브랜드를 목록 처리 해서 아래 부분, 화면 부분 주석 처리 25. 01. 11 업데이트, 정병오)
  // const cheangeNike = () => {if (productBrand === "NIKE") {setProductBrand(null);} else {setProductBrand("NIKE")}setCurrentPage(1)}
  // const cheangeAdidas = () => {if (productBrand === "ADIDAS") {setProductBrand(null); } else {setProductBrand("ADIDAS")}setCurrentPage(1)}
  // const cheangeGuggi = () => {if (productBrand === "GUCCI") {setProductBrand(null);} else {setProductBrand("GUCCI")}setCurrentPage(1)}

  const toggleBrandSelection = (brand) => {
    setSelectedBrands((prev) =>
        prev.includes(brand) ? prev.filter((brandFilter) => brandFilter !== brand) : [...prev, brand]
    )
    setCurrentPage(1)
  }
  
  const handleSortChange = (newSortBy, newSortOrder, sortLabel) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setSelectedSortLabel(sortLabel);
    setCurrentPage(1); 
  };

  /*
    좋아요 기능 로직 추가
  */
  useEffect(() => { // LIKE 전 로그인 유저인지 확인 하기 위해서 useEffect 사용
    const storedMember = localStorage.getItem("member");
    if (storedMember) {
      const parsedMember = JSON.parse(storedMember);
      setMember(parsedMember);
      console.log("Member 초기화 완료:", parsedMember);
    } else {
      console.warn("로컬 스토리지에 member 정보가 없습니다.");
    }
  }, []);

  const [likedProducts, setLikedProducts] = useState({}); // 제품마다 LIKE 상태 확인
  const handleLikeClick = ( productId, categoryId ) => {
    console.log("멤버변수가 없음")
    if (member === null) {
      alert('로그인을 해야 누를수 있어요 :)');
      return;
    }
    if (likedProducts[productId]) { // 좋아요 상태라면, 좋아요 해제 + removeAPI 호출
      setLikedProducts((prev) => ({
        ...prev,
        [productId]: false,
      }));
      likeApi.removeLike(member.id, productId).then((response) => {
          console.log('좋아요 삭제 성공:', response);
        }).catch((error) => {
          console.error('좋아요 삭제 실패:', error);
        });
    } else {
      setLikedProducts((prev) => ({ // 좋아요 클릭 + addAPI 호출
        ...prev,
        [productId]: true,
      }));
      likeApi.addLike(member.id, productId).then((response) => {
          console.log('좋아요 등록 성공:', response);
        }).catch((error) => {
          console.error('좋아요 등록 실패:', error);
        });
    }
  }

  useEffect(() => {
      setFetching(true)
      const brandQuery = selectedBrands
        .map((brand) => `${encodeURIComponent(brand)}`).join("");
      getListFilter({ page : currentPage, size }, null, brandQuery, null, null, null, sortBy, sortOrder).then(data => {
        console.log("getListFilter 로 전달한 {productBrand} 값은 : ", brandQuery)  
        console.log("getListFilter 로 Brand 호출 한 결과 data : ", data)
        setServerData(data) 
        setFetching(false)
      })
  }, [currentPage, size, refresh, selectedBrands, sortBy, sortOrder])
  return (
    <>
      {fetching ? <FetchingModal /> : <></>}
      <Container>
        <div>
          <p>전체 제품 수: {serverData.totalCount}</p>
        </div>
        <div > 
          <Form.Group className="mt-5 text-center" controlId="formBasicCheckbox" >
            {BRAND_LIST.map((brand) => (
            <Form.Check key={brand} className="mb-2 me-5 d-inline-block" type="checkbox" 
                        label={brand} onChange={() => toggleBrandSelection(brand)} checked={selectedBrands.includes(brand)}/>
            ))}
            {/* <Form.Check className='mb-2 me-5 d-inline-block' type="checkbox" label="NIKE" onClick={cheangeNike}  checked={productBrand === "NIKE"} />
            <Form.Check className='mb-2 me-5 d-inline-block' type="checkbox" label="ADIDAS" onClick={cheangeAdidas}  checked={productBrand === "ADIDAS"} />
            <Form.Check className='mb-2 me-5 d-inline-block' type="checkbox" label="GUCCI" onClick={cheangeGuggi} checked={productBrand === "GUCCI"} /> */}
          </Form.Group>
        </div>
        <div className="text-end mb-3">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              <ArrowDownUp className="me-2" />{selectedSortLabel}
            </Dropdown.Toggle>
            <Dropdown.Menu >
              <Dropdown.Item onClick={() => handleSortChange('price', 'desc', '가격 높은 순')}>가격 높은 순</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange('price', 'asc', '가격 낮은 순')}>가격 낮은 순</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange('productId', 'desc', '신상품 순')}>신상품 순</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Row>
        {serverData.dtoList.filter(product => product.category != null).map((product,index) => (
          <Col className='ms-5' md={3} key={index} >
            <Card className='mb-5 '>
              <div className='image-wrapper mx-auto my-3' onClick={() => moveToRead(product.productId)}>
                <Card.Img variant="top " style={{ width: '100%' , height:'100%'}} 
                          src={product.uploadFileNames[0]} onError={(e) => e.target.src = defaultImage} />
                <div className="caption">상품바로가기</div>
              </div>
              <Card.Body className='ms-3'>
                <Row>
                  <Col>
                    <Card.Text className='fs-5 fw-bold'>{product.productBrand}</Card.Text>
                  </Col>
                  <Col>
                    <span className='like-icon-wrapper like-thumb' onClick={(e) => { e.stopPropagation() 
                      handleLikeClick( product.productId ); }}>
                      {likedProducts[product.productId] ? 
                      (<FaThumbsUp size={24} color="#625244" />) : (<FaRegThumbsUp size={26} color="#625244" />)}
                    </span>
                  </Col>
                </Row>
                <Card.Title className='mt-2 fs-6'>{product.productName}</Card.Title>
                {/* <Card.Text>No : {product.productId}</Card.Text> */}
                {/* <Card.Text>카테고리 : {product.category}</Card.Text> */}
                {/* <Card.Text>사이즈 : {product.productSize}</Card.Text> */}
                <Card.Text>
                  <Row className='mt-3'>
                    <Col>
                      { product.productName.length % 2 === 1 ? 
                      <img style={{ width : "4rem"}} src='/images/quick.png' alt='빠른배송' /> : <></> }
                    </Col>
                    <Col className='me-3 text-end'>{product.price.toLocaleString()} 원<br/><span className='text-secondary' style={{fontSize : "0.8rem"}}>즉시구매가</span></Col>
                  </Row>  
                </Card.Text>
                {/* <Button variant="outline-info" onClick={() => moveToRead(product.productId)}>상품상세보기</Button> */}
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

export default Brand
