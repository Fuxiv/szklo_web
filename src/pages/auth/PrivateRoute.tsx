import { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../business/reducer/store";
import { Hamburger } from "../users/components/Hamburger";
import Navbar from "../users/components/Navbar";
interface userI {
  token: string;
  email: string;
  id: string;
}
const PrivateRoute = () => {
   // @ts-ignore
  let value: userI = localStorage.getItem("token");
  const token=useAppSelector((state)=>state.auth.token)
  let location = useLocation();
    //@ts-ignore
  return (
    <>
    {location.pathname === "/admin/ordersList/edit" ? null : <Navbar />}
      
      {value!=null ? <Outlet /> : <Navigate to="/signIn" />}
    </>
  );
};
export default PrivateRoute;
