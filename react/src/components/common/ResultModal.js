import React from 'react'
import { Button, Modal} from 'react-bootstrap'

const ResultModal = ({title, content, callbackFn}) => {
  return (
    <Modal show>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => {
                if(callbackFn){
                    callbackFn()
                }
            }}>
            CloseModal
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ResultModal