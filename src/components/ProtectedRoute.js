import React from 'react'
import {Navigate, useLocation, Outlet} from "react-router-dom"
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({allowedRole}) => {
    const {auth} = useAuth()
    let location = useLocation();
    console.log(auth)

    if (!auth || !auth.accessToken) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
      }
    
      if (allowedRole && auth.role !== allowedRole) {
        return <Navigate to="/unauthorized" replace />;
      }
      return <Outlet />
};

export default ProtectedRoute;