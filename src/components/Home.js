import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-3xl max-xl:text-lg font-bold mb-4">
        Welcome {auth.email} 👋
      </h1>
      {/* Profile Button */}
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2"
        onClick={() => navigate("/profile")}
      >
        View Profile
      </button>
      {auth.role === "admin" && (
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2"
          onClick={() => navigate("/users")}
        >
          View All Users
        </button>
      )}
    </>
  );
};

export default Home;
