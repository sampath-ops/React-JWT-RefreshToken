import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const LOGIN_URL = "/users/login";
const SIGNUP_URL = "/users/signup";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const url = isLogin ? LOGIN_URL : SIGNUP_URL;
    const userData = isLogin
      ? { email, password }
      : { email, password, confirmPassword };

    setLoading(true);

    try {
      const response = await axios.post(url, JSON.stringify(userData), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const responseData = response?.data;
      const user = isLogin
        ? responseData?.data.user
        : responseData?.data.createdUser;
      const accessToken = responseData?.data.accessToken;
      const role = user.role;
      const email = user.email;
      setAuth({ email, role, accessToken });
      setEmail("");
      setPassword("");
      !isLogin && setConfirmPassword("");
      // Show success toast message
      toast.success(responseData.message);
      // Delay the navigation
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 2000);
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else {
        const statusCode =
          err.response?.data?.error?.statusCode || err.response?.status;
        const errorMessage = err.response?.data?.message || "An error occurred";

        switch (statusCode) {
          case 400:
            toast.error(errorMessage);
            break;
          case 401:
            toast.error("Unauthorized: " + errorMessage);
            break;
          case 403:
            toast.error("Forbidden: " + errorMessage);
            break;
          case 404:
            toast.error("Not Found: " + errorMessage);
            break;
          case 500:
            toast.error("Internal Server Error: " + errorMessage);
            break;
          default:
            toast.error(errorMessage);
            break;
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <svg
              className="animate-spin h-8 w-8 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? "Login" : "Signup"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              // minLength={8}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isLogin ? "Login" : "Signup"}
            </button>
            <button
              type="button"
              onClick={toggleForm}
              className="text-blue-500 hover:text-blue-700 font-bold"
            >
              {isLogin ? "Need an account? Signup" : "Have an account? Login"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthForm;
