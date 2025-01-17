import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { API_SERVER_HOST } from "../../api/qnaApi";
import { API_SERVER_HOST } from '../../serverEnv'
import { useDispatch } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";
import { login } from "../../slice/loginSlice";
import { Modal, Spinner } from "react-bootstrap";

const GoogleRedirectPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { moveToPath, doLogout } = useCustomLogin();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 현재 URL에서 access_token 추출
  const hash = window.location.hash;
  const accessToken = hash.substring(hash.indexOf('=') + 1, hash.indexOf('&'));

  const handleLoginPost = async (accessToken) => {
    const data = { accessToken };

    try {
      const res = await axios.post(`${API_SERVER_HOST}/api/member/google`, data);
      console.log(res);

      const memberInfo = res.data;
      console.log("멤버인포", memberInfo);

      dispatch(login(memberInfo));
      if (memberInfo && memberInfo.socialYn !== 2) {
        moveToPath('/');
      } else {
        moveToPath('/member/modify');
      }
    } catch (error) {
      console.error("로그인 요청 실패:", error);
      setError("로그인에 실패했습니다.");
    } finally {
      setLoading(false); // 항상 로딩 상태 해제
    }
  };

  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      console.log("들고오지?.");
      handleLoginPost(accessToken);
    } else {
      console.log("로그인 재시도하세요.");
      setError("Access token not found.");
      setLoading(false); // 로딩 상태 해제
    }
    // 로그아웃은 사용자가 명시적으로 호출하는 게 더 적절함
  }, [accessToken]); // 의존성 배열 간소화

  return (
    <>
      <Modal show={loading} backdrop="static" keyboard={false}>
        <Modal.Body className="text-center">
          <Spinner animation="border" variant="primary" />
          <div className="mt-3">로그인 중...</div>
        </Modal.Body>
      </Modal>

      {/* 에러가 있을 경우 메시지 표시 */}
      {error && (
        <Modal show={true} backdrop="static" keyboard={false}>
          <Modal.Body className="text-center text-danger">
            <div>{error}</div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default GoogleRedirectPage;
