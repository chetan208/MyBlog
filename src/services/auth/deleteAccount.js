import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;





async function deleteAccount(password){
 
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/delete-account`, {
    data: {
      password: password,
    },
    withCredentials: true
  });
        return response.data
        console.log("delete Secsessfull", response.data);
    } catch (error) {
        return error.response.data;
        console.error("delete failed:", error);
    }
}

export default deleteAccount;