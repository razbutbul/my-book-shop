import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !role || !allowedRoles.includes(role)) {
    return <Navigate to="/logout" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
