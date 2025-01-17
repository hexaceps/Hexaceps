import React, { useEffect, useState } from 'react'
import { Container, Form, Button, Modal } from 'react-bootstrap'
import { getCategoryBoardDetailById, updateBoardById } from '../../api/boardApi'
import { useNavigate } from 'react-router-dom'

const initState = {
  id: 0,
  category: "",
  title: "",
  content: "",
  author: "",
  createdAt: null,
  updatedAt: null,
  count: 0,
  isActive: false
}

const BoardUpdateComponent = ({ board_id }) => {
  const [board, setBoard] = useState(initState)
  const [showModal, setShowModal] = useState(false)
  const [savedId, setSavedId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => { // 게시글 가지고 오기
    getCategoryBoardDetailById(board_id).then((data) => {
      setBoard(data);
    });
  }, [board_id]);

  const handleChangeBoard = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    // if (name === "updatedAt") {
    //   const now = new Date();
    //   const currentTime = now.toTimeString().split(" ")[0]; // HH:mm:ss
    //   formattedValue = `${value}T${currentTime}`;
    // }
    setBoard((prevBoard) => ({ ...prevBoard, [name]: formattedValue }));
  };

  const handleClickUpdate = () => {
    const updatedBoard = { ...board }
    console.log("수정 요청 본문 : ", updatedBoard)
    updateBoardById(updatedBoard).then((data) => {
      console.log("BoardUpdateComponent 에서 react Ajax 요청");
      console.log("수정 된 ID : ", data.id);
      setSavedId(data.id)
      setShowModal(true)
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate(`/board/${board.category}`); // 수정 완료 후 카테고리 페이지로 이동
  };

  return (
    <>
      <Container style={{ fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244"}}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="ms-3 fw-bold">TITLE</Form.Label>
            <Form.Control type="text" name="title" value={board.title} placeholder="타이틀 입력" onChange={handleChangeBoard} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="ms-3 fw-bold">WRITTER</Form.Label>
            <Form.Control type="text" name="author" value={board.author} placeholder="작성자" readOnly />
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
            <Form.Control as="textarea" name="content" rows={5} value={board.content} onChange={handleChangeBoard} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="ms-3 fw-bold">CREATE DATE</Form.Label>
            <Form.Control type="date" name="createdAt" value={board.createdAt ? board.createdAt.split("T")[0] : ""} onChange={handleChangeBoard} />
          </Form.Group>
        </Form>
        <div className="mt-3 d-flex justify-content-end">
          <Button variant="outline-secondary" type="button" onClick={handleClickUpdate}>수정</Button>
        </div>
      </Container>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>게시글 수정 완료</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>게시글이 성공적으로 수정되었습니다.</p>
          <p><strong>수정된 ID:</strong> {savedId}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>확인</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BoardUpdateComponent;
