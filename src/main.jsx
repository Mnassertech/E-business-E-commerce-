import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "flowbite/dist/flowbite.min.js";
import TokenContextProvider from "./context/tokenContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from "./context/cartContext";
import CounterContextProvider from "./context/counterContext";
import { WishlistProvider } from "./context/wishListContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TokenContextProvider>
      <CartContextProvider>
        <CounterContextProvider>
        <WishlistProvider>
            <App />
        </WishlistProvider>
        </CounterContextProvider>
      </CartContextProvider>
    </TokenContextProvider>
  </StrictMode>
);