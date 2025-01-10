import React, { useState } from "react";

const PaymentProcess = ({ orderId }) => {
  const [step, setStep] = useState(1); // 1: Select Method, 2: Select Vendor, 3: Loading, 4: Result
  const [method, setMethod] = useState(""); // Payment method: 카드, 계좌이체, QR
  const [vendor, setVendor] = useState(""); // Payment vendor
  const [response, setResponse] = useState(null); // API response
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

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
      {step === 1 && (
        <div className="modal">
          <h2>결제 방법을 선택하세요</h2>
          <button onClick={() => handleMethodSelect("카드")}>카드 결제</button>
          <button onClick={() => handleMethodSelect("계좌이체")}>계좌이체</button>
          <button onClick={() => handleMethodSelect("QR")}>QR 결제</button>
        </div>
      )}

      {step === 2 && (
        <div className="modal">
          <h2>{method} 세부 옵션을 선택하세요</h2>
          {method === "카드" && (
            <>
              <button onClick={() => handleVendorSelect("VISA")}>VISA</button>
              <button onClick={() => handleVendorSelect("MASTER")}>MASTER</button>
              <button onClick={() => handleVendorSelect("AMEX")}>AMEX</button>
            </>
          )}
          {method === "계좌이체" && (
            <>
              <button onClick={() => handleVendorSelect("우리은행")}>우리은행</button>
              <button onClick={() => handleVendorSelect("신한은행")}>신한은행</button>
              <button onClick={() => handleVendorSelect("농협")}>농협</button>
            </>
          )}
          {method === "QR" && (
            <>
              <button onClick={() => handleVendorSelect("카카오송금")}>
                카카오 송금
              </button>
            </>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="modal">
          <h2>결제 처리 중...</h2>
          {loading && <p>잠시만 기다려 주세요.</p>}
        </div>
      )}

      {step === 4 && (
        <div className="modal">
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
          <button onClick={resetProcess}>다시 결제하기</button>
        </div>
      )}
    </div>
  );
};

export default PaymentProcess;
