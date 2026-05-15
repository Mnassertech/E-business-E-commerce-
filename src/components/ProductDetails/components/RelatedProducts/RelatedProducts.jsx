import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductItem from '../../../Shared/ProductItem/ProductItem';

export default function RelatedProducts(props) {

  let {categoryId} =props
  console.log(categoryId)

  const [RelatedProducts, setRelatedProducts] = useState([])

  async function getProducts() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
         console.log(data.data);
         let res=data.data.filter(product=>product.category._id==categoryId)
         console.log(res);
         setRelatedProducts(res)
    } catch (err) {
      console.error(err);
    }
  }
useEffect(() => {
  getProducts()
}, [])

  return (
       <div className="main-layout gap-y-3">
         {RelatedProducts.map(product =><ProductItem key={product.id} product={product} />)}
   
       </div>
  )
}
