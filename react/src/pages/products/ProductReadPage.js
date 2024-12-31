import React from 'react'
import { useParams} from 'react-router-dom'
import ProductReadComponent from '../../components/products/ProductReadComponent'


const ProductReadPage = () => {
    const {productId} = useParams()
  return (
    <>
    <div>ProductReadPage {productId} 번</div>
    <ProductReadComponent productId={productId}/>
    </>
  )
}

export default ProductReadPage