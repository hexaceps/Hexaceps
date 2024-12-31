import React, { useEffect, useState } from 'react';
import ListComponent from '../qna/ListComponent';
import { Container } from 'react-bootstrap';
import { getOne } from '../../api/qnaApi';

const ProductSubQna = ({ pno,id, setSelectedQna, moveToRead, selectedQna }) => {
  const [qnaList, setQnaList] = useState([]);  // Q&A 리스트 상태

  const fetchQnaList = async () => {
    try {
        const response = await fetch(`/api/qna/list/${pno}`);
        const data = await response.json();
        setQnaList(data);
    } catch (error) {
        console.error('Q&A 리스트 로드 실패:', error);
    }
};
  // 처음 로드될 때 Q&A 리스트 가져오기
  useEffect(() => {
    fetchQnaList();
}, [pno]);

const handleQnaClick = async (qno) => {
  try {
      const response = await getOne(qno);  // qno로 Q&A 상세 정보 가져오기
      setSelectedQna(response);  // 선택된 Q&A 상태 업데이트
  } catch (error) {
      console.error('Q&A 정보 로드 실패:', error);
  }
};

  return (
    <>
      <Container>
      <ListComponent pno={pno} id={id} setSelectedQna={setSelectedQna} moveToRead={moveToRead} selectedQna={selectedQna} />
      </Container>
    </>
  );
};


export default ProductSubQna;
