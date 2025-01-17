import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useCustomLogin from '../../hooks/useCustomLogin';
// import { API_SERVER_HOST } from '../../api/qnaApi'; 
import { API_SERVER_HOST } from '../../serverEnv';

const MemberEmailPage = () => {
  const [emails, setEmails] = useState([]); 
  const {loginState,isLogin,doLogout } = useCustomLogin()

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(`${API_SERVER_HOST}/api/member/emaillist`);
        setEmails(response.data); 
      } catch (err) {
        console.error('Error fetching email list:', err);
      } 
    };

    fetchEmails();
  }, []);
  return (
    <>
    {loginState.email === "admin@hexa.com" ?
    <>
      {emails.map((email, index) => (
        <div key={index} className='my-3'>{email}   </div>
        ))} </>
        :<div className='text-center'><h4>허가받지 않은 사용자 입니다.</h4></div>}
    </>
  );
};

export default MemberEmailPage;
