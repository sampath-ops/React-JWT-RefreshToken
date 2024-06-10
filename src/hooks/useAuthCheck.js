import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import useAxiosPrivate from "./useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const useAuthCheck = () => {
  const [loading, setLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  const [isTokenChecked, setIsTokenChecked] = useState(false); // avoid making redundant API calls
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const newAccessToken = await refresh();
        // Fetch user data
        const userResponse = await axiosPrivate.get("/users/current-user");
        const userData = userResponse.data.data;
        const email = userData.email;
        const role = userData.role;
        setAuth({ email, role, accessToken: newAccessToken });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setAuth(null);
          navigate("/auth");
        }
      } finally {
        setLoading(false);
        setIsTokenChecked(true);
      }
    };

    if (!auth || !auth.accessToken) {
      if (!isTokenChecked) {
        checkAuth();
      }
    } else {
      setLoading(false);
    }
  }, [auth, setAuth, refresh, isTokenChecked, axiosPrivate, navigate]);

  return loading;
};

export default useAuthCheck;
