import React ,{useEffect, useState } from 'react'
import { Image} from 'react-bootstrap';
import { productGetOne } from '../../api/productsApi';
import { API_SERVER_HOST } from '../../api/qnaApi';

const initState = {
  pno:0,
  pname:'',
  pdesc:'',
  price:0,  
  delFlag:false,
  uploadFileNames: []

}

const ProductSubdesc = ({pno}) => {
  const[product,setProduct] = useState(initState);
    const host = API_SERVER_HOST;

    useEffect(()=>{
        productGetOne(pno).then(data => {
            console.log(data)
            setProduct(data)
        })
    },[pno])

  return (
    <>
    <div>
            <p>상세이미지보기</p>
            {product.uploadFileNames.map((ImgFile, i)=>
             <Image src={`${host}/api/products/view/${ImgFile}`}  fluid/>)}
        </div>
    </>
  )
}

export default ProductSubdesc