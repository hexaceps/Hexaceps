import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { API_SERVER_HOST } from '../../api/qnaApi'; 
import { API_SERVER_HOST } from '../../serverEnv'

const MemberEmailPage = () => {
  const [emails, setEmails] = useState([]); 

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
      {emails.filter(email => email !== 'admin@hexa.com').map((email, index) => (
        <div key={index} className='my-3'>{email}</div>
        ))}
    </>
  );
};

export default MemberEmailPage;
