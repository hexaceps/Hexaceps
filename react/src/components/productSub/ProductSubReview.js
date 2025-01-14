import React, { useState, useEffect } from "react"
import { Card, Button, Form, Row, Col, Container } from "react-bootstrap"
import useCustomLogin from '../../hooks/useCustomLogin';
import { getReviewByProductId } from "../../api/reviewApi" 
import { getOneMember } from '../../api/memberApi';

const ProductSubReview = ({ productId }) => {
  const [reviews, setReviews] = useState([]) 
  const [newReplyByReview, setNewReplyByReview] = useState({}) 
  const [errorMessages, setErrorMessages] = useState({})
  const [isAdmin, setIsAdmin] = useState(false)
  const { loginState } = useCustomLogin()
  
  const [member, setMember] = useState(() => {
      const storedMember = localStorage.getItem('member')
      return storedMember ? JSON.parse(storedMember) : null;
    })

  useEffect(() => {
    console.log("useEffect 에서 화면 진입시 review List 를 가져옵니다")
    const fetchData = async () => {
        const data = await getReviewByProductId(productId) 
        console.log("상품 ID로 리뷰리스트를 가지고 왔습니다 1) reviewId :  " + data[0]?.reviewId + ", memberId : " + data[0]?.memberId)
        setReviews(data)
        if(loginState.email === "admin@hexa.com"){ // 이녀석만 보이게 할거임
          console.log("현재 로그인된 이메일은?? : " + loginState.email)
          setIsAdmin(true)
        }
    } 
    fetchData()
  }, [productId])

  useEffect(() => {
    console.log("useEffect 에서 화면 진입시 회원정보를 가져오고 댓글 창을 관리할 관리자 모드를 확인 합니다")
    if (loginState.email) {
      getOneMember(loginState.email).then(data => {
        setMember(data)
        console.log("data", data)
        console.log("memberId: ", member.id)
        localStorage.setItem('member', JSON.stringify(data))
      })
    }
  }, [loginState])

  // 랜덤 유저 랜덤하게 뿌리기
  const userNames = ["불타는바다", "황홀한노을", "놀라운구름", "몽글한두부", "강렬한사과", "안익은식초", "깐깐한라면"];
  const getRandomUserName = () => {
    return userNames[Math.floor(Math.random() * userNames.length)];
  }

  const handleReplySubmit = (reviewId) => {
    if (!newReplyByReview[reviewId] || newReplyByReview[reviewId].trim() === "") {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [reviewId]: "댓글을 입력해주세요.",
      }))
      return
    }
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.reviewId === reviewId
          ? { ...review, replies: [...(review.replies || []), newReplyByReview[reviewId].trim()] }
          : review
      )
    )
    setNewReplyByReview((prevReplies) => ({
      ...prevReplies,
      [reviewId]: "",
    }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [reviewId]: null,
    }))
  }

  const handleDeleteReview = (reviewId) => {
    setReviews((prevReviews) => prevReviews.filter((review) => review.reviewId !== reviewId)) 
  } 

  const handleAddReview = () => {
    console.log("리뷰 작성 버튼 클릭됨") 
    // 리뷰 작성 로직 추가
  } 

  return (
    <Container className="mt-5">
      <h5 className="me-3 text-end">상품 리뷰</h5>
      <hr />

      {reviews.map((review) => (
        <Card key={review.reviewId} className="mb-4">
          <Card.Body>
            <Row>
              <Col md={2} className="d-flex justify-content-center align-items-center">
                <img src={ review.memberId % 2 == 0 ? "/images/avatar/avatar-boy.png" : "/images/avatar/avatar-girl.png" } alt="avatar" className="rounded-circle"
                  style={{ width: "100px", height: "100px" }} />
              </Col>
              <Col md={10}>
                <Card.Title>
                  <Row>
                    <Col>{review.subject}</Col>
                    <Col lg={3} className="text-end text-secondary me-3" style={{fontSize : "0.9rem"}}>
                      <div className="mb-3">{getRandomUserName()}</div>
                      <Card.Subtitle className="mb-2 text-muted">
                      {new Date(review.createAt).toLocaleDateString()}
                      </Card.Subtitle>
                      <Row>
                        <div className="mb-2 text-end">
                          {[...Array(5)].map((_, index) => (
                          <span key={index}
                            style={{ fontSize: "1.1rem", color: index < review.starRating ? "gold" : "lightgray" }} >
                            ★
                          </span>
                          ))}
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </Card.Title>
                <Card.Text><span style={{fontSize : "1.7rem"}}>🎉&nbsp;&nbsp;&nbsp;</span>{review.reply}</Card.Text>
                {isAdmin && (
                <Form className="d-flex align-items-center">
                  <Form.Control type="text" placeholder="관리자 댓글을 입력하세요" className="me-2" value={newReplyByReview[review.reviewId] || ""}
                    onChange={(e) =>
                      setNewReplyByReview((prev) => ({
                        ...prev,
                        [review.reviewId]: e.target.value,
                      }))} />
                  <Button variant="secondary" size="sm" onClick={() => handleReplySubmit(review.reviewId)} >
                    등록
                  </Button>
                </Form>
                )}
                {errorMessages[review.reviewId] && (
                  <Form.Text className="text-danger">{errorMessages[review.reviewId]}</Form.Text>
                )}
                {member.id === review.memberId && (
                <Button variant="danger" size="sm" className="mt-3"
                  onClick={() => handleDeleteReview(review.reviewId)} >
                  리뷰 삭제
                </Button>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
      
      <Button variant="primary" className="mt-4" onClick={handleAddReview}> 리뷰 작성하기 </Button>
    </Container>
  ) 
} 

export default ProductSubReview 