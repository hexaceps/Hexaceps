import React, { useState, useEffect } from "react"
import { Card, Button, Form, Row, Col, Container, Modal } from "react-bootstrap"
import useCustomLogin from '../../hooks/useCustomLogin';
import { getReviewByMemberId, addReview } from "../../api/reviewApi" 
import { getOneMember } from '../../api/memberApi';

const MypageSubReview = () => {
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

  useEffect(() => {
    console.log("useEffect 에서 화면 진입시 review List 를 가져옵니다")
    const fetchData = async () => {
        const data = await getReviewByMemberId(member.id) 
        console.log("멤버 ID로 리뷰리스트를 가지고 왔습니다 1) reviewId :  " + data[0]?.reviewId + ", memberId : " + data[0]?.memberId)
        setReviews(data)
        if(loginState.email === "admin@hexa.com"){ // 이녀석만 보이게 할거임
          console.log("현재 로그인된 이메일  : " + loginState.email)
          setIsAdmin(true)
        }
    } 
    fetchData()
  }, [member])

  // 아바타 만들기
  const userAvatar = ["man1.png", "woman1.png", "man2.png", "woman2.png", "man3.png", "woman3.png", 
    "man4.png", "woman4.png", "man5.png", "woman5.png", "man6.png"]
  const getRandomAvatar = () => {
    // const randomIndex = Math.floor(Math.random() * userAvatar.length);
    const fixIndex = member.name.length % userAvatar.length
    return `/images/avatar/${userAvatar[fixIndex]}`
  };

  const [show, setShow] = useState(false);
  const [reviewData, setReviewData] = useState({
    memberId: member.id.toString(),
    productId: 500, // productId.toString(), 일단 고정
    subject: "",
    reply: "",
    starRating: 0,
  })

  const [errorMessage, setErrorMessage] = useState("")

  const handleShow = () => setShow(true)
  const handleClose = () => {
    setShow(false);
    setReviewData({
      memberId: member.id.toString(),
      productId: 500, // productId.toString(),
      subject: "",
      reply: "",
      starRating: 0,
    });
    setErrorMessage("")
  }

  const handleSubmit = async () => {
    console.log("리뷰 등록 버튼을 눌렸습니다")
    if (!reviewData.subject || reviewData.starRating === 0) {
      setErrorMessage("모든 필드를 채우고 별점을 선택해주세요!")
      return
    }
    const postData = async () => {
      const data = await addReview(reviewData)
      console.log("리뷰를 등록 하는 API를 호출 하고 response를 받았습니다", data)
      handleClose()
    }
    postData()
  }

  const handleStarClick = (index) => {
    setReviewData((prev) => ({
      ...prev,
      starRating: index + 1,
    }))
  }

  // 이곳에서는 리뷰등록을 안합니다. 등록은 배송에서 완료된 상품만 가능쓰~
  return (
    <>
      <Container className="py-1">
        {reviews.map((review) => (
          <Card key={review.reviewId} className="mb-4" >
            <Card.Body>
              <Row>
                <Col md={2} className="d-flex justify-content-center align-items-center">
                  <img src={ getRandomAvatar() } alt="avatar" className="rounded-circle"
                    style={{ width: "90px", height: "90px" }} />
                </Col>
                <Col md={10}>
                  <Card.Title>
                    <Row >
                      <Col className="mt-4">{review.subject}</Col>
                      <Col lg={3} className="text-end text-secondary mt-2 me-3" style={{fontSize : "0.9rem"}}>
                        <div className="mb-3">{member.name}</div>
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
                  <Card.Text style={{ position : "relative", top : "-20%" }} ><span style={{fontSize : "1.7rem"}}>🎉&nbsp;&nbsp;&nbsp;</span>{review.reply}</Card.Text>
                  {isAdmin && (
                  <Form className="d-flex align-items-center">
                    <Form.Control type="text" placeholder="관리자 댓글을 입력하세요" className="me-2" value={newReplyByReview[review.reviewId] || ""}
                      onChange={(e) =>
                        setNewReplyByReview((prev) => ({
                          ...prev,
                          [review.reviewId]: e.target.value,
                        }))} />
                    {/* <Button variant="secondary" size="sm" onClick={() => handleReplySubmit(review.reviewId)} >
                      등록
                    </Button> */}
                  </Form>
                  )}
                  {errorMessages[review.reviewId] && (
                    <Form.Text className="text-danger">{errorMessages[review.reviewId]}</Form.Text>
                  )}
                  {/* {member.id === review.memberId && (
                  <Button variant="danger" size="sm" className="mt-3"
                    onClick={() => handleDeleteReview(review.reviewId)} >
                    리뷰 삭제
                  </Button>
                  )} */}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}

       {/*  <Button variant="primary" className="mt-4" onClick={handleShow}>리뷰작성하기 </Button> */}

        {/* 리뷰 작성 모달 */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title> 🚀 리뷰 작성</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Label>리뷰</Form.Label>
                <Form.Control type="textarea" rows={3} placeholder="리뷰 내용을 입력하세요" value={reviewData.subject}
                  onChange={(e) =>
                    setReviewData((prev) => ({
                      ...prev, subject: e.target.value
                    }))
                  } />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="formReply">
                <Form.Label>내용</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="리뷰 내용을 입력하세요" value={reviewData.reply}
                  onChange={(e) =>
                    setReviewData((prev) => ({
                      ...prev, reply: e.target.value,
                    }))
                  } />
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="formStarRating">
                <Form.Label>별점</Form.Label>
                <div>
                  {[...Array(5)].map((_, index) => (
                    <span key={index}
                      style={{ fontSize: "1.5rem", color: index < reviewData.starRating ? "gold" : "lightgray", cursor: "pointer",
                      }} onClick={() => handleStarClick(index)}>
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

export default MypageSubReview
