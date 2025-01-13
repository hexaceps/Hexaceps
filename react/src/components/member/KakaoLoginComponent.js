import React from 'react'
import { Button, Row } from 'react-bootstrap'
import { getKakaoLoginLink } from '../../api/kakaoApi'
import { SiKakaotalk } from 'react-icons/si'

const KakaoLoginComponent = () => {
  
  const getKakaoLoginLinkOn = () => {
    window.location.href = getKakaoLoginLink(); 
    }

  return (
    <>
        <Row className="mt-3">
            <Button 
            style={{backgroundColor: '#fde500', border: '#fde500', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}
            onClick={getKakaoLoginLinkOn}>
            <SiKakaotalk size={20} style={{ marginRight: 'auto', marginLeft: '10px'}} />
            <span style={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>카카오 로그인</span>
            </Button>
        </Row>
    </>
  )
}

export default KakaoLoginComponent