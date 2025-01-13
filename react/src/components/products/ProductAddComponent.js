import React, { useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { productPostAdd } from '../../api/productsApi';
import FetchingModal from '../common/FetchingModal';
import ResultModal from '../common/ResultModal'
import useCustomMove from '../../hooks/useCustomMove';



const initState = {
    productId:0,
    productName:'',
    productBrand:'',
    productDescription:'',
    price:0,
    productStock:0,
    files: []
}



const ProductAddComponent = () => {
    const [product, setProduct]= useState(initState);

    //첨부파일데이터에 사용 : 리렌더링과 무관하게 유지해야 하는 데이터에 사용
    const uploadRef = useRef()

    //API서버호출시 fetching상태 true, 데이터를 가져오면 false
    const [fetching, setFetching] = useState(false);

    //결과 데이터가 있으면 resultModal을 보여준다.
    const [result, setResult] = useState(null)

    //모달창에서 확인을 클릭하면 목록페이지로 이동
    const { moveToList } = useCustomMove()

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value
        setProduct({ ...product })
    }

    const handleClickAdd = (e) => {
        console.log(product)

        //첨부파일데이터 처리
        const files = uploadRef.current.files;

        const formData = new FormData()

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i])
        }




        //그외 데이터처리
        formData.append("productName", product.productName)
        formData.append("productBrand", product.productBrand)
        formData.append("productDescription", product.productDescription)
        formData.append("price", product.price)
        formData.append("productStock", product.productStock)
        console.log(formData)
        setFetching(true)

        productPostAdd(formData).then(data => {
            setFetching(false)
            setResult(data.result)
        })

    }

    const closeModal = () => {
        setResult(null)
        moveToList({page : 1})
    }

  return (
    <>
        {fetching ? <FetchingModal /> : <></>}
        {result? <ResultModal title={'상품등록'} content={`${result}번 등록완료`} callbackFn={closeModal}/> : <></>}
        <Form.Group className="mb-3" controlId="pnameForm.ControlInput1">
            <Form.Label>상품명</Form.Label>
            <Form.Control
                type="text"
                name="productName"
                placeholder="상품명을 입력하세요"
                value={product.productName}
                onChange={handleChangeProduct}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pnameForm.ControlInput1">
            <Form.Label>브랜드명</Form.Label>
            <Form.Control
                type="text"
                name="productBrand"
                placeholder="브랜드를 입력하세요"
                value={product.productBrand}
                onChange={handleChangeProduct}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pnameForm.ControlInput1">
            <Form.Label>가격</Form.Label>
            <Form.Control
                type="text"
                name="price"
                placeholder="가격을 입력하세요"
                value={product.price}
                onChange={handleChangeProduct}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pdescForm.ControlTextarea1">
            <Form.Label>상품 상세 설명</Form.Label>
            <Form.Control
                as="textarea"
                rows={4}
                name="productDescription"
                value={product.productDescription}
                onChange={handleChangeProduct}
            >
                {product.pdesc}
            </Form.Control>
        </Form.Group>
            <Form.Select aria-label="productStock"
                            value={product.productStock}
                            name='productStock'
                            onChange={handleChangeProduct}
                        >
                            <option value={false} >사용</option>
                            <option value={true} selected>삭제</option>
                        </Form.Select>
        <Form.Group className="mb-3" controlId="formFileMultiple">
            <Form.Label>첨부이미지</Form.Label>
            <Form.Control
                type="file"
                name="files"
                ref={uploadRef}
                multiple
            />
        </Form.Group>
        <Button variant="primary" type="button" onClick={handleClickAdd}>
                Submit
        </Button>
    </>
  )
}

export default ProductAddComponent


