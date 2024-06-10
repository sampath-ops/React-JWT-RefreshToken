import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "./Logout";

const Layout = () => {
  const { auth } = useAuth();
  const firstLetter = auth.email.charAt(0).toUpperCase();
  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            className="h-8 w-8 mr-2 cursor-pointer"
            src="/logo.svg"
            alt="Logo"
            onClick={()=> navigate("/")}
          />
        </div>
        {/* Profile */}
        <div className="flex items-center">
          {/* Profile Round Circle */}
          <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-800 text-sm font-bold mr-2">
            {firstLetter}
          </div>
          {/* Logout Button */}
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container text-center  mx-auto mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
