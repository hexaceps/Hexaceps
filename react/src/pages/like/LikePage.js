import React, { useState, useEffect } from "react";
import { Container, Nav, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom'; // useNavigate 추가
import "bootstrap/dist/css/bootstrap.min.css";
import CartPage from "../cart/CartPage";
import DeliveryPage from "../delivery/DeliveryPage";
import likeApi from '../../api/likeApi';
// import { API_SERVER_HOST } from '../../api/qnaApi';
import { API_SERVER_HOST } from '../../serverEnv'
import useCustomCart from '../../hooks/useCustomCart';
import "./Like.css";
import LoginComponent from "../../components/member/LoginComponent";
import useCustomLogin from "../../hooks/useCustomLogin";

const LikePage = () => {
  const host = API_SERVER_HOST;
  const navigate = useNavigate(); // useNavigate 초기화
  const {isLogin} = useCustomLogin()
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "like"); // 기본 탭 설정
  // const [cartItems, setCartItems] = useState([]); // 장바구니 상태 관리
  // const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태 관리
  const [member, setMember] = useState(null);
  const [likeItems, setLikeItems] = useState([]);
  const { changeCart } = useCustomCart();
    const [like, setLike] = useState(() => {
        const storedLike = localStorage.getItem('like');
        return storedLike ? JSON.parse(storedLike) : null;
      });
  
      const storedMember = localStorage.getItem("member");

  useEffect(() => {
    const storedMember = localStorage.getItem("member")
    if (storedMember) {
      const parsedMember = JSON.parse(storedMember)
      setMember(parsedMember);
      console.log("Member 초기화 완료:", parsedMember)
    } else {
      console.warn("로컬 스토리지에 member 정보가 없습니다.")
    }
  }, [])

  useEffect(() => {
    const fetchLikeData = async () => {
        const response = await likeApi.getUserLikes(member.id) // axios 호출
        if (response && response.data) {
          console.log("Like Data:", response.data)
          setLikeItems(response.data) // likeItems 상태 업데이트
        } else {
          console.warn("찜 데이터가 비어 있습니다.")
        }};
        if (like) {
          localStorage.setItem("like", JSON.stringify(like));
        }
    if (member) {
      fetchLikeData()
    }
  }, [member,like]) // member 상태가 변경될 때마다 실행

  const handleAddToCart = async (item) => {
    let amount = 1;
    const cartDTO = {
      productId: item.productId,
      amount: amount,
      memberId: item.memberId,
    }
      console.log("상품 장바구니 추가");
      await changeCart(cartDTO);
  }

  // const handleSelectAll = () => {
  //   const newSelectAll = !selectAll;
  //   setSelectAll(newSelectAll);
  //   setLikeItems((prev) =>
  //     prev.map((item) => ({
  //       ...item,
  //       checked: newSelectAll,
  //     }))
  //   )
  // }

  // const handleItemCheck = (id) => {
  //   setLikeItems((prev) =>
  //     prev.map((item) =>
  //       item.productId === id ? { ...item, checked: !item.checked } : item
  //     )
  //   )
  //   const allChecked = likeItems.every((item) =>
  //     item.productId === id ? !item.checked : item.checked
  //   )
  //   setSelectAll(allChecked)
  // }
  // const handleClearAll = () => {
  //   setLikeItems([])
  // }

  const handleNavigateHome = () => {
    window.scrollTo(0, 0) // 먼저 최상단으로 이동
    navigate("/") // 이후 홈 화면으로 이동
  }


  const handleRemoveLike = async (productId) => {
    if (!member) return;
          console.log("멤버아이디",member.id)
      console.log("상품아이디",productId)
    try {
       likeApi.removeLike(member.id, productId)
       .then(() => {
         const updatedLike = like.filter(likeItem => likeItem.productId !== productId);
         setLike(updatedLike);  
       })
       .catch((error) => {
         console.error("관심 상품 삭제 실패:", error);
       });
      console.log("멤버아이디",member.id)
      console.log("상품아이디",productId)
      setLikeItems((prev) => prev.filter((item) => item.productId !== productId));
      console.log(`상품 ${productId} 찜에서 삭제 완료`);
    } catch (error) {
      console.error("찜 삭제 중 오류 발생:", error);
    }
  };
  
  const handleRemoveSelectedLikes = async () => {
    if (!member) return;
    const selectedItems = likeItems.filter((item) => item.checked);
    if (selectedItems.length === 0) {
      alert("선택된 상품이 없습니다.");
      return;
    }
  
    try {
      await Promise.all(
        selectedItems.map((item) => likeApi.removeLike(member.id, item.productId))
      );
      setLikeItems((prev) => prev.filter((item) => !item.checked));
      console.log("선택된 상품들이 찜에서 삭제되었습니다.");
    } catch (error) {
      console.error("선택된 찜 삭제 중 오류 발생:", error);
    }
  };

  return (
    <>
    {isLogin ? 
    <Container className="py-4">
      {/* 네비게이션 탭 */}
      <Nav className="nav-tabs justify-content-center custom-tabs">
        <Nav.Item>
          <Nav.Link className={activeTab === "like" ? "active" : ""} onClick={() => setActiveTab("like")} >관심상품</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={activeTab === "cart" ? "active" : ""} onClick={() => setActiveTab("cart")} >장바구니</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={activeTab === "delivery" ? "active" : ""} onClick={() => setActiveTab("delivery")} memberInfo={member} >배송조회</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Tab Content */}
      <Row className="mt-3">
        {activeTab === "like" && (
          <div>
            {/* 관심상품 리스트 */}
            <Row className="d-flex justify-content-between align-items-center mb-4">
              {/* <Col onClick={handleSelectAll} style={{ cursor: "pointer", display: "flex", alignItems: "center" }} >
                <span style={{ fontSize: "24px", color: selectAll ? "#FFD700" : "#ccc" }} >
                  {selectAll ? "★" : "☆"}
                </span>
                <label className="ms-2 fw-bold">관심상품 모두 선택</label>
              </Col>
              <Col className="text-end">
                <button className="btn btn-outline-danger btn-sm" onClick={handleClearAll} >관심상품 모두 해제</button>
              </Col> */}
            </Row>
            {likeItems.length === 0 ? ( <p>관심상품이 없습니다.</p> ) : (
              likeItems.map((item) => (
                <Card key={item.productId} className="mb-3">
                  <Row className="row g-0 align-items-center">
                    {/* 개별 선택 */}
                    {/* <Col className="col-1 text-center" onClick={() => handleItemCheck(item.productId)}
                        style={{ cursor: "pointer", color: item.checked ? "#FFD700" : "#ccc", fontSize: "24px" }} >
                      {item.checked ? "★" : "☆"}
                    </Col> */}
                    {/* 이미지 */}
                    <Col md={1} ></Col>
                    <Col md={2}>
                      <img src={`${host}/api/product/view/${item.imageList?.[0] || "default-image.jpg"}`} alt={item.productName}
                          className="img-fluid rounded" style={{ maxWidth: "100px" }} />
                    </Col>
                    {/* 상세 정보 */}
                    <Col md={6}>
                      <Card.Body className="card-body">
                        <h5 className="card-title">{item.productName}</h5>
                        <p className="text-primary mb-1">특가할인 알림받기 🔔</p>
                        <p className="card-text text-muted">
                          가격: {item.price.toLocaleString()}원
                        </p>
                      </Card.Body>
                    </Col>
                    {/* 장바구니 추가 버튼 */}
                    <Col md={3} className="text-end">
                      <Button className="btn-secondary me-3 btn-sm" onClick={() => handleAddToCart(item)} >
                        장바구니 추가
                      </Button>
                      <Button variant="outline-danger me-3 btn-sm" onClick={() => handleRemoveLike(item.productId)} >
                        삭제
                      </Button>
                    </Col>
                  </Row>
                </Card>
              ))
            )}
            <div className="text-end mt-3">
              {/* "계속 쇼핑하기" 버튼 */}
              <button className="btn btn-warning me-2" onClick={handleNavigateHome} >
                계속 쇼핑하기 ⚡
              </button>
            </div>
          </div>
        )}
        {activeTab === "cart" && <CartPage member={member} />}
        {activeTab === "delivery" && <DeliveryPage />}
      </Row>
    </Container>
   :  ( <LoginComponent redirectTo="/like" /> )}
   </>
  )
}

export default LikePage;