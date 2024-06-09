import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.post(
        "/users/refresh-token",
        {},
        {
          withCredentials: true,
        }
      );
      const responseData = response.data;
      setAuth((prev) => {
        return { ...prev, accessToken: responseData.data.accessToken };
      });
      return responseData.data.accessToken;
    } catch (error) {
      // Extract error message from the response if available
      let errorMessage = "Error refreshing token";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      throw new Error(errorMessage);
    }
  };
  return refresh;
};

export default useRefreshToken;
