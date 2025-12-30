import axios from "axios";
import { login, logout } from "../../store/authslice";

const checkAuth = async (dispatch) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  try {
    const res = await axios.get(
      `${BACKEND_URL}/api/checkauth`,
      { withCredentials: true }
    );

    if (res.data?.success) {
      dispatch(login(res.data));
      return true; // auth ok
    } else {
      dispatch(logout());
      return false;
    }
  } catch (error) {
    dispatch(logout());
    return false;
  }
};

export default checkAuth;
