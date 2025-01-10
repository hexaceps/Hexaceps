import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const initialDeliveryItems = [
  {
    id: 1,
    name: "Nike best Row",
    image: "/images/1.jpg",
    orderDate: "2025-06-01 16:33:52",
    quantity: 1,
    price: 614900,
    deliveryStatus: "♧ 무료배송중",
  },
  {
    id: 2,
    name: "Nike best Row",
    image: "/images/1.jpg",
    orderDate: "2025-06-01 16:33:52",
    quantity: 1,
    price: 614900,
    deliveryStatus: "♧ 무료배송중 ",
  },
];

const DeliveryPage = () => {
  const [showDetails, setShowDetails] = useState(false); // 모달 상태
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 아이템

  const handleShowDetails = (item) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedItem(null);
  };

  return (
    <div className="container py-4">
      {/* 상단 검색 필터 */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-3">
          <input
            type="date"
            className="form-control"
            style={{ maxWidth: "200px" }}
          />
          <input
            type="date"
            className="form-control"
            style={{ maxWidth: "200px" }}
          />
          <button className="btn border px-4">🔍</button>
        </div>
      </div>

      {/* 배송 상품 리스트 */}
      {initialDeliveryItems.map((item) => (
        <div
          key={item.id}
          className="card mb-3"
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          <div className="row g-3 align-items-center">
            {/* 상품 이미지 */}
            <div className="col-2 text-center">
              <img
                src={item.image}
                alt={item.name}
                className="img-fluid rounded"
                style={{ maxWidth: "100px" }}
              />
            </div>
            {/* 상품 상세 정보 */}
            <div className="col-5">
              <h5 className="fw-bold">{item.name}</h5>
              <div className="d-flex gap-3 align-items-center mb-2">
                <p className="text-muted mb-0">주문일:</p>
                <p className="mb-0">{item.orderDate}</p>
              </div>
              <div className="d-flex gap-3 align-items-center">
                <p className="text-muted mb-0">수량:</p>
                <input
                  type="text"
                  value={item.quantity}
                  readOnly
                  className="form-control form-control-sm"
                  style={{ maxWidth: "60px" }}
                />
              </div>
            </div>
            {/* 상품 총액 및 배송 상태 */}
            <div className="col-5 text-end">
              <div className="mb-2">
                <p className="text-muted mb-0">
                  총액 : {item.price.toLocaleString()}원
                </p>
              </div>
              <p className="text-muted mb-2">
                <i className="bi bi-geo-alt-fill"></i> {item.deliveryStatus}
              </p>
              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-outline-secondary">
                  제품 상세보기
                </button>
                <button
                  className="btn btn-dark"
                  onClick={() => handleShowDetails(item)} // 모달 열기
                >
                  배송조회
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 배송 상세 모달 */}
      <Modal show={showDetails} onHide={handleCloseDetails} centered size="lg">
        <Modal.Body>
          <div className="text-center mb-4">
            {["발송준비", "택배사 전달", "도착예정", "배송완료"].map(
              (status, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "inline-block",
                    textAlign: "center",
                    margin: "0 15px",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "#6d4c41",
                      borderRadius: "50%",
                      margin: "auto",
                    }}
                  ></div>
                  <p className="mt-2">{status}</p>
                </div>
              )
            )}
          </div>
          <div className="text-center">
            <h2>배송 조회</h2>
            <hr />
            <p>
              <strong>한진택배</strong> <br />
              031-654-6543 <br />
              <hr />
              <strong>송장번호</strong>
              <br />
              9056445630011
            </p>
            <hr />
          </div>
          <h6 className="mt-4 text-center">
            <strong>배송 정보</strong>
          </h6>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>단계</th>
                <th>처리시간</th>
                <th>진행 상태</th>
                <th>담당</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>상품인수</td>
                <td>2024-05-14 16:23:00</td>
                <td>집하완료</td>
                <td>서울관악우체국</td>
              </tr>
              <tr>
                <td>이동중</td>
                <td>2024-05-14 16:26:00</td>
                <td>접수 - 소포 물품 사진</td>
                <td>서울관악우체국</td>
              </tr>
              <tr>
                <td>발송</td>
                <td>2024-05-14 18:26:00</td>
                <td>발송</td>
                <td>서울관악우체국</td>
              </tr>
              <tr>
                <td>도착</td>
                <td>2024-05-14 18:46:00</td>
                <td>도착</td>
                <td>안양우편물류센터</td>
              </tr>
              <tr>
                <td>발송</td>
                <td>2024-05-14 21:39:00</td>
                <td>발송</td>
                <td>안양우편물류센터</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeliveryPage;
