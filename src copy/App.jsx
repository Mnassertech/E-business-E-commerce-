import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext, useEffect } from "react";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Wishlist from "./components/Wishlist/Wishlist";
import NotFound from "./components/NotFound/NotFound";
import { tokenContext } from "./Context/tokenContext";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import AuthView from "./components/AuthView/AuthView";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Checkout from "./components/Checkout/Checkout"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllOrders from "./components/AllOrders/AllOrders";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import NumberInput from "./components/NumberInput/NumberInput";
import PasswordReset from "./components/PasswordReset/PasswordReset";
function App() {


  let {setToken}=useContext(tokenContext)

  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      setToken(localStorage.getItem("userToken"))
    }
  },[])



  const routes = createBrowserRouter([
    {path:"",element: <Layout />,children: [
        { index: true,element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path:"home",element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: "categories", element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: "brands", element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
        { path: "login", element:<AuthView> <Login /></AuthView> },
        { path: "register", element: <AuthView><Register /></AuthView> },
        { path: "forgotPassword", element: <AuthView><ForgotPassword /></AuthView> },
        { path: "numberInput", element: <AuthView><NumberInput /></AuthView> },
        { path: "passwordReset", element: <AuthView><PasswordReset /></AuthView> },
        { path: "products", element:<ProtectedRoutes> <Products /></ProtectedRoutes> },
        { path: "cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: "productDetails/:id/:categoryId", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
        { path: "wishlist", element: <ProtectedRoutes><Wishlist /></ProtectedRoutes> },
        { path: "checkout", element: <ProtectedRoutes><Checkout /></ProtectedRoutes> },
        { path: "allorders", element: <ProtectedRoutes><AllOrders /></ProtectedRoutes> },
       
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
        <ToastContainer />
      <RouterProvider router={routes}>
   
      </RouterProvider>
    </>
  );
}

export default App;
