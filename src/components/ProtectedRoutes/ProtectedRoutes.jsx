import { Navigate } from "react-router-dom"
import Login from "../Login/Login"

export default function ProtectedRoutes(props) {
  if(localStorage.getItem("userToken")){
    return props.children
  }else{
    return <Navigate to={"/Login"} />
  }
}
