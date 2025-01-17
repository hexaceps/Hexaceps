import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Modal } from 'react-bootstrap'
import { postAddNewBoard } from '../../api/boardApi'
import { useNavigate } from 'react-router-dom'

const initState = {
  id: 0,
  memberId: 0,
  category: "",
  title: "",
  content: "",
  author: "",
  createdAt: null,
  updatedAt: null,
  count: 0,
  inActive: false
};

const BoardCreateComponent = () => {
  const [board, setBoard] = useState(initState)
  const [showModal, setShowModal] = useState(false)
  const [savedId, setSavedId] = useState(null)
  const [member, setMember] = useState("")

  const navigate = useNavigate()

  const handleChangeBoard = (e) => {
    const { name, value } = e.target
    setBoard((prevBoard) => ({ ...prevBoard, [name]: value }))
  }

  const handleClickCreate = () => {
    if (!member || !member.id) {
      console.error("회원 정보가 없습니다. 게시글을 저장할 수 없습니다.")
      return
    }

    const newBoard = {
      ...board,
      author: member.name || "Unknown",
      memberId: member.id || 0
    }

    postAddNewBoard(newBoard)
      .then((data) => {
        console.log("저장된 ID:", data.id)
        setSavedId(data.id);
        setShowModal(true);
      })
      .catch((error) => {
        console.error("저장 중 오류 발생:", error)
      })
  }

  const handleModalClose = () => {
    setShowModal(false)
    navigate(`/board/${board.category}`) // 카테고리 페이지로 이동
  }

  useEffect(() => {
    const storedMember = localStorage.getItem("member")
    if (storedMember) {
      try {
        const parsedMember = JSON.parse(storedMember)
        setMember(parsedMember)
        setBoard((prev) => ({
          ...prev,
          memberId: parsedMember.id,
          author: parsedMember.name
        }));
        console.log("Member 초기화 완료:", parsedMember)
      } catch (error) {
        console.error("로컬 스토리지에서 member 파싱 실패:", error)
      }
    } else {
      console.warn("로컬 스토리지에 member 정보가 없습니다.")
      setMember({ id: 56, name: "내가관리자다" })
    }
  }, []);

  return (
    <>
      <Container style={{ fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244"}}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="ms-3 fw-bold">TITLE</Form.Label>
            <Form.Control type="text" name="title" placeholder="타이틀 입력" onChange={handleChangeBoard} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="ms-3 fw-bold">WRITTER</Form.Label>
            <Form.Control type="text" name="author" placeholder={member.name} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="ms-3 fw-bold">CATEGORY</Form.Label>
            <Form.Select name="category" value={board.category} onChange={handleChangeBoard} >
              <option value="" disabled>Choose...</option>
              <option value="notice">공지사항</option>
              <option value="faq">FAQ</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="ms-3 fw-bold">CONTENT</Form.Label>
            <Form.Control as="textarea" name="content" rows={5} onChange={handleChangeBoard} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="ms-3 fw-bold">CREATE DATE</Form.Label>
            <Form.Control type="date" name="createdAt" />
          </Form.Group>
        </Form>
        <div className="mt-3 d-flex justify-content-end">
          <Button variant="outline-secondary" type="button" onClick={handleClickCreate}>저장</Button>
        </div>
      </Container>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>게시글 저장 완료</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>게시글이 성공적으로 저장되었습니다.</p>
          <p><strong>저장된 ID:</strong> {savedId}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>확인</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BoardCreateComponent;