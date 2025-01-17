import React, { useEffect, useState,useRef } from 'react'
import { Button, Form, Image,Row, Col } from 'react-bootstrap'
import { productDeleteOne, productGetOne, productPutOne  } from '../../api/productsApi'
import useCustomMove from '../../hooks/useCustomMove'
// import { API_SERVER_HOST } from '../../api/qnaApi'
import { API_SERVER_HOST } from '../../serverEnv'
import ResultModal from '../common/ResultModal'
import FetchingModal from '../common/FetchingModal'


const initState = {
    productId:0,
    productName:'',
    productBrand:'',
    productDescription:'',
    price:0,
    uploadFileNames: []
}

const ProductModifyComponent = ({productId}) => {
    const [product, setProduct] = useState({...initState});
    const {moveToList, moveToRead} = useCustomMove();
    const uploadRef = useRef()
    const [fetching, setFetching] = useState(false);
    const [result, setResult] = useState(null)
    const host = API_SERVER_HOST;

    useEffect(()=>{
        setFetching(true)
        productGetOne(productId).then(data => setProduct(data))
        setFetching(false)
    },[productId])

    const deleteOldImage = (imageName) =>{
        //삭제할 이미지이름이 들어오면 filtering한다.
        const resultfileName = product.uploadFileNames.filter(fileName => fileName !== imageName)

        product.uploadFileNames = resultfileName
        setProduct({...product})

    }



    //수정 처리

    const handleChangeproduct = (e) => {
        product[e.target.name] = e.target.value;
        setProduct({...product})
    }


    //수정 완료
    const handleClickModify = () =>{

        //사진 수정
        const files = uploadRef.current.files;
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i])
        }

        //other data
        formData.append("productName", product.productName)
        formData.append("productBrand", product.productBrand)
        formData.append("productDescription", product.productDescription)
        formData.append("productStock", product.productStock)
        formData.append("price", product.price)
        for (let i = 0; i < product.uploadFileNames.length; i++) {
            formData.append("uploadFileNames", product.uploadFileNames[i])
        }

        // fetching
        setFetching(true)
        setResult('Modified')

        productPutOne(productId, formData).then(data => {
            setFetching(false)
         

            console.log("productStock? ", product.productStock)

    
        })
    }

    //삭제하기
     const handleClickDelete = () =>{
        setFetching(true)
        setResult('Deleted')
        productDeleteOne(productId).then(data  => {
      
            setFetching(false)
        })
     }


     
    const closeModal = () => {
        if(result === 'Deleted') {
            moveToList()
        } else if (result === 'Modified') {
            moveToRead(productId)
        }     
    }


  return (


    <>
            {fetching ? <FetchingModal /> : <></>}
            {result ?  <ResultModal title={`${result}`} content={"정상적으로 처리되었습니다."} callbackFn={closeModal}/> : <></>}
<Image className='mx-auto my-5 ' src={`${host}/api/products/view/${product.uploadFileNames[0]}`}  fluid/>

    <Form.Group className="mb-3" controlId="pnoForm.ControlInput1">
            <Form.Label>productId</Form.Label>
            <Form.Control type={"text"} name="productId" value={product.productId} onChange={handleChangeproduct} disabled />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pnameForm.ControlInput1">
            <Form.Label>상품명</Form.Label>
            <Form.Control type={"text"} name="productName" value={product.productName} onChange={handleChangeproduct}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="pdescForm.ControlInput1">
            <Form.Label>상품상세설명</Form.Label>
            <Form.Control type={"text-area"} name="productDescription" value={product.productDescription} onChange={handleChangeproduct}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="priceForm.ControlInput1">
            <Form.Label>브랜드</Form.Label>
            <Form.Control type={"text"} name="productBrand" value={product.productBrand} onChange={handleChangeproduct} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="priceForm.ControlInput1">
            <Form.Label>가격</Form.Label>
            <Form.Control type={"text"} name="price" value={product.price} onChange={handleChangeproduct} />
        </Form.Group>
            <Form.Select aria-label="product_stock"
                    value={product.product_stock}
                    name='product_stock'
                    onChange={handleChangeproduct}
                >
                    <option value={false} >사용</option>
                    <option value={true} selected>삭제</option>
                </Form.Select>
        <Form.Group className="mb-3" controlId="formFileMultiple">
            <Form.Label>첨부이미지</Form.Label>
            <Form.Control type={"file"} name="files" ref={uploadRef}        multiple/>
        </Form.Group>
        <hr />
        <Row>
            {product.uploadFileNames.map((ImgFile, i ) => (
                    <Col md={4}>  <Image className='mx-auto my-5 ' src={`${host}/api/products/view/${ImgFile}`}  fluid/>        
                    <Button variant="danger" onClick={()=> deleteOldImage(ImgFile)} disabled={product.uploadFileNames.length === 1}>삭제</Button> </Col>
  )  )}
        </Row>
      
        <div className='mt-3 text-end'>
            <Button variant="primary" className='me-3' onClick={handleClickModify}>수정</Button>
            <Button variant="danger" className='me-3'  onClick={handleClickDelete}>삭제</Button>
            <Button variant="secondary" onClick={() => moveToList()}>목록보기</Button>
        </div>

    </>
  )
}

export default ProductModifyComponent

