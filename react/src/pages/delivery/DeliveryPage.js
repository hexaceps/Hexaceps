import React, { useState, useEffect } from "react" 
import { Modal, Button, Card, Row, Col, Container, Form } from "react-bootstrap" 
import { getTrackingListByMemberId } from "../../api/trackingApi" 
import { getOrdersByMemberId } from "../../api/paymentApi" 
// import { API_SERVER_HOST } from "../../api/qnaApi"
import { API_SERVER_HOST } from '../../serverEnv' 
import { addReview } from "../../api/reviewApi" 
import useCustomLogin from "../../hooks/useCustomLogin" 

const DeliveryPage = () => {
  const [showDetails, setShowDetails] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [member, setMember] = useState(null)
  const [trackingList, setTrackingList] = useState([])
  const [paymentList, setPaymentList] = useState([])
  const [mergedList, setMergedList] = useState([]) 
  const [show, setShow] = useState(false)  // 리뷰 모달 상태
  const [errorMessage, setErrorMessage] = useState("") 

  const [reviewData, setReviewData] = useState({
    memberId: "",
    productId: 500, // 임시값, 실제로는 동적으로 설정 필요
    subject: "",
    reply: "",
    starRating: 0,
  }) 

  const { loginState } = useCustomLogin() 

  // 사용자 정보 로드
  useEffect(() => {
    const storedMember = localStorage.getItem("member") 
    if (storedMember) {
      const parsedMember = JSON.parse(storedMember) 
      setMember(parsedMember) 
      setReviewData((prev) => ({
        ...prev,
        memberId: parsedMember.id.toString(),
      })) 
    }
  }, []) 

  // 배송 및 결제 데이터 로드
  useEffect(() => {
    if (member) {
      const fetchTrackingData = async () => {
        try {
          const trackingData = await getTrackingListByMemberId(member.id) 
          const paymentData = await getOrdersByMemberId(member.id) 

          const merged = trackingData.map((trackingItem) => {
            const paymentItem = paymentData.find(
              (payId) => payId.paymentId === trackingItem.paymentId
            ) 
            return { ...trackingItem, ...paymentItem } 
          }) 
          setTrackingList(trackingData) 
          setPaymentList(paymentData) 
          setMergedList(merged) 
        } catch (error) {
          console.error("tracking, payment 데이터를 가지고와서 merge 하는 프로세스에서 에러 발생:", error) 
        }
      } 
      fetchTrackingData() 
    }
  }, [member]) 

  const handleShowDetails = (item) => {
    setSelectedItem(item) 
    setShowDetails(true) 
  } 

  const handleCloseDetails = () => {
    setShowDetails(false) 
    setSelectedItem(null) 
  } 

  const handleShow = () => setShow(true) 

  const handleClose = () => {
    setShow(false) 
    setReviewData({
      memberId: member?.id?.toString() || "",
      productId: 500,
      subject: "",
      reply: "",
      starRating: 0,
    }) 
    setErrorMessage("") 
  } 

  const handleSubmit = async () => {
    if (!reviewData.subject || reviewData.starRating === 0) {
      setErrorMessage("모든 필드를 채우고 별점을 선택해주세요!") 
      return 
    }
    try {
      await addReview(reviewData) 
      handleClose() 
    } catch (error) {
      console.error("리뷰 등록 중 오류 발생:", error) 
    }
    alert("리뷰등록이 완료 되었습니다")
  } 

  const handleStarClick = (index) => {
    setReviewData((prev) => ({
      ...prev,
      starRating: index + 1,
    })) 
  } 

  return (
    <>
      <Container className="container py-4">
        {/* 배송 상품 리스트 */}
        {mergedList.map((item) => (
          <Card key={item.id} className="mb-3"
            style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "15px" }} >
            <Row className="g-3 align-items-center">
              <Col lg={2}>
                <img src={`${API_SERVER_HOST}/api/product/view/${ item.productImage || "default-image.jpg" }`}
                  alt={item.productName} className="img-fluid rounded" style={{ maxWidth: "100px" }} />
              </Col>
              {/* 상품 상세 정보 */}
              <Col lg={7}>
                <Row className="fw-bold mb-2">
                  <Col>Tracking ID</Col>
                  <Col className="text-end">{item.trackingId}</Col>
                </Row>
                <Row className="mb-2">
                  <Col style={{ minWidth: "250px" }}>
                    🚚 {item.traceList.at(-1).step} 📌 {item.traceList.at(-1).status}
                  </Col>
                  <Col></Col>
                  <Col className="text-end">{item.traceList.at(-1).location}</Col>
                </Row>
                <Row>
                  <Col className="mt-3" style={{ minWidth: "200px", fontSize: "0.8rem" }} >
                    {new Date(item.paymentDate).toLocaleString()}
                  </Col>
                  <Col className="mt-3 text-center">Quantity &nbsp;&nbsp;&nbsp; {item.productQuantity}</Col>
                  <Col className="mt-3 text-end">Total 💰 &nbsp;&nbsp;&nbsp; {item.totalPrice.toLocaleString()}원</Col>
                </Row>
              </Col>
              {/* 리뷰 및 배송 조회 버튼 */}
              <Col lg={3} className="text-end">
                {item.traceList.at(-1).step === "배송완료" && (
                  <Button variant="outline-danger" className="btn-sm" onClick={handleShow} >
                    리뷰 작성
                  </Button>
                )}
                <Button variant="outline-success" className="ms-2 btn-sm" onClick={() => handleShowDetails(item)} >
                  배송조회
                </Button>
              </Col>
            </Row>
          </Card>
        ))}

        {/* 배송 상세 모달 */}
        <Modal show={showDetails} onHide={handleCloseDetails} centered size="lg">
          <Modal.Body>
            {selectedItem && (
              <>
                <h5>Tracking ID: {selectedItem.trackingId}</h5>
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th>단계</th>
                      <th>처리시간</th>
                      <th>상태</th>
                      <th>위치</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItem.traceList.map((trace) => (
                      <tr key={trace.traceId}>
                        <td>{trace.step}</td>
                        <td>{new Date(trace.updateDate).toLocaleString()}</td>
                        <td>{trace.status}</td>
                        <td>{trace.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails}>닫기</Button>
          </Modal.Footer>
        </Modal>

        {/* 리뷰 작성 모달 */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>🚀 리뷰 작성</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Label>리뷰</Form.Label>
                <Form.Control type="textarea" rows={3} placeholder="리뷰 내용을 입력하세요"
                  value={reviewData.subject}
                  onChange={(e) =>
                    setReviewData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  } />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStarRating">
                <Form.Label>별점</Form.Label>
                <div>
                  {[...Array(5)].map((_, index) => (
                    <span key={index}
                      style={{ fontSize: "1.5rem", color: index < reviewData.starRating ? "gold" : "lightgray", cursor: "pointer" }}
                      onClick={() => handleStarClick(index)} >
                      ★
                    </span>
                  ))}
                </div>
              </Form.Group>
              {errorMessage && (
                <div className="text-danger mb-3">{errorMessage}</div>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleSubmit}>리뷰등록</Button>
            <Button variant="outline-warning" onClick={handleClose}>닫기</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  ) 
} 

export default DeliveryPage 
