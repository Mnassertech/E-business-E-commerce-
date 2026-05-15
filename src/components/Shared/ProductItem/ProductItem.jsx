import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { tokenContext } from "../../../Context/tokenContext";
import ClipLoader from "react-spinners/ClipLoader";
import { useWishlist } from "../../../Context/wishListContext";

export default function ProductItem(props) {
  const { imageCover, title, category, price, ratingsAverage, id } = props.product;
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const { token } = useContext(tokenContext);

  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistActionLoading, setWishlistActionLoading] = useState(false);

  const isWishlistActive = wishlistItems.some((item) => item._id === id);

  const handleAddToCart = async () => {
    setCartLoading(true);
    try {
      await props.addProductsToCart(id);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setCartLoading(false);
    }
  };

  const handleWishlistClick = async () => {
    setWishlistActionLoading(true);
    try {
      if (isWishlistActive) {
        await removeFromWishlist(id);
      } else {
        await addToWishlist(id);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    } finally {
      setWishlistActionLoading(false);
    }
  };

  return (
    <div className="w-1/2 px-3 mb-3 sm:w-1/4 md:w-1/6">
      <div className="relative p-4 transition-transform duration-300 bg-white rounded-lg shadow-lg product hover:scale-105">
        <div className="absolute right-3 top-3">
          <button
            type="button"
            className={`border shadow-md hover:text-[#08AC0A] focus:ring-4 focus:outline-none font-medium rounded-md text-sm p-2.5 text-center flex items-center justify-center ${
              isWishlistActive ? "text-[#08AC0A] border-[#08AC0A]" : ""
            }`}
            onClick={handleWishlistClick}
            disabled={wishlistActionLoading}
            aria-label="Toggle wishlist"
          >
            {wishlistActionLoading ? (
              <ClipLoader size={15} color="#08AC0A" />
            ) : (
              <i className="text-lg fa fa-heart"></i>
            )}
          </button>
        </div>

        <Link to={`/productDetails/${id}/${category._id}`} className="block text-center">
          <img
            src={imageCover}
            alt={title}
            className="object-cover w-full h-40 mb-3 rounded-md"
          />
          <span className="text-sm text-gray-500">{category.name}</span>
          <h2 className="mb-2 text-lg font-semibold text-gray-800 truncate">
            {title.split(" ").splice(0, 2).join(" ")}
          </h2>
          <div className="flex justify-between text-sm text-gray-600">
            <p className="font-semibold">{price} EGP</p>
            <p className="flex items-center">
              <i className="mr-1 text-yellow-500 fa fa-star"></i>
              {ratingsAverage}
            </p>
          </div>
        </Link>

        <button
          onClick={handleAddToCart}
          className="w-full p-2 text-white font-semibold rounded-md bg-[#08AC0A] mt-3 transition-all duration-300 hover:bg-green-700"
          disabled={cartLoading}
        >
          {cartLoading ? <ClipLoader size={15} color="#fff" /> : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    imageCover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    price: PropTypes.number.isRequired,
    ratingsAverage: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  addProductsToCart: PropTypes.func.isRequired,
};
