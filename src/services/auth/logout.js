import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function logout(){
    try {
        const response = await axios.post(`${BACKEND_URL}/api/logout`, {}, { withCredentials: true });
        console.log("Logout successful:", response.data);
    } catch (error) {
        console.error("Logout failed:", error);
    }
}

export default logout;
