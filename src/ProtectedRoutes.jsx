import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ adminRoute }) => {
  const { userInfo } = useSelector((state) => state.user);
  

  if (userInfo === null ) {
    return <Navigate to={"/login"} />;
  }

  if (adminRoute && userInfo?.role === "user") {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
