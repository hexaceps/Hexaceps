import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import { API_SERVER_HOST } from "../../api/qnaApi";
import { API_SERVER_HOST } from '../../serverEnv'
import { getCartItems, removeFromCart, changeCart } from "../../api/cartApi";

const CartPage = ({ member }) => {
  const navigate = useNavigate();
  const host = API_SERVER_HOST;
  const [cart, setCart] = useState([]);
  // const [selectedCartId, setSelectedCartId] = useState(null); // 선택된 cartId를 별도로 저장

  console.log("멤버 정보", member);
  console.log("카트 목록", cart);

  // const chooseWhichCartId = (id) => {
  //   setSelectedCartId(id)
  //   console.log("라디오 버튼으로 선택한 카트 ID : " + id);
  // };
  // const handlePurchase = () => {
  //   console.log("선택된 상품 cartId로 주문 이동 : ", cart.cartId);
  //   if (!cart.cartId===null) {
  //     navigate(`/order/${cart.cartId}`);
  //   } else {
  //     alert("구매할 상품을 선택해주세요.");
  //   }
  // };


  // 수량 변경 (+/-)
  const updateQuantity = async(cartId, delta) => {
    const updatedCart = cart.map((item) =>
      item.cartId === cartId
        ? {...item, amount: Math.max(1, item.amount + delta)}
        : item
    );

    const updatedItem = updatedCart.find((item) => item.cartId === cartId);

    try{
      await changeCart({
        cartId: updatedItem.cartId,
        productId: updatedItem.productId,
        amount: updatedItem.amount,
        memberId: member.id,
      });
      setCart(updatedCart);
      console.log("수량 변경 후 서버 저장 성공:", updatedItem);
    } catch (error){
      console.error("수량 변경 후 서버 저장 실패:", error);
    }
    // setCart((prev) =>
    //   prev.map((cart) =>
    //     cart.cartId === cartId
    //       ? { ...cart, amount: Math.max(1, cart.amount + delta) }
    //       : cart
    //   )
    //);
  };

  // 개별 상품 삭제
  const handleDelete = async (id) => {
    const response = await removeFromCart(id);
    setCart((prev) => prev.filter((item) => item.cartId !== id));
    console.log("방금 삭제한 장바구니 데이터", response.data);
  };

  // 장바구니 데이터 가져오기
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartData = await getCartItems(member.id);
        console.log("Cart Data:", cartData);
        setCart(cartData);
      } catch (error) {
        console.error("Error fetching cart or product data:", error);
      }
    }
    fetchCartData()
  }, [member])
  // 주문 페이지로 이동
  const handlePurchase = (cartId) => {
    console.log("선택된 상품 cartId로 주문 이동 : ", cartId);
    navigate(`/order/${cartId}`); // 해당 상품의 cartId로 주문 페이지 이동
  };

  return (
    <div>
      {cart.map((cart) => (
        <div key={cart.cartId} className="card mb-3">
          <div className="row g-0 align-items-center">
            {/* 라디오 체크박스 추가 */}
            <div className="col-1 text-center">
              {/* <input
                type="radio"
                name="cartSelection" // 라디오 버튼 그룹화
                checked={selectedCartId === cart.cartId}
                onChange={() => chooseWhichCartId(cart.cartId)} // 선택된 cartId 업데이트
              /> */}
            </div>
            <div className="col-2">
              <img
                src={`${host}/api/product/view/${cart.imageName?.[0] || "default-image.jpg"}`}
                alt={cart.imageName?.[0]}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-4">
              <div className="card-body">
                <h5 className="card-title">{cart.productName}</h5>
                <p className="card-text">
                  가격: {cart.price.toLocaleString()}원
                </p>
              </div>
            </div>
            <div className="col-2">
              <div className="input-group">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => updateQuantity(cart.cartId, -1)}
                >
                  -
                </button>
                <input
                  type="text"
                  className="form-control text-center"
                  value={cart.amount}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => updateQuantity(cart.cartId, 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-2 text-end">
              <p className="mb-0">
                총액: {(cart.price * cart.amount).toLocaleString()}원
              </p>
              <button className="btn btn-outline-dark mt-2 btn-sm ms-2" onClick={() => handlePurchase(cart.cartId)} >상품구매 ⚡ </button>
              <button className="btn btn-outline-secondary mt-2 btn-sm ms-2" onClick={() => handleDelete(cart.cartId)} >삭제</button>
            </div>
          </div>
        </div>
      ))}

      <div className="text-end mb-3">
        {/* 계속 쇼핑하기 버튼 */}
        <button
          className="btn btn-warning m-2"
          onClick={() => {
            window.scrollTo(0, 0); // 스크롤 최상단 이동
            navigate("/"); // 홈 화면으로 이동
          }}
        >
          계속 쇼핑하기 ⚡
        </button>

        {/* 선택 상품구매 버튼 */}
        {/* <button
          className="btn btn-dark"
          onClick={() => {
            if (selectedCartId) {
              console.log("선택된 상품 cartId로 주문 이동 : ", selectedCartId);
              navigate(`/order/${selectedCartId}`); // 선택된 상품의 cartId로 구매창으로 이동
            } else {
              alert("구매할 상품을 선택해주세요.");
            }
          }}
        >
          선택 상품구매 ⚡
        </button> */}
      </div>
    </div>
  );
};

export default CartPage;
