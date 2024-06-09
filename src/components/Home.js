import React from "react";
import useAuth from "../hooks/useAuth";
import useLogout from "./Logout";

const Home = () => {
  const { auth } = useAuth();
  const firstLetter = auth.email.charAt(0).toUpperCase();
  const logout = useLogout();

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
      <div className="container text-center mx-auto mt-8">
        <h1 className="text-3xl max-xl:text-lg font-bold mb-4">
          Welcome {auth.email} 👋
        </h1>
      </div>
    </div>
  );
};

export default Home;
