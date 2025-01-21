import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Container, Image } from 'react-bootstrap'
import { FaBeer } from 'react-icons/fa'; // 리액트 아이콘 사용 npm install react-icons --save, https://react-icons.github.io/react-icons/
import { FaTruckFast, FaBuildingShield, FaBasketShopping } from "react-icons/fa6";
import { sendEmailForSubscribe } from '../../api/boardApi'


// 일단 여기에 뉴스레터 신청 post 구현 (나중에 api로 이동)


const AboutUsComponent = () => {
  const [email, setEmail] = useState("")
  const [agree, setAgree] = useState(false)
  const [serverData, setServerData] = useState("")

  const sendEmail = () => {
    sendEmailForSubscribe({ email }).then(data =>{
        setServerData(data)
  })}
  const handleSubmitClick = async (e) => {
    e.preventDefault()
    if(!email || !agree) {
        alert("이메일과 개인정보 수집 동의를 확인해 주세요")
        return
    }
    try {
        const result = sendEmail({ email });
        console.log("뉴스레터 신청 결과는 ? ", serverData.result)
        if (!serverData==="subscribe was done") {
        console.log("serverData 쳌크 " + serverData.result)
    }
    } catch (error) {
        console.error("에러 발생 : ", error)
        alert("뉴스레터 신청 중 문제가 발생했습니다")
    }
    alert("뉴스레터 신청이 완료 되었습니다")
  }
  return (
    <>
        <Container fluid className="mt-5" style={{ fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244"}}> 
            <Row className='text-center mb-4'>
                <Col>
                    <Image src='../images/logo1.jpg' fluid alt='로고' />
                </Col>
                <Col>
                    <h5>HEXACEPS가 만드는 지속가능한 미래</h5>
                    <p>HEXACEPS은 상품을 고객에게 전달하는 모든 과정에서 지속가능성 실현을 위해 노력합니다. HEXACEPS는 고객들의 니즈를 만족시키기위해 언제나 최선을 다하고 있습니다. </p>
                </Col>
            </Row>
            <Row className='text-center mb-5'>
                <Col md={4}>
                    <FaTruckFast style={{ fontSize : "2rem" }} />
                    <h5 className='mt-2'>안전한 배송</h5>
                    <p>실시간 배송 조회를 통하여 언제 어디서든 배송상태를 확인 할 수 있습니다.</p>    
                </Col>
                <Col md={4}>
                    <FaBuildingShield style={{ fontSize : "2rem" }} />
                    <h5 className='mt-2'>정품보장</h5>
                    <p>믿을수 있는 정품판매 사이트만을 소개드리기에 믿고 사실 수 있습니다.</p>    
                </Col>
                <Col md={4}>
                    <FaBasketShopping style={{ fontSize : "2rem" }} />
                    <h5 className='mt-2'>제품 하자 시 교환 </h5>
                    <p>제품에 문제가 있을 시 제품이 교환 혹은 반품 가능한 사이트를 소개드리고 있습니다</p>    
                </Col>
            </Row>
            <Row>
                <Card style={{ backgroundColor : "gray" , opacity : "90%"}}>
                    <div className="text-center">
                        <h5 className='mt-3'>HEXACEPS 뉴스레터 신청</h5>
                        <form onSubmit={handleSubmitClick} className="mt-3">
                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder="sample@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <Row className="form-check mb-3">
                                <Col lg={4}
                                ><input type="checkbox" className="form-check-input" id="agree" checked={agree} onChange={(e) => setAgree(e.target.checked)} /> </Col>
                                <Col lg={4}>
                                    <label className="form-check-label" htmlFor="agree">
                                        개인정보 수집 및 이용 약관에 동의합니다.
                                    </label>
                                </Col>
                            </Row>
                            <button type="submit" className="btn btn-outline-warning mb-3">
                                신청하기
                            </button>
                        </form>
                    </div>

                </Card>
            </Row>
        </Container>
    </>
  )
}

export default AboutUsComponent