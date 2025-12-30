import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function deleteAccount(){
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/delete-account`, { withCredentials: true });
        console.log("delete Secsessfull", response.data);
    } catch (error) {
        console.error("delete failed:", error);
    }
}

export default deleteAccount;