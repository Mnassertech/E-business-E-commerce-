import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { tokenContext } from "./tokenContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { token } = useContext(tokenContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";
  const headers = { token };

  // Fetch wishlist items
  const getWishlist = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.get(API_URL, { headers });
      if (data.status === "success") {
        setWishlistItems(data.data);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add product to wishlist
  const addToWishlist = async (productId) => {
    try {
      const { data } = await axios.post(API_URL, { productId }, { headers });
      if (data.status === "success") {
        getWishlist();
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const removeUrl = `${API_URL}/${productId}`;
      const { data } = await axios.delete(removeUrl, { headers });
      if (data.status === "success") {
        setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  // Load wishlist on token change
  useEffect(() => {
    if (token) getWishlist();
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, loading, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
