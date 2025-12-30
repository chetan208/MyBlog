import axios from 'axios'
import React from 'react'
import { login } from '../../store/authslice';




const checkAuth = async (dispatch) => {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.get(`${BACKEND_URL}/api/checkauth`, {
        withCredentials: true,
      });
      console.log(res)
    res.data.success? (
      dispatch(login(res.data))
    ) : null
    };



export default checkAuth