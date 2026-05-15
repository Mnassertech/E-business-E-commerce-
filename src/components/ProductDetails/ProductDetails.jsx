import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProducts from "./components/RelatedProducts/RelatedProducts";
import Slider from "react-slick";
import { cartContext } from "../../Context/cartContext";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  let { addToCart } = useContext(cartContext);
  let { id, categoryId } = useParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function addProductsToCart(id) {
    setLoading(true);
    let data = await addToCart(id);
    setLoading(false);
    if (data.status === "success") {
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

  async function getProductDetails() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  return (
    <>
      <div className="flex flex-col items-center justify-around p-6 bg-white rounded-lg shadow-lg lg:flex-row lg:p-10 main-layout">
        <div className="w-full py-3 lg:w-1/3">
          <Slider {...settings} className="overflow-hidden rounded-lg shadow-md">
            {productDetails?.images.map((src, index) => (
              <img 
                key={index} 
                src={src} 
                alt="product" 
                className="w-full h-64 md:h-[400px] object-cover rounded-md" 
              />
            ))}
          </Slider>
        </div>

        <div className="w-full p-5 lg:w-1/2">
          <h1 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">{productDetails?.title}</h1>
          <p className="mb-3 text-base text-gray-600 md:text-lg">{productDetails?.description.split(" ").splice(0, 5).join(" ")}</p>
          <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">{productDetails?.category?.name}</span>
          
          <div className="flex flex-col items-start justify-between mt-4 text-lg font-semibold sm:flex-row sm:items-center">
            <p className="mb-3 text-gray-700 sm:mb-0">{productDetails?.price} EGP</p>
            <p className="flex items-center text-yellow-500">
              <i className="mr-1 fa fa-star"></i>
              {productDetails?.ratingsAverage}
            </p>
          </div>
          
          <button 
            onClick={() => addProductsToCart(productDetails.id)} 
            className="w-full py-3 mt-4 text-white transition duration-300 bg-[#08AC0A] rounded-md shadow-md hover:bg-[#216b12]"
            disabled={loading}
          >
            {loading ? 'Adding to Cart...' : 'Add to Cart'}
          </button>
        </div>
      </div>

      <h2 className="px-3 text-2xl font-bold text-gray-800 md:text-3xl py-7">Related Products</h2>
      <RelatedProducts categoryId={categoryId} />
    </>
  );
}