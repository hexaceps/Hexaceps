import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { getAllMember, putOneMember } from '../../api/memberApi';
import useCustomLogin from '../../hooks/useCustomLogin';
import { getOneMember } from '../../api/memberApi';
import PageComponent from '../common/PageComponent'
import useCustomMove from '../../hooks/useCustomMove'
import FetchingModal from '../common/FetchingModal'
import { adminAccount } from '../../adminEnv';

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0
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

const AdminMemberComponent = () => {
    const { page, size, moveToList, refresh } = useCustomMove()
    const [currentPage, setCurrentPage] = useState(1)
    const [serverData, setServerData] = useState(initState)
    const [member, setMember] = useState("")
    const { loginState } = useCustomLogin()
    const [fetching, setFetching] = useState(false)
    const [selectedMember, setSelectedMember] = useState(null); // 선택된 멤버
    const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  
    useEffect(() => { // 회원 리스트 가져오는 로직
      setFetching(true)
      console.log("전체 회원 리스트 useEffect 진입")
      const fetchData = async () => {
        console.log("전체 회원 API 리스트 가져오는 중")
        const data = await getAllMember({ pageParam: { page: currentPage, size } })
        setServerData(data)
        setFetching(false)
        console.log(data)
      }
      fetchData()
    }, [currentPage, size, refresh])

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

    const handleResetPassword = async () => {
      if (!selectedMember) return
      try {
        const response = await putOneMember(selectedMember.id, { password: '1234' })
        alert('비밀번호가 초기화되었습니다.')
        setShowModal(false) // 모달 닫기
      } catch (error) {
        console.error(error)
        alert('비밀번호 초기화에 실패했습니다.')
      }
    }
    
    const handleShowModal = (member) => {
      setSelectedMember(member); // 선택된 멤버 저장
      setShowModal(true); // 모달 열기
    };
    
    const handleCloseModal = () => {
      setShowModal(false); // 모달 닫기
    };
  
    return (
      <>
        {fetching ? <FetchingModal /> : <></>}
        <div className='ms-3' style={{ fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244"}}>
          <Table hover className='mt-5' style={{borderBottom : "1px solid #625244"}}>
            <tbody>
              {serverData.dtoList && serverData.dtoList.length > 0 && member.email === adminAccount ? (
                serverData.dtoList.map((memberList) => (
                  <tr key={memberList.id}>
                    <td className='text-center'>{memberList.id}</td>
                    <td >{memberList.name}</td>
                    <td >{memberList.nickName}</td>
                    <td >{dateFormatted(memberList.create_Date)}</td>
                    <td >{memberList.email}</td>
                    <td >{memberList.address}</td>
                    <td >{memberList.phoneNumber}</td>
                    <td >Rank : {memberList.rank}</td>
                    <td >{memberList.newsletter === 0 ? "구독" : "선택안함"}</td>
                    <td>
                    <Button variant='outline-danger' className='btn-sm'
                                onClick={() => handleShowModal(memberList)}>
                            PW Reset
                        </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={"4"} className='text-secondary text-center bold'><h2>아직 등록 된 멤버가 없습니다</h2></td>
                </tr>
              )}
            </tbody>
          </Table>
          <Row>
            <div className='my-5'>
              <PageComponent  serverData={serverData} moveToList={moveToList} currentPage={currentPage} setCurrentPage={setCurrentPage} />    
            </div>
          </Row>
        </div>
        {/* 모달 */}
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>비밀번호 초기화</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>비밀번호를 "1234"로 초기화하시겠습니까?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={handleCloseModal}>취소</Button>
                <Button variant="outline-danger" onClick={handleResetPassword}>확인</Button>
            </Modal.Footer>
        </Modal>
      </>
    )
  }

export default AdminMemberComponent