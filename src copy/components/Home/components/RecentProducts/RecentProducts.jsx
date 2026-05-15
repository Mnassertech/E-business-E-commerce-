import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ProductItem from "../../../Shared/ProductItem/ProductItem";
import Loader from "../../../Shared/Loader/Loader";
import { cartContext } from "../../../../Context/cartContext";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  let {addToCart}=useContext(cartContext)
  
  async function getProducts() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      setProducts(data.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function addProductsToCart(id){
     let data= await addToCart(id)
     console.log(data)
     if(data.status==="success"){
      toast.success('🎉 Success! Your item is in the cart.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
     }
  }


  
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {products.length != 0 && (
        <div className="main-layout gap-y-3">
          {products.map((product) => (
            <ProductItem key={product.id} addProductsToCart={addProductsToCart} product={product} />
          ))}
        </div>
      )}
      {products.length == 0 && <Loader />}
    </>
  );
}
