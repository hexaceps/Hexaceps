import React from 'react'
import BoardReadComponent from '../../components/board/BoardReadComponent'
import { useParams } from 'react-router-dom'

const BoardDetailPage = () => {
  const { board_id } = useParams() // {} 처리해야 객체가 아닌 문자열 형태로 가져옴
  console.log("BoardDetailPage 에서 useParams", board_id)
  return (
    <>
        <BoardReadComponent board_id={ board_id } />
    </>
  )
}

export default BoardDetailPage