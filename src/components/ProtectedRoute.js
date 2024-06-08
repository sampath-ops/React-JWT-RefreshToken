import React from 'react'
import {Navigate, useLocation} from "react-router-dom"
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({children,allowedRole}) => {
    const {auth} = useAuth()
    let location = useLocation();
    console.log(auth)

    if (!auth.accesstoken) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
      }
    
      if (allowedRole && auth.role !== allowedRole) {
        return <Navigate to="/unauthorized" replace />;
      }
    
      return children;

};

export default ProtectedRoute;