import React from 'react'
import { Modal, Spinner } from 'react-bootstrap'

const FetchingModal = () => {
  return (
    <>
        <Modal show>
            <Modal.Header>
                <Modal.Title>데이터를 가져오는 중</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'><Spinner animation="border" /></Modal.Body>
        </Modal>
        </>
  )
}

export default FetchingModal