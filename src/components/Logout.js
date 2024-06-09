import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    try {
      await axiosPrivate.post("/users/logout");
      setAuth({});
      navigate("/auth");
    } catch (err) {
      console.error("Error message: ", err.message);
    }
  };

  return logout;
};

export default useLogout;
