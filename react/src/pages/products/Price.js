import React, { useEffect, useState } from 'react'
import PageComponent from '../../components/common/PageComponent'
import useCustomMove from '../../hooks/useCustomMove'
import FetchingModal from '../../components/common/FetchingModal'
// import { API_SERVER_HOST } from '../../api/qnaApi'
import { API_SERVER_HOST } from '../../serverEnv'
import { getListFilter, getListFilterBrand, productGetList } from '../../api/productsApi'
import {  Button, Card,Row , Col, Container,Form,Dropdown } from 'react-bootstrap'
import { ArrowDownUp } from 'react-bootstrap-icons'; 
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa"
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

const Price = () => {
  const {page, size, moveToList, refresh, moveToRead} = useCustomMove()
  const [serverData, setServerData] = useState(initState)
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(false)
  const [minPrice, setMinPrice] = useState(null)
  const [maxPrice, setMaxPrice] = useState(null)
  const [sortBy, setSortBy] = useState('productId');  
  const [sortOrder, setSortOrder] = useState('desc');  
  const [member, setMember] = useState(null);
  const host = API_SERVER_HOST
  const defaultImage = '/path/to/default-image.jpg'
  const [like, setLike] = useState(() => {
        const storedLike = localStorage.getItem('like');
        return storedLike ? JSON.parse(storedLike) : null;
      });
  const storedMember = localStorage.getItem("member");

  const cheangeLev1 = () => {if (maxPrice === 100000)  {setMinPrice("0"); setMaxPrice(null);} else { setMinPrice("0"); setMaxPrice(100000);}setCurrentPage(1)};
  const cheangeLev2 = () => {if (maxPrice === 1000000) {setMinPrice("0");setMaxPrice(null);} else {setMinPrice("100000");setMaxPrice(1000000);}setCurrentPage(1)};
  const cheangeLev3 = () => {if (minPrice === "1000000") {setMinPrice("0");setMaxPrice(null);} else {setMinPrice("1000000");setMaxPrice(99999999);}setCurrentPage(1)};

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1); 
  };

    useEffect(() => { // LIKE 전 로그인 유저인지 확인 하기 위해서 useEffect 사용
        const storedMember = localStorage.getItem("member");
        if (storedMember) {
          const parsedMember = JSON.parse(storedMember);
          setMember(parsedMember);
          console.log("Member 초기화 완료:", parsedMember);likeApi.getUserLikes(parsedMember.id)
          .then((response) => {
            const likedIds = response.data; // 서버에서 반환된 관심 상품 ID 배열
            console.log("관심정보받아옴?",likedIds)
            console.log("스토리지 like",like[0].productId)
            if (like) {
              localStorage.setItem("like", JSON.stringify(likedIds));
            }
            const likedState = likedIds.reduce((acc, id) => {
              acc[id] = true;
              return acc;
            }, {});
            setLikedProducts(likedState);
            const storedLike = localStorage.getItem('like');
            return storedLike ? JSON.parse(storedLike) : null;
          })
          .catch((error) => {
            console.error("관심 상품 데이터 가져오기 실패:", error);
          });
      }
       
      }, [like]);
  
  const [likedProducts, setLikedProducts] = useState({}); // 제품마다 LIKE 상태 확인
  
  const handleLikeClick = ( productId, categoryId ) => {
    console.log("멤버변수가 없음")
    if (member === null) {
      alert('로그인을 해야 누를수 있어요 :)');
      return;
    }
    const isLiked = like && like.some(likeItem => likeItem.productId === productId);
    if (isLiked) {
      likeApi.removeLike(member.id, productId)
        .then(() => {
          const updatedLike = like.filter(likeItem => likeItem.productId !== productId);
          setLike(updatedLike);  
        })
        .catch((error) => {
          console.error("관심 상품 삭제 실패:", error);
        });
    } else {
      likeApi.addLike(member.id, productId)
        .then(() => {
          const updatedLike = [...like, { productId }];
          setLike(updatedLike);  
        })
        .catch((error) => {
          console.error("관심 상품 추가 실패:", error);
        });
    }
  };

  
  useEffect(()=>{
      setFetching(true)
      getListFilter({page :currentPage, size},null,null,null, minPrice, maxPrice,sortBy, sortOrder ).then(data => {
          console.log(data)
          setServerData(data) 
          setFetching(false)
      })
  }, [currentPage, size, refresh,minPrice,maxPrice, sortBy, sortOrder])

  return (
    <>
      {fetching ? <FetchingModal /> : <></>}
      <Container>
        <div>
          <p>전체 제품 수: {serverData.totalCount}</p>
        </div>
        <div > 
          <Form.Group className="mt-5 text-center" controlId="formBasicCheckbox" >
            <Form.Check className='mb-2 me-5  d-inline-block' type="checkbox" label="10만원이하" onClick={cheangeLev1}    checked={minPrice === "0" && maxPrice === 100000}  />
            <Form.Check className='mb-2 me-5 d-inline-block' type="checkbox" label="10만~100만" onClick={cheangeLev2}     checked={minPrice === "100000" && maxPrice === 1000000}/>
            <Form.Check className='mb-2 me-5 d-inline-block' type="checkbox" label="100만원이상" onClick={cheangeLev3}     checked={minPrice === "1000000" && maxPrice === 99999999} />
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
        {serverData.dtoList.filter(product => (minPrice === null || parseInt(product.price) >= parseInt(minPrice)) &&
            (maxPrice === null || parseInt(product.price) <= maxPrice) ).map((product,index) => (
          <Col className='ms-2' sm={12} md={3} key={index} >
            <Card className='mb-5 '>
              <div className='image-wrapper mx-auto my-3' onClick={() => moveToRead(product.productId)}>
                <Card.Img variant="top " style={{ width: '100%' , height:'100%'}} 
                          src={`${host}/api/product/view/${product.uploadFileNames[0]}`}  onError={(e) => e.target.src = defaultImage} />
                <div className="caption">상품바로가기</div>
              </div>
              <Card.Body className='ms-3'>
                <Row>
                  <Col>
                    <Card.Text className='fs-5 fw-bold'>{product.productBrand}</Card.Text>
                  </Col>
                  <Col className='me-2'>
                    <span className='like-icon-wrapper like-thumb' onClick={(e) => { e.stopPropagation() 
                      handleLikeClick( product.productId ); }}>
                    {like && like.some(likeItem => likeItem.productId === product.productId) ? 
                      (<FaThumbsUp size={24} color="#625244" />) : (<FaRegThumbsUp size={26} color="#625244" />)}
                    </span>
                  </Col>
                </Row>
                <Card.Title className='mt-2' style={{fontSize : "0.9rem"}}>{product.productName}</Card.Title>
                {/* <Card.Text>No : {product.productId}</Card.Text> */}
                {/* <Card.Text>카테고리 : {product.category}</Card.Text> */}
                {/* <Card.Text>사이즈 : {product.productSize}</Card.Text> */}
                <Card.Text>
                  <Row className='mt-3'>
                    <Col>
                      { product.productName.length % 2 === 1 ? 
                      <img style={{ width : "4rem"}} src='/images/quick.png' alt='빠른배송' /> : <></> }
                    </Col>
                    <Col className='me-3 text-end' style={{fontSize : "0.8rem"}}>{product.price.toLocaleString()} 원<br/><span className='text-secondary' style={{fontSize : "0.7rem"}}>즉시구매가</span></Col>
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
export default Price
