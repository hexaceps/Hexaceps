import React from "react";
import { Button, Row } from "react-bootstrap";
import { getGoogleLoginLink } from "../../api/googleApi";
import { FcGoogle } from 'react-icons/fc';

const GoogleLoginComponent = () => {
  const handleLogin = () => {
    window.location.href = getGoogleLoginLink();
  };

  return (
    <>
      <Row className="mt-5">
        <Button 
        style={{backgroundColor: 'white', borderColor: '#EAEAEA', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}
        onClick={handleLogin}>
          <FcGoogle size={20} style={{ marginRight: 'auto', marginLeft: '10px'}} />
          <span style={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold'}}>Google 로그인</span>
        </Button>
      </Row>
    </>
  );
};

export default GoogleLoginComponent;
