import axios from "../api/axios";

const useRefreshToken = () => {

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
