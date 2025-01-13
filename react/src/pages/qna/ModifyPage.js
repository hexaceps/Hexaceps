import React from 'react'
import ModifyComponent from '../../components/qna/ModifyComponent'
import { useParams} from 'react-router-dom'

const ModifyPage = () => {
   const {qno }= useParams()
  return (
    <>
      <div className='mb-5'>ModifyPage</div>
      <ModifyComponent  qno={qno}/>
    </>
  )
}

export default ModifyPage