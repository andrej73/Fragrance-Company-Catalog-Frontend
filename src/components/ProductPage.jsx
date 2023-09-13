import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import { ProductContext } from '../ProductContext';

function ProductDetailPage() {
  const { productId } = useParams()
  const products = useContext(ProductContext)
  const selectedProduct = products.find((product) => product.id === parseInt(productId))

  if (!selectedProduct) {
    return <p>Product not found</p>
  }

  return (
    <div>
      <ProductDetail product={selectedProduct} />
    </div>
  )
}

export default ProductDetailPage;
