import React from 'react'
import { useParams} from 'react-router-dom'
import ProductReadComponent from '../../components/products/ProductReadComponent'


const ProductReadPage = () => {
    const {pno} = useParams()
  return (
    <>
    <div>ProductReadPage {pno} 번</div>
    <ProductReadComponent pno={pno}/>
    </>
  )
}

export default ProductReadPage