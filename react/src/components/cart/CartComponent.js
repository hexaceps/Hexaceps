import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CartComponent = ({ cartItems, setCartItems }) => {
  const [selectAll, setSelectAll] = useState(false);

  // 전체 선택/해제
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems((prev) =>
      prev.map((item) => ({
        ...item,
        checked: newSelectAll,
      }))
    );
  };

  // 개별 선택/해제
  const handleItemCheck = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // 선택 상태 동기화
  useEffect(() => {
    const allChecked =
      cartItems.length > 0 && cartItems.every((item) => item.checked);
    const anyChecked =
      cartItems.length > 0 && cartItems.some((item) => item.checked);

    setSelectAll(allChecked && anyChecked);
  }, [cartItems]);

  // 수량 변경 (+/-)
  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // 개별 상품 삭제
  const handleDelete = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 선택된 상품 삭제
  const handleDeleteSelected = () => {
    setCartItems((prev) => prev.filter((item) => !item.checked));
  };

  // 선택된 상품 계산
  const selectedItems = cartItems.filter((item) => item.checked);
  const totalSelectedPrice = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <input
            type="checkbox"
            id="select-all"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <label htmlFor="select-all" className="ms-2 m-3">
            전체선택
          </label>
        </div>

        <div className="text-end m-3">
          <p>선택된 상품의 가격 : {totalSelectedPrice.toLocaleString()}원</p>
          <p>
            전체 상품의 가격 :{" "}
            {cartItems
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toLocaleString()}
            원
          </p>
          <p>선택된 상품 개수 : {selectedItems.length}</p>
        </div>
      </div>

      {cartItems.map((item) => (
        <div key={item.id} className="card mb-3">
          <div className="row g-0 align-items-center">
            <div className="col-1">
              <input
                className="m-3"
                type="checkbox"
                checked={item.checked || false}
                onChange={() => handleItemCheck(item.id)}
              />
            </div>
            <div className="col-2">
              <img
                src={item.image}
                alt={item.name}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-4">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">
                  가격: {item.price.toLocaleString()}원
                </p>
              </div>
            </div>
            <div className="col-2">
              <div className="input-group">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  -
                </button>
                <input
                  type="text"
                  className="form-control text-center"
                  value={item.quantity}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-2 text-end">
              <p className="mb-0">
                총액: {(item.price * item.quantity).toLocaleString()}원
              </p>
              <button
                className="btn btn-danger mt-2"
                onClick={() => handleDelete(item.id)}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="text-end mb-3">
        <button className="btn btn-warning m-2">계속 쇼핑하기</button>
        <button
          className="btn btn-danger m-2"
          onClick={handleDeleteSelected}
        >
          선택된 상품 삭제
        </button>
      </div>
    </div>
  );
};

export default CartComponent;
