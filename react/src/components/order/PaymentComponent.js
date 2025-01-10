import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

const PaymentComponent = ({ orderId }) => {
  const [step, setStep] = useState(1); // 1: Select Method, 2: Select Vendor, 3: Loading, 4: Result
  const [method, setMethod] = useState(""); // Payment method: 카드, 계좌이체, QR
  const [vendor, setVendor] = useState(""); // Payment vendor
  const [response, setResponse] = useState(null); // API response
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showModal, setShowModal] = useState(false); // 모달 상태 관리

  const handleMethodSelect = (selectedMethod) => {
    setMethod(selectedMethod);
    setStep(2); // Go to vendor selection
  };

  const handleVendorSelect = async (selectedVendor) => {
    setVendor(selectedVendor);
    setStep(3); // Go to loading

    // Create requestBody
    const requestBody = {
      orderId,
      paymentType: selectedVendor,
      paymentVender: method,
    };

    try {
      setLoading(true);
      setError(null);
      // Simulate API call
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        setResponse(data);
        setStep(4); // Go to result
      } else {
        throw new Error(data.message || "결제 실패");
      }
    } catch (err) {
      setError(err.message);
      setStep(4); // Show error modal
    } finally {
      setLoading(false);
    }
  };

  const resetProcess = () => {
    setStep(1);
    setMethod("");
    setVendor("");
    setResponse(null);
    setError(null);
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        결제 시작
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>결제 진행</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {step === 1 && (
            <>
              <h2>결제 방법을 선택하세요</h2>
              <Button variant="secondary" onClick={() => handleMethodSelect("카드")} className="mb-2">
                카드 결제
              </Button>
              <Button variant="secondary" onClick={() => handleMethodSelect("계좌이체")} className="mb-2">
                계좌이체
              </Button>
              <Button variant="secondary" onClick={() => handleMethodSelect("QR")} className="mb-2">
                QR 결제
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <h2>{method} 세부 옵션을 선택하세요</h2>
              {method === "카드" && (
                <>
                  <Button variant="secondary" onClick={() => handleVendorSelect("VISA")}>VISA</Button>
                  <Button variant="secondary" onClick={() => handleVendorSelect("MASTER")}>MASTER</Button>
                  <Button variant="secondary" onClick={() => handleVendorSelect("AMEX")}>AMEX</Button>
                </>
              )}
              {method === "계좌이체" && (
                <>
                  <Button variant="secondary" onClick={() => handleVendorSelect("우리은행")}>우리은행</Button>
                  <Button variant="secondary" onClick={() => handleVendorSelect("신한은행")}>신한은행</Button>
                  <Button variant="secondary" onClick={() => handleVendorSelect("농협")}>농협</Button>
                </>
              )}
              {method === "QR" && (
                <Button variant="secondary" onClick={() => handleVendorSelect("카카오송금")}>
                  카카오 송금
                </Button>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <h2>결제 처리 중...</h2>
              {loading && <Spinner animation="border" />}
            </>
          )}

          {step === 4 && (
            <>
              {response ? (
                <>
                  <h2>결제 완료</h2>
                  <p>결제 번호: {response.paymentNumber}</p>
                  <p>결제 상태: {response.paymentStatus}</p>
                </>
              ) : (
                <>
                  <h2>결제 실패</h2>
                  <p>에러 메시지: {error}</p>
                </>
              )}
              <Button variant="primary" onClick={resetProcess}>다시 결제하기</Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentComponent;
