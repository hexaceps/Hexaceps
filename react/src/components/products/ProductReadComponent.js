import React , { useEffect, useState } from 'react'
import {  Button, Container ,Row,Col, Image, Nav, DropdownButton, Dropdown, Modal, Table} from 'react-bootstrap';
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
import ProductSizeTable from './ProductSizeTableComponent';
import styled from 'styled-components';
import {SuitHeart, LightningCharge, Star} from 'react-bootstrap-icons';
import { Navigate, useNavigate } from 'react-router-dom';
import useCustomCart from '../../hooks/useCustomCart';

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
const [selectedReview, setSelectedReview] = useState(null);
const [selectedSize, setSelectedSize] = useState("모든 사이즈");
const {moveToList, moveToModify, moveToRead } = useCustomMove();
const [fetching, setFetching] = useState(false)
const host = API_SERVER_HOST;
const {loginState,isLogin,doLogout } = useCustomLogin()
const [showPurchase, setShowPurchase] = useState(false);
const [showCart, setShowCart] = useState(false);
const [showCartResult, setShowCartResult] = useState(false);
const handleClosePurchase = () => setShowPurchase(false);
const handleCloseCartResult = () => setShowCartResult(false);
const handleShowPurchase = () => setShowPurchase(true);
const handleCloseCart = () => setShowCart(false);
const handleShowCart = () => setShowCart(true);
const [random, setRandom] = useState({
  random1: Math.floor(Math.random() * 500) + 1,
  random2: Math.floor(Math.random() * 500) + 1,
  random3: Math.floor(Math.random() * 500) + 1,
  random4: Math.floor(Math.random() * 500) + 1
});
const [currentMainImage, setCurrentMainImage] = useState(0); // 현재 보여줄 메인 이미지 인덱스
const [member, setMember] = useState(() => {
    const storedMember = localStorage.getItem('member');
    return storedMember ? JSON.parse(storedMember) : null;
  });

  
  const handleSelect = (size) => {
    setSelectedSize(size); 
  };

    const handleTabClick = (pageName) => {
        setPage(pageName);
      };

      const {changeCart} = useCustomCart()

      const navigate = useNavigate();
      
        const handleToNikeBrand = () => {
          navigate("/products/brand?brand=NIKE")
        }

        const handleToAdidasBrand = () =>{
          navigate("/products/brand?brand=ADIDAS")
        }
        
        const handleToPurchase = async () => {
          if (member === null) {
            alert('로그인을 해야 진행 할 수 있어요');
            return; 
          }
          let amount = 1;
          const cartDTO = { 
            productId: product.productId, 
            amount: amount, 
            memberId: member.id,
            cartId: 0 // 새로운 cartId는 서버에서 생성되므로 0을 전달
          };
        
          console.log("Cart DTO:", cartDTO);  // DTO 값 확인
        
          try {
            // 장바구니에 상품 추가
            console.log("장바구니 추가를 위해서 cartApi를 호출 하려고 합니다")
            const result = await changeCart(cartDTO);
            
            if (result &&  result[0].cartId) {
              console.log("생성한 cartId를 가지고 OrderPage.js로 넘겨 줍니다 : ", result[0].cartId);
              navigate(`/order/${result[0].cartId}`);
            } else {
              console.error("장바구니 생성이 실패 했습니다. cartApi 결과 : ", result);
            }
          } catch (error) {
            console.error("Error in handleToPurchase:", error);
          }
        };

        const handleToCart = async () => {
          if (member === null) {
            alert('로그인을 해야 진행 할 수 있어요');
            return; 
          }
          let amount = 1;
          const cartDTO = { 
            productId: product.productId, 
            amount: amount, 
            memberId: member.id, 
          };
          // const cartDTO = await changeCart({ 
          //   productId: product.productId, 
          //   amount: amount, 
          //   memberId: member.id, 
          // });
          console.log("Cart DTO:", cartDTO);
          try {
            console.log("상품 장바구니 추가")
            const result = await changeCart(cartDTO);
            if (result && result[0].cartId) {
              console.log("장바구니 추가가 되었습니다 cartId", result[0].cartId);
              setShowCart(false);
              setShowCartResult(true);
            } else {
              console.error("장바구니 추가에 실패 했습니다", result);
            }
          } catch (error) {
            console.error("Error in handleToPurchase", error);
          }
        };

        const handleMainImageClick = (index) => {
          setCurrentMainImage(index); // 클릭한 이미지로 업데이트
        };

        useEffect(() => {
          if (loginState.email) {
            getOneMember(loginState.email).then(data => {
              setMember(data);
              console.log("data", data);
              console.log("memberId: ", member.id);
              console.log("productId: ", product.productId);
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

     
        useEffect(() => {
          const newRandomValue = {
            random1: Math.floor(Math.random() * 500) + 1,
            random2: Math.floor(Math.random() * 500) + 1,
            random3: Math.floor(Math.random() * 500) + 1,
            random4: Math.floor(Math.random() * 500) + 1
          };
          setRandom(newRandomValue); // 랜덤값을 업데이트
        }, [product]);

        const showSizeArray = ["250", "255", "260", "265", "270", "275", "280", "285", "290"];

  return (
    <>
    {fetching ? <FetchingModal /> : <> </>}
    <Container>
      <Row style={{ minHeight: '865px' }}>
        <Col md={5}>
          <ImgBox> 
            <Image /*src={product.uploadFileNames[0]}*/    src={`${host}/api/product/view/${product.uploadFileNames[currentMainImage]}`}   fluid/> 
          </ImgBox>

          <InfoBox>
            {/* <ProductId>상품번호 : {product.productId} </ProductId>  */}
            <ProductTitle>{product.productName}</ProductTitle>
            {/* <ProductBrand>브랜드 : {product.productBrand} </ProductBrand>  */}
            <ProductDesc>{product.productDescription}</ProductDesc>
            <ProductPrice >가격: {product.price}원</ProductPrice>

            
            {/* <ProductStock>제품 재고: {product.productStock ? "재고있음" : "재고없음"}</ProductStock> */}

            <ButtonContainer>
              <Modal
                show={showPurchase}
                onHide={handleClosePurchase}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>상품 구매 여부</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  해당 상품을 구매하시겠습니까?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="success" style={{borderRadius: "15px"}} onClick={() => handleToPurchase()}>구매</Button>
                  <Button variant="secondary" style={{borderRadius: "15px"}} onClick={handleClosePurchase}>취소</Button>
                </Modal.Footer>
              </Modal>
              <BrownButton onClick={handleShowPurchase}>구매하기 <LightningCharge/></BrownButton>
              {/* 상품 구매 버튼 클릭시 모달 구현 */}
           
                <Modal
                    show={showCart}
                    onHide={setShowCartResult}
                    backdrop="static"
                    keyboard={false}
                  >
                  <Modal.Header closeButton>
                    <Modal.Title>상품 장바구니 추가 여부</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    해당 상품을 장바구니에다가 추가하시겠습니까?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="success" style={{borderRadius: "15px"}} onClick={() => handleToCart()}>추가</Button>
                    <Button variant="secondary" style={{borderRadius: "15px"}} onClick={handleCloseCart}>
                      취소
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal
                  show={showCartResult}
                  onHide={handleCloseCartResult}
                  >
                  <Modal.Header closeButton>
                    <Modal.Title>상품 추가 완료</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    해당 상품이 장바구니에 추가되었습니다.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="success" style={{borderRadius: "15px"}} onClick={handleCloseCartResult}>확인</Button>
                  </Modal.Footer>
                </Modal>
                
              <BrownButton onClick={handleShowCart}>장바구니 추가 <SuitHeart/>  </BrownButton>
            </ButtonContainer>
            <Line/>
            <SubImgContainer>
            <SubImgBox>
                <Image src={`${host}/api/product/view/${product.uploadFileNames[0]}` } onClick={() => handleMainImageClick(0)}  fluid/>
              </SubImgBox>
              <SubImgBox>
                <Image src={`${host}/api/product/view/${product.uploadFileNames[1]}`} onClick={() => handleMainImageClick(1)}  fluid/>
              </SubImgBox>
              <SubImgBox>
                <Image src={`${host}/api/product/view/${product.uploadFileNames[2]}`} onClick={() => handleMainImageClick(2)}  fluid/>
              </SubImgBox>
              <SubImgBox>
                <Image src={`${host}/api/product/view/${product.uploadFileNames[3]}`} onClick={() => handleMainImageClick(3)}  fluid/>
              </SubImgBox>
            </SubImgContainer>
          <SubImgContainer>
            <Table className='mt-3'>
              <tbody className='text-center'>
                <tr>
                  {product.productSiteDetails && product.productSiteDetails.length > 0 ? (
                    product.productSiteDetails.map((siteDetail, index) => {
                      let siteImage = null;
                      if (siteDetail?.siteLink?.includes("kream")) {
                        siteImage = <Image src={`${host}/api/product/view/kreamicon.PNG`}  alt="Kream" style={{ width: '60%' ,cursor: 'pointer' }}  />;;
                      } else if (siteDetail?.siteLink?.includes("stockx")) {
                        siteImage = <Image src={`${host}/api/product/view/stockxicon.PNG`}  alt="stockx" style={{ width: '60%' ,cursor: 'pointer' }}  />;;
                      } else if (siteDetail?.siteLink?.includes("soldout")) {
                        siteImage = <Image src={`${host}/api/product/view/soldouticon.PNG`}  alt="soldout" style={{ width: '65%' ,cursor: 'pointer' }}  />;;
                      }
                      return (
                        <td key={index}  style={{ width: '33%', padding: '0' }} className='pb-1'>
                          {siteDetail?.siteLink ? (
                            <a
                              href={siteDetail.siteLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {siteImage}
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      );
                    })
                  ) : (
                    <td colSpan="1">N/A</td>
                  )}
                </tr>
                <tr>
                  {product.productSiteDetails && product.productSiteDetails.length > 0 ? (
                    product.productSiteDetails.map((siteDetail, index) => (
                      <td key={index}>
                        {siteDetail?.sitePrice
                          ? siteDetail.sitePrice.toLocaleString() +"원"
                          : "N/A"}
                      </td>
                    ))
                  ) : (
                    <td colSpan="1">N/A</td>
                  )}
                </tr>
              </tbody>
            </Table>
          </SubImgContainer>
          </InfoBox>
        </Col>

        {/* <MiddleLine/> */}

        <Col md={7} className='ms-auto'> 
          <ProductSizeTable />

          <DropDownContainer>
            <DropdownButton id="dropdown-basic-button" title={selectedSize} drop='down-centered' variant='dark'>
              {showSizeArray.map((size, index) => (
                <Dropdown.Item key={index} href={`#/action-${index}`} onClick={() => handleSelect(size)}><Star/> {size}</Dropdown.Item>
              ))}
            </DropdownButton>
          </DropDownContainer>

          <hr/>
          <div  style={{width:'100%', height: '11%', display: 'flex', marginTop: '10px', marginBottom: '20px'}} >
                       <Image src='/images/banner1.png' fluid onClick={() => handleToNikeBrand()} style={{ cursor: 'pointer' }}/>
          </div>

          <Title>Recommended Shoes</Title>
          <RecommendedBox>
            <Image src={`${host}/api/product/view/product_${random.random1}_1.jpg`} onClick={() => navigate(`/products/read/${random.random1}`)}  style={{ cursor: 'pointer' }} fluid/>
            <Image src={`${host}/api/product/view/product_${random.random2}_1.jpg`} onClick={() => navigate(`/products/read/${random.random2}`)}  style={{ cursor: 'pointer' }} fluid/>
            <Image src={`${host}/api/product/view/product_${random.random3}_1.jpg`} onClick={() => navigate(`/products/read/${random.random3}`)}  style={{ cursor: 'pointer' }} fluid/>
            <Image src={`${host}/api/product/view/product_${random.random4}_1.jpg`} onClick={() => navigate(`/products/read/${random.random4}`)}  style={{ cursor: 'pointer' }} fluid/>
          </RecommendedBox>
  
          <div  style={{width:'100%', height: '11%', display: 'flex', marginTop: '20px'}} >
                       <Image src='/images/banner2.png' fluid onClick={() => handleToAdidasBrand()} style={{ cursor: 'pointer' }} />
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
      {page === 'B' ? <ProductSubReview productId={productId} /> : <></>}
      {page === 'C' ? <ProductSubQna productId={productId} setSelectedQna={setSelectedQna} moveToRead={moveToRead} selectedQna={selectedQna}/> : <></>}
      {page === 'D' ? <ProductSubRefund /> : <></>}

    </Container>
    </>
  )
}
export default ProductReadComponent

const Title = styled.h2`
  font-size: 20px;
  font-weight: 400;
  color: black;
  margin-bottom: 20px;
`

const ImgBox = styled.div`
  width: 100%;
  height: max-content; // 높이를 최대로 맞춰주긴하는데, 뭔가 조건이 있다면 그조건에 맞춰서 ..
  max-height: 460px;
  aspect-ratio: 622 / 460; // 사이즈조절할껀데, 이 비율을 유지해줘
  overflow : hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid black;
  margin-bottom: 20px; //여백(margin은 바깥여백 padding은 내부여백)

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // cover | contain | fill | none | scale-down 등등
  }
`

const InfoBox = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  @media (max-width: 767px) {
    margin-bottom: 20px;
  }

  //미디어쿼리: media라고 쓰고(문법이 그래요) 그다음에 max값 혹은 min값을 설정하고 그 내부에 코드를 작성하면
  // max일 시에는 최대 ~~크기일때 적용되는 코드들
  // min일 시에는 최소 ~~크기부터 적용되는 코드를 작성 가능.
`
const ProductId = styled.div`
  font-size: 14px;
`

const ProductTitle = styled.div`
  font-size: 14px;
`

const ProductDesc = styled.div`
  font-size: 16px;
`

const ProductPrice = styled.div`
  font-size: 16px;
`

const ProductBrand = styled.div`
  font-size: 16px;
`

const ProductStock = styled.div`
  font-size: 16px;
`

const ButtonContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  gap: 25px;
  flex-direction: row;
`

const BrownButton = styled.button`
  width: 298px;
  height: 50px;
  background-color: #625244;
  color: white;
  border-radius: 20px;
  outline: none; // 선택된 상태의 테두리
  border: none; // 평상시 테두리 없음
  &:hover { // 마우스 올렸을때
    background-color: #4a3e3e;
  }
  img {
    width: 24px;
    height: 24px;
  }
`

const SubImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

const SubImgBox = styled.div`
  width: 100%;
  height: max-content;
  max-width: 187px;
  max-height: 165px;
  aspect-ratio: 187 / 165;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    border: 1px solid black;
  }
`

const MiddleLine = styled.div`
  width: 1px;
  height: 100%;
  background-color: #969696;
  padding: 0;
  margin: 0 11px;
`

const RecommendedBox = styled.div`
  width: 100%;
  height: max-content;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  img {
    // height: max-content;
    aspect-ratio: 197/165;
    object-fit: cover;
    border-radius: 20px;
    border: 1px solid black;
  }
`

const DropDownContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    width: 298px;
    height: 50px;
    background-color: #625244;
    color: white;
    outline: none;
    border-radius: 20px;
    border: none;
    &:hover {
      background-color: #4a3e3e;
    }
  }
  .dropdown-item {
    text-align: center;
  }
`

const Line = styled.hr`
  width: 100%;
  margin-top: -10px;
  margin-bottom: -10px;
`
