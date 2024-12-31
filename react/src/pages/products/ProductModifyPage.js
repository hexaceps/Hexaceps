import React from 'react'
import ProductModifyComponent from '../../components/products/ProductModifyComponent'
import { useParams } from 'react-router-dom'

const ProductModifyPage = () => {
  const {productId} = useParams();
  return (
    <>
    <div>ProductModifyPage</div>
    <ProductModifyComponent productId={productId} />
    </>
  )
}

export default ProductModifyPage