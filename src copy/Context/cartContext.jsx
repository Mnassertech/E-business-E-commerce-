import React, { createContext, useContext, useEffect, useState } from "react";
import { tokenContext } from "./tokenContext";
import axios from "axios";

export let cartContext = createContext();

export default function CartContextProvider({ children }) {
  const { token } = useContext(tokenContext);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartDetails, setCartDetails] = useState(null);
  const [cartId, setCartId] = useState("");

  const API_URL = `https://ecommerce.routemisr.com/api/v1/cart`;
  const ORDER_URL = `https://ecommerce.routemisr.com/api/v1/orders/`;
  const headers = { token };

  useEffect(() => {
    token && getCart();
  }, [token]);

  async function addToCart(productId) {
    try {
      const { data } = await axios.post(API_URL, { productId }, { headers });
      console.log(data);
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        await getCart();
      }
      return data;
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  async function getCart() {
    try {
      const { data } = await axios.get(API_URL, { headers });
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        setCartId(data.cartId);
        setCartDetails(data);
      }

    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  async function removeProduct(id) {
    try {
      const { data } = await axios.delete(`${API_URL}/${id}`, { headers });

      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        setCartDetails(data);
      }
      return data;
    } catch (error) {
      console.error("Error removing product:", error);
    }
  }

  async function updateCount(id, count) {
    try {
      const { data } = await axios.put(
        `${API_URL}/${id}`,
        { count },
        { headers }
      );
      console.log(data);
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        setCartDetails(data);
      }
      return data;
    } catch (error) {
      console.error("Error updating count:", error);
    }
  }

  async function cashOnDelivery(shippingAddress) {
    const { data } = await axios.post(
      `${ORDER_URL}/${cartId}`,
      { shippingAddress },
      { headers }
    );
    if (data.status === "success") {
      getCart();
    }

    return data;
  }

  
  async function onlinePayment(shippingAddress) {
    const { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
      { shippingAddress },
      { headers }
    );
    // if (data.status === "success") {
    //   getCart();
    // }

    return data;
  }
  // 
  async function getUserOrders(userId) {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
    // if (data.status === "success") {
    //   getCart();
    // }
    return data;
  }

  
  return (
    <cartContext.Provider
      value={{
        numOfCartItems,
        setNumOfCartItems,
        addToCart,
        getCart,
        cartDetails,
        removeProduct,
        updateCount,
        cashOnDelivery,
        onlinePayment,
        getUserOrders
      }}
    >
      {children}
    </cartContext.Provider>
  );
}