import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Form, Table } from "react-bootstrap";
import { getAllTrackingList, updateTrackingInfo } from "../../api/trackingApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import { adminAccount } from "../../adminEnv";

const initState = {
  id: 0,
  status: null,
  company: null,
  step: null,
  location: null,
};

const AdminTrackingComponent = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [member, setMember] = useState(null);
  const [trackingList, setTrackingList] = useState([]);
  const [newTrace, setNewTrace] = useState(initState); // 배송지 업데이트 정보

  const { loginState } = useCustomLogin();

  useEffect(() => {
    const storedMember = localStorage.getItem("member");
    if (storedMember) {
      const parsedMember = JSON.parse(storedMember);
      setMember(parsedMember);
    }
  }, []);

  useEffect(() => {
    if (member?.email === adminAccount) {
      const fetchTrackingData = async () => {
        try {
          const trackingData = await getAllTrackingList();
          setTrackingList(trackingData);
          console.log("trackingApi 로 부터 전달 받은 리스트 데이터 : ", trackingData);
        } catch (error) {
          console.error("Tracking 정보 수신 도중 에러 발생", error);
        }
      };
      fetchTrackingData();
    }
  }, [member]);

  const handleShowDetails = (item) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedItem(null);
    setNewTrace(initState);
  };

  const handleAddTrace = async () => {
    if (selectedItem) {
      try {
        const newTraceWithId = { ...newTrace, id: selectedItem.id };
  
        await updateTrackingInfo(newTraceWithId);
  
        const updatedItem = { // 업데이트 이후 화면 상태 갱신
          ...selectedItem,
          traceList: [...selectedItem.traceList, newTrace],
        };
  
        setTrackingList((prevList) =>
          prevList.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
        setSelectedItem(updatedItem);
        setNewTrace(initState);
      } catch (error) {
        console.error("배송 정보 추가 실패: ", error);
      }
    }
  };

  return (
    <>
    <h5 className="text-center mt-3">고객배송상태 조회</h5>
      <Container className='ms-3' style={{ fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244"}}>
        <Table hover style={{borderBottom : "1px solid #625244"}}>
        {member?.email === adminAccount && (
            <tbody>
            {trackingList.map((item) => (
                <tr key={item.id}>
                    <td> {item.id} </td>
                    <td> {item.trackingId} </td>
                    <td> 🚚 {item.traceList.at(-1)?.step || "배송상태 N/A"} </td>
                    <td> 📌 {item.traceList.at(-1)?.status || "배송단계 N/A"} </td>
                    <td> {item.traceList.at(-1)?.location || "현재위치 N/A"} </td>
                    <td>
                        <Button variant="outline-success" className="ms-2 btn-sm" onClick={() => handleShowDetails(item)}> 배송조회 </Button>
                    </td>
                    <td> {item.trackingId} </td>
                </tr>
            ))}
            </tbody>
            )}
        </Table>

        {/* 배송조회 모달 처리 */}
        <Modal show={showDetails} onHide={handleCloseDetails} centered size="lg" style={{ fontFamily : "Rowdies, GmarketSansMedium" , color : "#625244"}}>
          <Modal.Body>
            {selectedItem && (
              <>
                <h5>Tracking ID : {selectedItem.trackingId} / 엔티티 : {selectedItem.id}</h5>
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                        <th>NO</th>
                        <th>택배사</th>
                        <th>배송단계(택배사)</th>
                        <th>현재위치</th>
                        <th>배송상태</th>
                        <th>처리시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItem.traceList.map((trace) => (
                      <tr key={trace.traceId}>
                        <td>{trace.id}</td>
                        <td>{trace.company}</td>
                        <td>{trace.step}</td>
                        <td>{trace.location}</td>
                        <td>{trace.status}</td>
                        <td>{trace.updateDate ? new Date(trace.updateDate).toLocaleString() : "날짜 정보 없음"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Form className="mt-4">
                  <h5>배송 정보 추가</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>배송회사</Form.Label>
                    <Form.Control type="text" value={newTrace.company} placeholder="DHL, FEDEX, UPS, 한진택배, 대한통운, 로젠택배, 우체국택배"
                      onChange={(e) => setNewTrace({ ...newTrace, company: e.target.value })} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>단계 <span style={{fontSize : "0.8rem", color : "red"}}>(Step 상태가 "배송완료"가 되어야 리뷰 작성이 가능합니다)</span></Form.Label>
                    <Form.Control type="text" value={newTrace.step} placeholder="송장확인, 택배인수, 택배사이동, 간선상차, 물류허브, 간선하차, 배송지도착, 배송완료"
                      onChange={(e) => setNewTrace({ ...newTrace, step: e.target.value })} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>상태</Form.Label>
                    <Form.Control type="text" value={newTrace.status} placeholder="배송확인중, 수화물접수, 택배사이동중, 배송중, 고객전달완료, 고객확인완료"
                      onChange={(e) => setNewTrace({ ...newTrace, status: e.target.value })} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>위치</Form.Label>
                    <Form.Control type="text" value={newTrace.location}
                      onChange={(e) => setNewTrace({ ...newTrace, location: e.target.value })} />
                  </Form.Group>
                  <Button variant="success" onClick={handleAddTrace}>송장업데이트</Button>
                </Form>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails}>닫기</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default AdminTrackingComponent;
