import React, { useContext, useState } from "react";
import { useWishlist } from "../../Context/wishListContext";
import ClipLoader from "react-spinners/ClipLoader";
import { cartContext } from "../../Context/cartContext";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Wishlist() {
  const { wishlistItems, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useContext(cartContext);
  const [actionLoading, setActionLoading] = useState({ id: null, type: null });

  const handleAddToCart = async (productId) => {
    try {
      setActionLoading({ id: productId, type: 'cart' });
      await addToCart(productId);
      toast.success('Item added to cart successfully!');
      await removeFromWishlist(productId);
    } catch (error) {
      toast.error('Failed to add item to cart');
    } finally {
      setActionLoading({ id: null, type: null });
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      setActionLoading({ id: productId, type: 'remove' });
      await removeFromWishlist(productId);
      toast.success('Item removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove item');
    } finally {
      setActionLoading({ id: null, type: null });
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <ClipLoader size={50} color="#08AC0A" />
        </div>
      ) : (
        <div className="space-y-6">
          <h1 className="mb-6 text-3xl font-bold text-gray-800">My Wishlist</h1>
          
          {wishlistItems.length === 0 ? (
            <div className="py-12 text-center rounded-lg bg-gray-50">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h2 className="mt-4 text-2xl font-semibold text-gray-700">
                Your wishlist is empty
              </h2>
              <p className="mt-2 text-gray-500">
                Start adding items you love to your wishlist
              </p>
              <Link
                to="/products"
                className="mt-6 inline-block bg-[#08AC0A] hover:bg-[#266327] text-white px-6 py-3 rounded-md transition-all"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {wishlistItems.map((item) => (
                  <div
                    key={item._id}
                    className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
                  >
                    <div className="relative group">
                      <img
                        src={item.imageCover}
                        alt={item.title}
                        className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 transition-opacity duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-20" />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="mb-2 text-lg font-semibold line-clamp-2">{item.title}</h3>
                      <p className="text-[#08AC0A] font-bold mb-4">{item.price} EGP</p>
                      
                      <div className="flex space-x-2">
                        <button
                          className={`flex-1 px-4 py-2 rounded transition-all ${
                            actionLoading.id === item._id && actionLoading.type === 'remove'
                              ? 'bg-red-100 cursor-not-allowed'
                              : 'bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white'
                          }`}
                          onClick={() => handleRemoveFromWishlist(item._id)}
                          disabled={actionLoading.id === item._id}
                        >
                          {actionLoading.id === item._id && actionLoading.type === 'remove' ? (
                            <ClipLoader size={20} color="#FF0000" />
                          ) : (
                            'Remove'
                          )}
                        </button>
                        
                        <button
                          className={`flex-1 px-4 py-2 rounded transition-all ${
                            actionLoading.id === item._id && actionLoading.type === 'cart'
                              ? 'bg-green-100 cursor-not-allowed'
                              : 'bg-white text-green-600 border border-green-600 hover:bg-green-600 hover:text-white'
                          }`}
                          onClick={() => handleAddToCart(item._id)}
                          disabled={actionLoading.id === item._id}
                        >
                          {actionLoading.id === item._id && actionLoading.type === 'cart' ? (
                            <ClipLoader size={20} color="#08AC0A" />
                          ) : (
                            'Add to Cart'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-8">
                <Link
                  to="/products"
                  className="px-6 py-3 text-gray-800 transition-all bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Continue Shopping
                </Link>
                <Link
                  to="/cart"
                  className="bg-[#08AC0A] hover:bg-[#266327] text-white px-6 py-3 rounded-md transition-all"
                >
                  View Cart
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
