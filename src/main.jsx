import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "flowbite/dist/flowbite.min.js";
import { CounterContextProvider } from "./Context/counterContext.jsx";
import TokenContextProvider from "./Context/tokenContext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from "./Context/cartContext.jsx";
import { WishlistProvider } from "./Context/wishListContext.jsx";

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