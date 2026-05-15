import React, { useContext } from "react";
import { tokenContext } from "../../Context/tokenContext";

export default function Footer() {
  const { token } = useContext(tokenContext);

  if (!token) return null;

  return (
    <footer className="bg-[#F0F3F2] px-10 py-8">
      <div className="mx-auto text-center max-w-7xl">
        <h2 className="text-3xl text-[#212529] font-bold mb-3">Get the FreshCart App</h2>
        <p className="text-[#6C757D] font-light mb-6">
          We will send you a link; open it on your phone to download the app.
        </p>
        <form className="flex flex-col items-center justify-center gap-4 mb-8 sm:flex-row">
          <input
            type="email"
            id="app-email"
            className="w-full sm:w-auto flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#08AC0A] focus:border-[#08AC0A] p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="py-3 px-8 text-sm font-medium text-white bg-[#08AC0A] rounded-lg border border-[#08AC0A] hover:bg-[#069a08] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#08ac0bad] dark:hover:bg-[#08ac0b71] dark:focus:ring-[#08ac0bb6]"
          >
            Share App Link
          </button>
        </form>
        <div className="flex flex-col items-center justify-between pt-6 border-t border-gray-300 sm:flex-row">
          <div className="text-[#212529] font-light mb-4 sm:mb-0">
            Payment Partners
          </div>
          <div className="text-[#212529] font-light">
            Get deliveries with FreshCart
          </div>
        </div>
      </div>
    </footer>
  );
}
