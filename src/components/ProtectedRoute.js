import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";

const ProtectedRoute = ({ allowedRole }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const loading = useAuthCheck();

  if (loading) {
    return <div>Loading...</div>; // Loading state while refreshing
  }

  if (!auth || !auth.accessToken) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (auth.role !== "admin") {
    if (allowedRole && auth.role !== allowedRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }
  return <Outlet />;
};

export default ProtectedRoute;
