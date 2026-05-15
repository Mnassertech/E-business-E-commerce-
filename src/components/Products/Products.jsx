import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ProductItem from "../Shared/ProductItem/ProductItem";
import Loader from "../Shared/Loader/Loader";
import { cartContext } from "../../Context/cartContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import idontknow from "../../assets/images/Shrug-Kaomoji.png"
import "react-toastify/dist/ReactToastify.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const { addToCart } = useContext(cartContext);

  async function getProducts() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      console.log(data);
      setProducts(data.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function addProductsToCart(id) {
    let data = await addToCart(id);
    console.log(data);
    if (data.status === "success") {
      toast.success("🎉 Success! Your item is in the cart.", {
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

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container p-4 mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-[#08AC0A] focus:border-[#08AC0A] block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#08AC0A] dark:focus:border-[#08AC0A]"
        /> 
      </div>

      {products.length === 0 ? (
        <Loader />
      ) : filteredProducts.length > 0 ? (
        <div className="main-layout gap-y-3">
          {filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              addProductsToCart={addProductsToCart}
              product={product}
            />
          ))}
        </div>
      ) : (
        <>
        <img src={idontknow} className="flex justify-self-center w-[400px]" alt="" />
        <p className="mt-10 text-center">No products found.</p>
        </>
      )}

      <ToastContainer />
    </>
  );
}
