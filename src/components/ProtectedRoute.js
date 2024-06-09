import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../api/axios";

const ProtectedRoute = ({ allowedRole }) => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const refresh = useRefreshToken();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const newAccessToken = await refresh();
        // Fetch user data
        const userResponse = await axios.get("/users/current-user", {
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });
        const userData = userResponse.data;
        const email = userData.data.email;
        const role = userData.data.role;
        setAuth({ email, role, accessToken: newAccessToken });
      } catch (err) {
        // console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (!auth || !auth.accessToken) {
      verifyRefreshToken();
    } else {
      setLoading(false);
    }
  }, [auth, setAuth, refresh]);

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
