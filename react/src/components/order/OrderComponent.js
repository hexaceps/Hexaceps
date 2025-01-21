import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Col, Row, Alert, Container, Image, Modal, Nav } from 'react-bootstrap';
import {getCartItems} from '../../api/cartApi';
import { productGetOne } from '../../api/productsApi';
import MonthlyPaymentInfo from './MonthlyPaymentInfo';
// import { API_SERVER_HOST } from '../../api/qnaApi';
import { API_SERVER_HOST } from '../../serverEnv'
import { createOrder } from '../../api/orderApi';
import { requestPayment } from '../../api/paymentApi';
import { createTrackingInfo } from '../../api/trackingApi'
import './OrderComponent.css'; 
import { useNavigate } from 'react-router-dom';
import { CheckCircleFill, ExclamationTriangleFill } from 'react-bootstrap-icons'

const initState = {
    productId : 0,
    productName : '',
    productBrand : '',
    productDescription : '',
    price : 0,
    uploadFileNames : []
  }

const OrderComponent = ({ cartId }) => {

    const host = API_SERVER_HOST;
    const [cart, setCart] = useState(null);
    const [product, setProduct] = useState(initState);
    const [member, setMember] = useState(null);
    const [selectedBank, setSelectedBank] = useState(null);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    
    const [orderResult, setOrderResult] = useState(null);
    const [paymentResult, setPaymentResult] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showPaymentConfirmModal, setShowPaymentConfirmModal] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailureModal, setShowFailureModal] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState('');
    const navigate = useNavigate()

    const handleBankClick = (bankName) => {
        setSelectedBank(bankName);
        console.log("선택한 은행 or 카드 정보를 저장합니다 : ", bankName)
    };

    const handleCouponSelect = (e) => {
        setSelectedCoupon(e.target.value); // 선택된 은행을 저장
    };

    const handlePaymentSelect = (method) => {
        setSelectedPaymentMethod(method);
        console.log("선택한 결제방식을 저장합니다 : ", method)
    };

    useEffect(() => {
        const storedMember = localStorage.getItem("member");
        if (storedMember) {
            const parsedMember = JSON.parse(storedMember);
            setMember(parsedMember);
            console.log("Member 초기화 완료:", parsedMember);
        } else {
            console.warn("로컬 스토리지에 member 정보가 없습니다.");
        }
    }, []);

    useEffect(() => {
      console.log("주문페이지에서 가져온 장바구니 ID (이걸 useEffect에서 사용) : " + cartId)
        const fetchCartData = async () => {
            if (!member || !member.id) {
                console.warn("Member가 없거나 ID가 정의되지 않았습니다. 데이터를 가져오지 않습니다.");
                return;
            }
            try {
              const cartData = await getCartItems(member.id);
              console.log("fetchCartData() 에서 Cart Data : ", cartData);
              if (cartData && cartData.length > 0) {
                const targetCartId = cartId; // 비교하고자 하는 cartId
                const targetIndex = cartData.findIndex((cart) => cart.cartId == targetCartId);
                console.log("찾아낸 배열 index : "+targetIndex)

                if (targetIndex !== -1) {
                  console.log(`Cart ID가 ${targetCartId}인 항목의 인덱스:`, targetIndex);
                  console.log("해당 항목:", cartData[targetIndex]);
            
                  // 해당 항목의 데이터를 세팅 (예: state 업데이트)
                  setCart(cartData[targetIndex]);
                  console.log("장바구니 항목 세팅 완료:", cartData[targetIndex]);

                  // 관련 productId로 추가 데이터 가져오기
                  const productId = cartData[targetIndex].productId;
                  if (productId) {
                    const productData = await productGetOne(productId);
                    console.log("Product Data:", productData);
                    setProduct(productData);
                  }
                }
                // const { productId } = cartData[0];
                // setCart(cartData[0]);
                // console.log("장바구니 아이디 세팅 완료 : ", cart)
                // if (productId) {
                //     const productData = await productGetOne(productId);
                //     console.log("Product Data:", productData);
                //     setProduct(productData);
                // }
              } else {
                  console.warn("Cart data is empty or undefined.");
              }
            } catch (error) {
                console.error("Error fetching cart or product data:", error);
            }
        };
        if (member) fetchCartData();
    }, [member]); // cartId 제외

    useEffect(() => {
        console.log("Member:", member);
        console.log("Cart:", cart);
        console.log("Product:", product);
    }, [cart]); // member, product 제외

    const handleOrderSubmit = async () => {
        if (!cartId || !member?.id || !selectedBank || !selectedPaymentMethod) {
            alert("모든 정보를 입력해야 합니다.");
            return;
        }
        const orderData = {
            memberId: member.id,
            cartId,
            bankName: selectedBank,
            paymentMethod: selectedPaymentMethod,
            couponId: selectedCoupon || null,
        };
        try {
            const response = await createOrder(orderData);
            console.log("주문 번호 생성 완료 :", response);
            if(response.orderId) {
                setShowOrderModal(true)
                // alert('주문을 전송 하였습니다')
                setOrderResult(response)
                console.log("결제 요청을 위해 setOrderResult 안에 데이터를 넣었습니다 orderId :", orderResult);
                // 결제 모달 시작
                // setPayModalFetching(true)
            } else {
                alert('주문 요청 도중 오류가 발생 했습니다. 장바구니에서 다시 주문을 시도해 주세요')
            }
        } catch (error) {
            console.error("Failed to 주문 번호 생성 :", error);
            // setPayModalFetching(null)
        }
    };

    if(!cart || !product){
        return <div>상품과 사용자 정보를 로딩중 ...</div>;
    }

    // 결제 정보 확인 모달 관련 state
    const handlePaymentInfo = () => {
        // setSelectedPaymentMethod(method);
        setShowOrderModal(false)
        setShowPaymentModal(true) // 두 번째 모달 띄우기
    };

    // 결제 정보 (카드번호, 계좌번호) 입력 모달 state
    const handlePaymentInfoUpdate = (e, maxLength) => {
        const inputValue = e.target.value;
        // 숫자만 허용 및 최대 길이 제한
        const sanitizedValue = inputValue.replace(/[^0-9]/g, '').slice(0, maxLength);
        setPaymentInfo(sanitizedValue);

    };

    // 결제 정보 최종 확인 모달 state
    const handlePaymentConfirm = () => {
        setShowPaymentModal(false)
        setShowPaymentConfirmModal(true); // 세 번째 모달 띄우기
    };

    // 결제 요청 및 결과 처리
    const handlePaymentResult = async () => {
        setShowPaymentConfirmModal(false)
        try {
        setShowLoadingModal(true); // 로딩 모달 띄우기
        const paymentData = {
            orderId : orderResult.orderId,
            paymentType : selectedPaymentMethod,
            paymentVender : selectedBank,
            transferNumber : paymentInfo
            // totalPrice: orderResult.totalPrice,
        };
        const paymentResponse = await requestPayment(paymentData);
        setPaymentResult(paymentResponse)
        console.log("r결제 결과 확인 : ", paymentResponse)
        console.log("r결제 아이디 확인 : ", paymentResponse.paymentId)
        setShowLoadingModal(false);

        if (paymentResponse.paymentId) {
            setShowSuccessModal(true); // 결제 성공 모달 띄우기
        } else {
          console.log ("결제 실패에요... 로그 확인 필수!!")
            // setShowFailureModal(true); // 결제 실패 모달 띄우기
        }
        
        // 배송 API 호출
        const trackingData = {
          paymentId : paymentResponse.paymentId
        }
        const createTracking = await createTrackingInfo(trackingData)
        console.log("배송데이터 생성이 완료 됐습니다" + createTracking)
      
        } catch (error) {
        setShowLoadingModal(false);
        console.error('결제 요청 실패', error);
        setShowFailureModal(true); // 결제 실패 모달 띄우기
        }
    }
    const moveToHome = () => {
        setShowOrderModal(false)
        setShowPaymentModal(false)
        setShowSuccessModal(false)
        setShowFailureModal(false)
        setShowPaymentConfirmModal(false)
        navigate("/products/brand")
    }

  return (
    <>
        <Container style={{ fontFamily : "Rowdies, GmarketSansMedium"}}>
            {/* {console.log("프로덕트 정보", product)} */}
            <h3 className='mb-3'>Order Here</h3>
            <Card className="mb-3" style={{color : "#625244"}}>
                <Card.Body>
                <h5>사용자 배송 정보</h5>
                <Form.Label>이름</Form.Label>
                <Form.Control className='w-50 mb-3' type="text" value={member?.name || ''} readOnly />

                <Form.Label>연락처</Form.Label>
                <Form.Control className='w-50 mb-3' type="text" value={member?.phoneNumber || ''}readOnly />
                
                <Form.Label>배송지</Form.Label>
                <Form.Control className='mb-3' type="text" value={member?.address || ''} readOnly />

                {/* <p>이름: {orderData.userName}</p>
                <p>배송지: {orderData.shippingAddress}</p>
                <p>연락처: {orderData.contactInfo}</p> */}
                <Button className='mt-3' variant = "outline-secondary"><Nav.Link href="/mypage">사용자 정보 수정 바로가기</Nav.Link></Button>
                </Card.Body>
            </Card>

            {/* 상품 정보 */}
            <Card className="mb-3" style={{color : "#625244"}}>
                <Card.Body>
                <h5>About Product</h5>
                <Row>
                    <Col>
                        <Image src={`${host}/api/product/view/${product.uploadFileNames[0]}`} fluid/>
                    </Col>
                    <Col>
                      <Row>
                        <Col>Cart Number</Col>
                        <Col className='me-5 text-end'>{cart.cartId}</Col>
                      </Row>
                      <Row className='mt-2'>
                        <Col>Brand</Col>
                        <Col className='me-5 text-end'>{cart.productBrand}</Col>
                      </Row>
                      <Row className='mt-2'>
                        <Col>Product</Col>
                      </Row>
                      <Row className='mt-2'>
                        <Col className='me-5 text-end'>{product.productName}</Col>
                      </Row>
                      <Row className='mt-2'>
                        <Col>Price</Col>
                        <Col className='me-5 text-end'>{product.price.toLocaleString()}원</Col>
                      </Row>
                      <Row className='mt-2'>
                        <Col>Order Amount</Col>
                        <Col className='me-5 text-end'>{cart.amount}</Col>
                      </Row>
                    </Col>
                </Row>
                {/* <p>상품명: {orderData.productName}</p>
                <p>가격: {orderData.productPrice} 원</p> */}
                </Card.Body>
            </Card>

            <Card className="mb-3">
                <Card.Body>
                <h5>할인 정보</h5>
                <Form.Select className='w-50' onChange={handleCouponSelect}>
                    <option value="0">할인 쿠폰을 선택 하세요</option>
                    <option value="1">VIP 10% 할인 쿠폰</option>
                    <option value="2">2024 섬머이벤트 쿠폰</option>
                    <option value="3">Hexacoin 15% 할인 쿠폰</option>
                </Form.Select>
                </Card.Body>
            </Card>

            <Card className="mb-3">
                <Card.Body>
                <h5>결제 은행, 카드 선택</h5>
                <div className="payment-slider">
                {[
                    { name: "광주은행", img: "/images/bank/kjbank.png" },
                    { name: "국민은행", img: "/images/bank/kbbank.png" },
                    { name: "농협은행", img: "/images/bank/nhbank.png" },
                    { name: "대구은행", img: "/images/bank/dgbbank.png" },
                    { name: "부산은행", img: "/images/bank/bnk.png" },
                    { name: "신한은행", img: "/images/bank/sinhan.png" },
                    { name: "신협은행", img: "/images/bank/shinhyub.png" },
                    { name: "수협은행", img: "/images/bank/suhyub.png" },
                    { name: "시티뱅크", img: "/images/bank/citi.png" },
                    { name: "IBK은행", img: "/images/bank/ibk.png" },
                    { name: "SC제일은행", img: "/images/bank/scji.png" },
                    { name: "MG새마을금고", img: "/images/bank/mgbank.png" },
                    { name: "우리은행", img: "/images/bank/woori.png" },
                    { name: "하나은행", img: "/images/bank/hana.png" },
                    { name: "KB국민카드", img: "/images/bank/bccard.jpg" },
                    { name: "씨티카드", img: "/images/bank/cbcard.jpg" },
                    { name: "하나카드", img: "/images/bank/hanacard.jpg" },
                    { name: "현대카드", img: "/images/bank/hyundaicard.jpg" },
                    { name: "롯데카드", img: "/images/bank/lottecard.jpg" },
                    { name: "마스터카드", img: "/images/bank/master.jpg" },
                    { name: "삼성카드", img: "/images/bank/samsung.jpg" },
                    { name: "신한카드", img: "/images/bank/shinhancard.jpg" },
                    { name: "비자카드", img: "/images/bank/visa.jpg" },
                    { name: "우리카드", img: "/images/bank/wooricard.jpg" }
                        ].map((bank) => (
                          <div
                              key={bank.name}
                              className={`payment-option ${selectedBank === bank.name ? 'selected' : ''}`}
                              onClick={() => handleBankClick(bank.name)}
                              style={{ cursor: 'pointer' }} >
                              <img src={bank.img} alt={bank.name} className="payment-image" />
                              <p>{bank.name}</p>
                          </div>
                        ))}
                    </div>
                </Card.Body>
            </Card>

            {selectedBank && (
                <Card className="mb-3">
                    <Card.Body>
                    <h5>결제 방법</h5>
                        <div className="d-flex justify-content-center gap-2">
                            <Button variant="outline-warning" size="lg" className ="w-100" onClick={() => handlePaymentSelect('CARD')}>카드 결제</Button>
                            <Button variant="outline-success" size="lg" className ="w-100" onClick={() => handlePaymentSelect('BANK_TRANSFER')}>계좌 이체</Button>
                        </div>
                    </Card.Body>
                </Card> 
            )}

            <Alert variant='secondary'>
                <Card>
                    <Card.Body>
                    <h5>무이자 할부 안내</h5><span style={{ color : "red", fontSize : "0.8rem"}}>데스크탑이 더 잘보여요 :)</span>
                        <MonthlyPaymentInfo />
                    </Card.Body>
                </Card>
            </Alert>

            <Button variant="outline-dark" className="mt-3" onClick={handleOrderSubmit} >주문하기</Button>
            <Button variant="outline-info" className="mt-3 ms-3"><Nav.Link href="/mypage">쇼핑하기</Nav.Link></Button>
            
        </Container>

        {/* 주문 버튼을 누르면 아래의 모달창이 차례대로 나오면서 결제를 시작 합니다용 */}
        {/* 1번 모달 : 주문 정보 확인 */}
        <Modal show={showOrderModal} onHide={() => setShowOrderModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>주문 정보 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ fontFamily : "Rowdies, GmarketSansMedium", fontSize : "0.9rem"}} >
            <Row>
              <Col className='ms-3'>Order Number</Col>
              <Col className='me-3 text-end'>{orderResult?.orderNumber}</Col>
            </Row>
            <Row className='mt-2'>
              <Col className='ms-3'>Brand</Col>
              <Col className='me-3 text-end'>{cart.productBrand}</Col>
            </Row>
            <Row className='mt-2'>
              <Col className='ms-3'>Product</Col>
            </Row>
            <Row className='mt-2'>
              <Col className='me-3 text-end'>{product.productName}</Col>
            </Row>
            <Row className='mt-2'>
              <Col className='ms-3'>Price for Goods</Col>
              <Col className='me-3 text-end'>{product.price.toLocaleString()}원</Col>
            </Row>
            <Row className='mt-2'>
              <Col className='ms-3'>Order Quantity</Col>
              <Col className='me-3 text-end'>{orderResult?.productQuantity}</Col>
            </Row>
            <Row className='mt-2'>
              <Col className='ms-3'>Total Price</Col>
              <Col className='me-3 text-end'>{orderResult?.totalPrice.toLocaleString()}원</Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button className="me-3" variant="secondary" onClick={() => handlePaymentInfo()}>확인</Button>
            <Button className="me-3" variant="outline-danger" onClick={() => setShowOrderModal(false)}>닫기</Button>
          </Modal.Footer>
        </Modal>

        {/* 2번 모달: 카드 또는 계좌이체 정보 입력 */}
        {showPaymentModal && (
          <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
            <Modal.Header>
              <Modal.Title>{selectedPaymentMethod === "BANK_TRANSFER" ? "계좌이체" : "카드결제"} 정보 입력</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedPaymentMethod === 'BANK_TRANSFER' ? (
                <div>
                  <img src="/images/sampleBank.png" alt="계좌이체" className="payment-image-modal"/>
                  <Form.Control type="number" placeholder="계좌 번호를 입력하세요 (20자이내)" value={paymentInfo}
                    onChange={(e) => handlePaymentInfoUpdate(e, 20)} />
                </div>
              ) : (
                <div>
                  <img src="/images/sampleCard.png" alt="카드결제" className="payment-image-modal"/>
                  <Form.Control type="number" placeholder="카드 번호를 입력하세요 (16자이내)" value={paymentInfo}
                  onChange={(e) => handlePaymentInfoUpdate(e, 16)} />
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button className="me-3" variant="outline-danger" onClick={() => setShowPaymentModal(false)}>닫기</Button>
              <Button variant="secondary" onClick={handlePaymentConfirm}>결제정보입력완료</Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* 3번 모달: 결제 정보 확인 */}
        {showPaymentConfirmModal && (
          <Modal show={showPaymentConfirmModal} onHide={() => setShowPaymentConfirmModal(false)}>
            <Modal.Header>
              <Modal.Title>결제 정보 확인</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontFamily : "Rowdies, GmarketSansMedium", fontSize : "0.9rem"}} >
              <Row>
                <Col className='ms-3'>Payment Type</Col>
                <Col className='me-3 text-end'>{selectedPaymentMethod}</Col>
              </Row>
              <Row>
                <Col className='ms-3'>Vender</Col>
                <Col className='me-3 text-end'>{selectedBank}</Col>
              </Row>
              <Row>
                <Col className='ms-3'>{selectedPaymentMethod === "BANK_TRANSFER" ? "계좌번호" : "카드번호"}</Col>
                <Col className='me-3 text-end'>{paymentInfo}</Col>
              </Row>
              <Row className='mt-4 mb-3'>
                <Col className='ms-3'>Total Price</Col>
                <Col className='me-3 text-end'>{orderResult?.totalPrice.toLocaleString()}원</Col>
              </Row>
              <Row>
                <hr/>
                <p className='text-center text-danger mt-3'>
                  결제 정보를 확인 하셨으면 결제를 진행 해주세요.<br/>
                  네트워크 상황에 따라 다소 시간이 걸릴 수 있습니다.
                </p>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowPaymentConfirmModal(false)}>주문취소</Button>
              <Button variant="primary" onClick={handlePaymentResult}>결제</Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* 4번 결제 도중 로딩 모달 */}
        {showLoadingModal && (
          <Modal show={showLoadingModal} onHide={() => setShowLoadingModal(false)}>
            <Modal.Header>
              <Modal.Title>결제 진행 중...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>잠시만 기다려 주세요...</p>
            </Modal.Body>
          </Modal>
        )}

        {/* 5번 결제 성공 모달 */}
        {showSuccessModal && (
          <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
            <Modal.Header >
              <Modal.Title>결제 성공</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontFamily : "Rowdies, GmarketSansMedium", fontSize : "0.9rem"}} >
              <Row>
                <CheckCircleFill className='mb-2 fs-4 text-primary' /><br />
                <p style={{fontSize : "1.1rem", textAlign : "center", marginBottom : "40px"}}>결제가 성공적으로 완료되었습니다!</p>
              </Row>
              <Row>
                <Col className='ms-3'>Order Number</Col>
                <Col className='me-3 text-end'>{orderResult?.orderNumber}</Col>
              </Row>
              <Row className='mt-2'>
                <Col className='ms-3'>Payment Number</Col>
                <Col className='me-3 text-end'>{paymentResult?.paymentNumber}</Col>
              </Row>
              <Row className='mt-2'>
                <Col className='ms-3'>Payment Type</Col>
                <Col className='me-3 text-end'>{selectedPaymentMethod === "BANK_TRANSFER" ? "계좌이체" : "카드결제"}</Col>
              </Row>
              <Row className='mt-2'>
                <Col className='ms-3'>{selectedPaymentMethod === "BANK_TRANSFER" ? "Bank Transfer Number" : "Card Number"}</Col>
                <Col className='me-3 text-end'>{paymentInfo}</Col>
              </Row>
              <Row className='mt-2'>
                <Col className='ms-3'>Payment Status</Col>
                <Col className='me-3 text-end'>{paymentResult?.paymentStatus}</Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button className="me-3" variant="outline-primary" onClick={moveToHome}>쇼핑하기</Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* 결제 실패 모달 */}
        {showFailureModal && (
          <Modal show={showFailureModal} onHide={() => setShowFailureModal(false)}>
            <Modal.Header >
              <Modal.Title className='text-danger'>결제 실패</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
              <ExclamationTriangleFill className='mb-2 fs-4 text-danger' /><br />
              <p>결제에 실패했습니다. 다시 시도해주세요.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="warning" onClick={moveToHome}>돌아가기</Button>
            </Modal.Footer>
          </Modal>
        )}
    </>
  )
}

export default OrderComponent