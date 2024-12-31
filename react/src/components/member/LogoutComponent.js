import React, {useState} from 'react'
import { Container,Button } from 'react-bootstrap'
import  useCustomLogin from '../../hooks/useCustomLogin'


const LogoutComponent = () => {
   const {doLogout,moveToPath } = useCustomLogin()


   const handleClickLogout = () => {
    
     doLogout() 
    moveToPath('/')

   }
    
  return (
    <>

    <Container className='d-flex justify-content-center my-5'>
        <div className='border w-50 p-5 mx-auto my-5 text-center '>
        <div className='mb-5'>LogoutComponent</div>
        <div >
                <Button variant="warning " type="button"  onClick={handleClickLogout}>
                                logout
                </Button>
        </div>
    </div>
    </Container>
    </>
  )
}

export default LogoutComponent