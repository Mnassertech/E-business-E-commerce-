import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { tokenContext } from "../../Context/tokenContext";
import { cartContext } from "../../Context/cartContext";

export default function Navbar() {
  const { token, setToken } = useContext(tokenContext);
  const { numOfCartItems } = useContext(cartContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [padding, setPadding] = useState(false);

  // Scroll event handler
  const handleNavPad = () => {
    setPadding(window.scrollY > 0);
  };

  // Add event listener on mount and clean up on unmount
  useEffect(() => {
    window.addEventListener("scroll", handleNavPad);
    return () => {
      window.removeEventListener("scroll", handleNavPad);
    };
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all bg-white shadow-lg bg-opacity-80 backdrop-blur-md ${padding ? "py-4" : "py-6"}`}>
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <NavLink to="">
            <img src={logo} width="180px" alt="Logo" className="transition-transform duration-300 hover:scale-105" />
          </NavLink>

          {/* Navigation Links */}
          <div className={`md:block ${isOpen ? "block" : "hidden"} absolute top-[60px] left-0 w-full bg-white md:w-auto md:relative md:top-0 md:bg-transparent md:flex md:space-x-6 md:ml-16 md:text-gray-700`}>
            {token && (
              <ul className="flex flex-col text-gray-700 md:flex-row md:space-x-6 md:mt-0">
                {[
                  { name: "Home", path: "home" },
                  { name: "Cart", path: "cart" },
                  { name: "Wishlist", path: "wishlist" },
                  { name: "Products", path: "products" },
                  { name: "Categories", path: "categories" },
                  { name: "Brands", path: "brands" },
                ].map(({ name, path }) => (
                  <li key={name}>
                    <NavLink
                      to={path}
                      className="block px-4 py-2 transition duration-300 hover:text-green-600 hover:underline"
                    >
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Cart & Auth Buttons */}
        <div className="flex items-center gap-6">
          {token && (
            <NavLink to="cart" className="relative">
              <i className="text-2xl text-gray-700 transition duration-300 fa-solid fa-cart-shopping hover:text-[#08ac0bbe]" />
              {numOfCartItems > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#08AC0A] rounded-full -top-2 -right-2">
                  {numOfCartItems}
                </span>
              )}
            </NavLink>
          )}

          <ul className="flex gap-4">
            {token ? (
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("userToken");
                    setToken(null);
                    navigate("/login");
                  }}
                  className="px-2 py-2 text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="register"
                    className="px-2 py-2 text-green-600 transition duration-300 border border-green-500 rounded-lg hover:bg-green-500 hover:text-white"
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="login"
                    className="px-2 py-2 text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
    </nav>
  );
}
