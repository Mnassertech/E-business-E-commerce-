import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../Context/cartContext';
import cart1 from "../../assets/images/output-onlinegiftools.gif";
import { Link } from 'react-router-dom';
import { useWishlist } from '../../Context/wishListContext';
import { toast } from 'react-toastify';

export default function Cart() {
  const { cartDetails, removeProduct, updateCount } = useContext(cartContext);
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();
  const [actionLoading, setActionLoading] = useState({ id: null, type: null });

  useEffect(() => {

  }, [cartDetails]);

  async function deleteProduct(id) {
    try {
      let data = await removeProduct(id);
      // Show success toast/notification
    } catch (error) {
      // Show error toast/notification
    }
  }

  async function updateItems(id, count) {
    try {
      // Disable buttons while updating
      let data = await updateCount(id, count);
      // Show success feedback
    } catch (error) {
      // Show error feedback
    }
  }

  const handleWishlistToggle = async (product) => {
    try {
      setActionLoading({ id: product._id, type: 'wishlist' });
      const isInWishlist = wishlistItems?.some(item => item._id === product._id);
      
      if (isInWishlist) {
        await removeFromWishlist(product._id);
        toast.success('Removed from wishlist');
      } else {
        await addToWishlist(product._id);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    } finally {
      setActionLoading({ id: null, type: null });
    }
  };

  if (cartDetails === null) {
    return <div className="flex justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#08AC0A]"></div>
    </div>
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      {cartDetails ? (
        cartDetails?.data?.products?.length === 0 ? (
          <div className="py-12 text-center">
            <h1 className='mb-6 text-3xl font-bold'>YOUR CART IS EMPTY</h1>
            <Link to="/products" className="bg-[#08AC0A] hover:bg-[#266327] text-white px-6 py-3 rounded-md shadow-lg transition-all">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="px-5 py-8 rounded-lg shadow-xl bg-gray-50">
            <div className="transition-all duration-300">
              <div className="flex justify-between mb-5">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Total Products: <span className="text-[#08AC0A] font-bold">{cartDetails.numOfCartItems}</span>
                </h2>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Total Price: <span className="text-[#08AC0A] font-bold">{cartDetails.data.totalCartPrice} EGP</span>
                </h2>
              </div>

              <div className="relative overflow-x-auto rounded-lg shadow-lg">
                <table className="w-full text-sm text-left text-gray-600 bg-white">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                    <tr>
                      <th scope="col" className="px-8 py-4">Image</th>
                      <th scope="col" className="px-6 py-4">Product</th>
                      <th scope="col" className="px-6 py-4">Qty</th>
                      <th scope="col" className="px-6 py-4">Price</th>
                      <th scope="col" className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartDetails.data.products.map(product => (
                      <tr key={product.product._id} className="border-b border-gray-300 hover:bg-gray-100">
                        <td className="relative p-4">
                          <img
                            src={product.product.imageCover}
                            className="object-cover w-16 h-16 rounded-md"
                            alt={product.product.title}
                          />
                          <button
                            onClick={() => handleWishlistToggle(product.product)}
                            disabled={actionLoading.id === product.product._id}
                            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:scale-110 transition-transform duration-200"
                            aria-label={wishlistItems?.some(item => item._id === product.product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                          >
                            {actionLoading.id === product.product._id && actionLoading.type === 'wishlist' ? (
                              <div className="w-5 h-5">
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#FF4B4B]"></div>
                              </div>
                            ) : (
                              <svg
                                className={`w-5 h-5 ${
                                  wishlistItems?.some(item => item._id === product.product._id)
                                    ? 'text-[#FF4B4B] fill-current'
                                    : 'text-gray-400'
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {product.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateItems(product.product._id, product.count - 1)}
                              className="flex items-center justify-center w-6 h-6 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
                              type="button"
                            >
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                              </svg>
                            </button>
                            <span>{product.count}</span>
                            <button
                              onClick={() => updateItems(product.product._id, product.count + 1)}
                              className="flex items-center justify-center w-6 h-6 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
                              type="button"
                            >
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {product.price} EGP
                        </td>
                        <td className="px-6 py-4">
                          <span
                            onClick={() => deleteProduct(product.product._id)}
                            className="font-medium text-red-600 cursor-pointer hover:underline"
                          >
                            Remove
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {cartDetails.data.products.length > 0 && (
                <div className="flex justify-between mt-5">
                  <Link
                    to={'/products'}
                    className="px-6 py-3 text-gray-800 transition-all bg-gray-200 rounded-md shadow-lg hover:bg-gray-300"
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    to={'/checkout'}
                    className="bg-[#08AC0A] hover:bg-[#266327] text-white px-6 py-3 rounded-md shadow-lg transition-all flex items-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center">
          <img src={cart1} className="w-[400px]" alt="Empty Cart" />
        </div>
      )}
    </div>
  );
}
