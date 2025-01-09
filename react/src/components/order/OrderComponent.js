import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Col, Row, Alert, Container, Image } from 'react-bootstrap';
import {getCartItems} from '../../api/cartApi';
import { productGetOne } from '../../api/productsApi';
import MonthlyPaymentInfo from './MonthlyPaymentInfo';
import { API_SERVER_HOST } from '../../api/qnaApi';
import { createOrder } from '../../api/orderApi';
import './OrderComponent.css'; 

const initState = {
    productId:0,
    productName:'',
    productBrand:'',
    productDescription:'',
    price:0,
    uploadFileNames: []
  }

const OrderComponent = ({ cartId }) => {
    // const cartId = useParams();
    console.log("컴포넌트에서 줘냐궁??", cartId)
    const [cart, setCart] = useState(null);
    const [product, setProduct] = useState(initState);
    const [member, setMember] = useState(null);
    const host = API_SERVER_HOST;
    const [selectedBank, setSelectedBank] = useState(null);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const handleBankClick = (bankName) => {
        setSelectedBank(bankName); // 선택된 은행을 저장
    };

    const handleCouponSelect = (e) => {
        setSelectedCoupon(e.target.value); // 선택된 은행을 저장
    };

    const handlePaymentSelect = (method) => {
        setSelectedPaymentMethod(method); // 선택된 은행을 저장
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
        const fetchCartData = async () => {
            if (!member || !member.id) {
                console.warn("Member가 없거나 ID가 정의되지 않았습니다. 데이터를 가져오지 않습니다.");
                return;
            }
            try {
                const cartData = await getCartItems(member.id);
                console.log("Cart Data:", cartData);
                
                if (cartData && cartData.length > 0) {
                    const { productId } = cartData[0];

                    setCart(cartData[0]);

                    if (productId) {
                        const productData = await productGetOne(productId);
                        console.log("Product Data:", productData);
                        setProduct(productData);
                    }

                } else {
                    console.warn("Cart data is empty or undefined.");
                }
            } catch (error) {
                console.error("Error fetching cart or product data:", error);
            }
        };

        fetchCartData();
    }, [cartId, member]);

    useEffect(() => {
        console.log("Member:", member);
        console.log("Cart:", cart);
        console.log("Product:", product);
    }, [member, cart, product]);

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
            alert('주문을 전송하였습니다')
            console.log("Order created successfully:", response);
        } catch (error) {
            console.error("Failed to create order:", error);
        }
    };

    if(!cart || !product){
        return <div>로딩 중 ...</div>;
    }
//   const [orderData, setOrderData] = useState(null);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

//   useEffect(() => {
//     const fetchOrderData = async () => {
//       const response = await fetch(`/api/order?productId=${productId}&cartId=${cartId}&memberId=${memberId}`);
//       const data = await response.json();
//       setOrderData(data);
//     };
//     fetchOrderData();
//   }, [productId, cartId, memberId]);

//   if (!orderData) {
//     return <div>로딩 중...</div>;
//   }

//   const handlePaymentMethodChange = (methodId) => {
//     setSelectedPaymentMethod(methodId);
//   };

  return (
    <>
        <Container>
            {console.log("프로덕트 정보", product)}
            <h3 className='mb-3'>Order Here</h3>
            <Card className="mb-3">
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
                <Button className='mt-3' variant = "dark">사용자 정보 수정 바로가기</Button>
                </Card.Body>
            </Card>

            {/* 상품 정보 */}
            <Card className="mb-3">
                <Card.Body>
                <h5>상품 정보</h5>
                <Row>
                    <Col>
                        <Image src={`${host}/api/product/view/${product.uploadFileNames[0]}`} fluid/>
                    </Col>
                    <Col>
                        <p>장바구니 ID: {cart.cartId}</p>
                        <p>제품 ID: {product.productId}</p>
                        <p>카테고리: {cart.category}</p>
                        <p>상품명: {product.productName}</p>
                        <p>가격: {product.price}원</p>
                        <p>수량: {cart.amount}</p>
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
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={bank.img} alt={bank.name} className="payment-image" />
                                <p>{bank.name}</p>
                            </div>
                        ))}
                    </div>
                </Card.Body>
            </Card>
                {/* <div className="payment-slider">
                    {orderData.paymentMethods.map((method) => (
                    <div
                        key={method.id}
                        className={`payment-option ${selectedPaymentMethod === method.id ? 'selected' : ''}`}
                        onClick={() => handlePaymentMethodChange(method.id)}
                    >
                        <img
                        src={method.imageUrl}
                        alt={method.name}
                        className="payment-image"
                        />
                        <p>{method.name}</p>
                    </div>
                    ))}
                </div> */}
                {/* </Card.Body>
            </Card> */}

            {selectedBank && (
                <Card className="mb-3">
                    <Card.Body>
                    <h5>결제 방법</h5>
                        <div className="d-flex justify-content-center gap-2">
                            <Button variant="dark" size="lg" className ="w-100" 
                                onClick={() => handlePaymentSelect('CARD')}>
                                카드 결제
                            </Button>
                            <Button variant="success" size="lg" className ="w-100" onClick={() => handlePaymentSelect('BANK_TRANSFER')}>
                                계좌 이체
                            </Button>
                        </div>
                    </Card.Body>
                </Card> 
            )}

            <Alert variant='secondary'>
                <Card>
                    <Card.Body>
                    <h5>무이자 할부 안내</h5>
                        <MonthlyPaymentInfo />
                    </Card.Body>
                </Card>
            </Alert>

            <Button variant="dark" className="mt-3" onClick={handleOrderSubmit} >주문하기</Button>
            
            </Container>
    </>
  )
}

export default OrderComponent