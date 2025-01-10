import React, { useState, useEffect } from "react";
import { Nav } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom'; // useNavigate 추가
import "bootstrap/dist/css/bootstrap.min.css";
import CartPage from "../cart/CartPage";
import DeliveryPage from "../delivery/DeliveryPage";
import likeApi from '../../api/likeApi';
import { API_SERVER_HOST } from '../../api/qnaApi';
import useCustomCart from '../../hooks/useCustomCart';
import "./Like.css";

const LikePage = () => {
  const host = API_SERVER_HOST;
  const navigate = useNavigate(); // useNavigate 초기화
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "like"); // 기본 탭 설정
  const [cartItems, setCartItems] = useState([]); // 장바구니 상태 관리
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태 관리
  const [member, setMember] = useState(null);
  const [likeItems, setLikeItems] = useState([]);
  const { changeCart } = useCustomCart();

  console.log("찜 목록", likeItems);

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
    const fetchLikeData = async () => {
      try {
        const response = await likeApi.getUserLikes(member.id); // axios 호출
        if (response && response.data) {
          console.log("Like Data:", response.data);
          setLikeItems(response.data); // likeItems 상태 업데이트
        } else {
          console.warn("찜 데이터가 비어 있습니다.");
        }
      } catch (error) {
        console.error("찜 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    if (member) {
      fetchLikeData();
    }
  }, [member]); // member 상태가 변경될 때마다 실행

  const handleAddToCart = async (item) => {
    let amount = 1;
    const cartDTO = {
      productId: item.productId,
      amount: amount,
      memberId: item.memberId,
    };
    try {
      console.log("상품 장바구니 추가");
      await changeCart(cartDTO);
    } catch (error) {
      console.error("Error in handleToPurchase", error);
    }
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setLikeItems((prev) =>
      prev.map((item) => ({
        ...item,
        checked: newSelectAll,
      }))
    );
  };

  const handleItemCheck = (id) => {
    setLikeItems((prev) =>
      prev.map((item) =>
        item.productId === id ? { ...item, checked: !item.checked } : item
      )
    );

    const allChecked = likeItems.every((item) =>
      item.productId === id ? !item.checked : item.checked
    );
    setSelectAll(allChecked);
  };

  const handleClearAll = () => {
    setLikeItems([]);
  };

  const handleNavigateHome = () => {
    window.scrollTo(0, 0); // 먼저 최상단으로 이동
    navigate("/"); // 이후 홈 화면으로 이동
  };

  return (
    <div className="container py-4">
      {/* 네비게이션 탭 */}
      <Nav className="nav-tabs justify-content-center custom-tabs">
        <Nav.Item>
          <Nav.Link
            className={activeTab === "like" ? "active" : ""}
            onClick={() => setActiveTab("like")}
          >
            관심상품
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className={activeTab === "cart" ? "active" : ""}
            onClick={() => setActiveTab("cart")}
          >
            장바구니
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className={activeTab === "delivery" ? "active" : ""}
            onClick={() => setActiveTab("delivery")}
          >
            배송조회
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Tab Content */}
      <div className="mt-3">
        {activeTab === "like" && (
          <div>
            {/* 관심상품 리스트 */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div
                onClick={handleSelectAll}
                style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
              >
                <span
                  style={{
                    fontSize: "24px",
                    color: selectAll ? "#FFD700" : "#ccc",
                  }}
                >
                  {selectAll ? "★" : "☆"}
                </span>
                <label className="ms-2 fw-bold">관심상품 모두 선택</label>
              </div>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleClearAll}
              >
                관심상품 모두 해제
              </button>
            </div>

            {likeItems.length === 0 ? (
              <p>관심상품이 없습니다.</p>
            ) : (
              likeItems.map((item) => (
                <div key={item.productId} className="card mb-3">
                  <div className="row g-0 align-items-center">
                    {/* 개별 선택 */}
                    <div
                      className="col-1 text-center"
                      onClick={() => handleItemCheck(item.productId)}
                      style={{
                        cursor: "pointer",
                        color: item.checked ? "#FFD700" : "#ccc",
                        fontSize: "24px",
                      }}
                    >
                      {item.checked ? "★" : "☆"}
                    </div>

                    {/* 이미지 */}
                    <div className="col-2">
                      <img
                        src={`${host}/api/product/view/${item.imageList?.[0] || "default-image.jpg"}`}
                        alt={item.productName}
                        className="img-fluid rounded"
                        style={{ maxWidth: "100px" }}
                      />
                    </div>

                    {/* 상세 정보 */}
                    <div className="col-6">
                      <div className="card-body">
                        <h5 className="card-title">{item.productName}</h5>
                        <p className="text-primary mb-1">특가할인 알림받기 🔔</p>
                        <p className="card-text text-muted">
                          가격: {item.price.toLocaleString()}원
                        </p>
                      </div>
                    </div>

                    {/* 장바구니 추가 버튼 */}
                    <div className="col-3 text-end">
                      <button
                        className="btn btn-dark m-5"
                        onClick={() => handleAddToCart(item)}
                      >
                        장바구니 추가
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div className="text-end mt-3">
              {/* "계속 쇼핑하기" 버튼 */}
              <button
                className="btn btn-warning me-2"
                onClick={handleNavigateHome}
              >
                계속 쇼핑하기 ⚡
              </button>
            </div>
          </div>
        )}
        {activeTab === "cart" && <CartPage member={member} />}
        {activeTab === "delivery" && <DeliveryPage />}
      </div>
    </div>
  );
};

export default LikePage;



          