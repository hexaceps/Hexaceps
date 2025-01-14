import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ListComponent from '../qna/ListComponent';
import { Container } from 'react-bootstrap';
import { getOne } from '../../api/qnaApi';

const ProductSubQna = ({ productId,  setSelectedQna, moveToRead, selectedQna }) => {
  const [qnaList, setQnaList] = useState([]);
  const [member, setMember] = useState(() => {
  const storedMember = localStorage.getItem('member');
    return storedMember ? JSON.parse(storedMember) : null;
  });
 
  useEffect(() => {
    
      fetchQnaList(); // id가 있을 때만 호출a
    
    }, [productId, member]);


  const fetchQnaList = async () => {
    try {
      const response = await fetch(`/api/qna/list/${productId}`);
      const data = await response.json();
      setQnaList(data);
    } catch (error) {
      console.error('Q&A 리스트 로드 실패:', error);
    }
  };


  const handleQnaClick = async (qno) => {
    try {
      const response = await getOne(qno);
      setSelectedQna(response);
    } catch (error) {
      console.error('Q&A 정보 로드 실패:', error);
    }
  };

  return (
    <>    <Container>
      <ListComponent
        productId={productId}
        setSelectedQna={setSelectedQna}
        moveToRead={moveToRead}
        selectedQna={selectedQna}
      />
    </Container>
    </>

  );
};

export default ProductSubQna;
