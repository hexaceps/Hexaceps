import React from "react";
import { Button, Row } from "react-bootstrap";
import { getGoogleLoginLink } from "../../api/googleApi";
import { FcGoogle } from 'react-icons/fc';
import { GOOGLE_API_KEY } from "../../serverEnv";

const GoogleLoginComponent = () => {
  const doGoogleLoginLinkOn = () => {
        
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_API_KEY}&redirect_uri=https://main--fastidious-toffee-be993e.netlify.app/member/google&response_type=token&scope=email profile`;

}

  return (
    <>
      <Row className="mt-5">
        <Button 
        style={{backgroundColor: 'white', borderColor: '#EAEAEA', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}
        onClick={doGoogleLoginLinkOn}>
          <FcGoogle size={20} style={{ marginRight: 'auto', marginLeft: '10px'}} />
          <span style={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold'}}>Google 로그인</span>
        </Button>
      </Row>
    </>
  );
};

export default GoogleLoginComponent;
