import { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAuthCheck = () => {
  const [loading, setLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();
  const [isTokenChecked, setIsTokenChecked] = useState(false); // avoid making redundant API calls
  
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const newAccessToken = await refresh();
        // Fetch user data
        const userResponse = await axios.get("/users/current-user", {
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });
        const userData = userResponse.data.data;
        const email = userData.email;
        const role = userData.role;
        setAuth({ email, role, accessToken: newAccessToken });
      } catch (err) {
        // Handle error
      } finally {
        setLoading(false);
        setIsTokenChecked(true);
      }
    };

    if (!auth || !auth.accessToken) {
     if(!isTokenChecked){
        verifyRefreshToken();
     }
    } else {
      setLoading(false);
    }
  }, [auth, setAuth, refresh,isTokenChecked]);

  return loading;
};

export default useAuthCheck;
