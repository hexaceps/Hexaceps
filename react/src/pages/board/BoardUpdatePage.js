import React from 'react'
import { useParams } from 'react-router-dom';
import BoardUpdateComponent from '../../components/board/BoardUpdateComponent'

const BoardUpdatePage = () => {
  const { board_id } = useParams()
  return (
    <>
      <BoardUpdateComponent board_id = {board_id}/>
    </>
  )
}

export default BoardUpdatePage