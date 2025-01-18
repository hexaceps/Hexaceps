import React, { useState, useEffect } from "react"
import { Table, Row, Container } from "react-bootstrap"
import useCustomLogin from '../../hooks/useCustomLogin';
import { getAllOrders } from '../../api/paymentApi'
import { getOneMember } from '../../api/memberApi';
import FetchingModal from '../common/FetchingModal'
import { adminAccount } from "../../adminEnv";

const initState = {
    paymentId : 0,
    paymentNumber : "20250116-140951_000000_BRAND_0000",
    paymentType : null,
    paymentVender : null,
    paymentDate : null,
    paymentStatus : null,
    memberId : 0,
    name : null,
    email : null,
    phoneNumber : "010123456",
    address : "(33471) 충남 보령시 주공로 4 (명천동) 헥세캡스 물류센터",
    productId : 1,
    productName : null,
    productBrand : null,
    size : 0,
    price : 0,
    productImage : null,
    orderId : 0,
    productQuantity : 0,
    productPrice : 0,
    totalPrice : 0,
    transferNumber : null
  }

const dateFormatted = (dateString) => {
    if (!dateString) return "1970-01-01 00:00:00";
    const date = new Date(dateString);
    const pad = (n) => (n < 10 ? `0${n}` : n)
    const yyyy = date.getFullYear()
    const MM = pad(date.getMonth() + 1)
    const dd = pad(date.getDate())
    return `${yyyy}-${MM}-${dd}`
  }

const AdminPaymentComponent = () => {

  const [member, setMember] = useState("")
  const [payment, setPayment] = useState(initState)
  const [fetching, setFetching] = useState(false)
  const { loginState } = useCustomLogin()

  useEffect(() => {
    console.log("결제 데이터 API를 호출 합니다")
    const fetchData = async () => {
        const data = await getAllOrders()
        setPayment(data)
        console.log("API 호출 결제 이력 데이터 : ", data)
    } 
    fetchData()
  }, [])

  useEffect(() => {
      setFetching(true)
      console.log("useEffect 에서 화면 진입시 회원정보를 가져오고 댓글 창을 관리할 관리자 모드를 확인 합니다")
      if (loginState.email) {
        getOneMember(loginState.email).then(data => {
          setMember(data)
          localStorage.setItem('member', JSON.stringify(data))
          console.log("사용자 정보 확인 : ", member)
          setFetching(false)
        })
      }
    }, [loginState])


  return (
    <>
        {fetching ? <FetchingModal /> : <></>}
        <Row>
            <h4 className="text-center">고객 결제 데이터</h4>
        </Row>
        <Table hover className='mt-3' style={{borderBottom : "1px solid #625244", fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244"}}>
            <thead>
                <tr>
                    <th>NO</th>
                    <th>Payment Number</th>
                    <th>Type</th>
                    <th>Vendor</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total Price</th>
                    <th>Member Name</th>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Size</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {payment.length > 0 && member.email === adminAccount ? (
                payment.map((payment, index) => (
                <tr key={payment.paymentId} style={{ fontSize : "0.8rem" }}>
                    <td>{index + 1}</td>
                    <td>{payment.paymentNumber}</td>
                    <td>{payment.paymentType}</td>
                    <td>{payment.paymentVender}</td>
                    <td>{new Date(payment.paymentDate).toLocaleString()}</td>
                    <td>{payment.paymentStatus}</td>
                    <td>{payment.totalPrice.toLocaleString()} 원</td>
                    <td>{payment.name}</td>
                    <td>{payment.productName}</td>
                    <td>{payment.productBrand}</td>
                    <td>{payment.size}</td>
                    <td>{payment.productQuantity}</td>
                </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="12" className="text-secondary text-center bold">
                    <h2>아직 등록된 결제 내역이 없습니다</h2>
                    </td>
                </tr>
                )}
            </tbody>
        </Table>
    </>
  )
}

export default AdminPaymentComponent