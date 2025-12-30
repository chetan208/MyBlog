import React from "react";
import { Input, Button } from "./index"
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import checkAuth from "../services/auth/checkAuth";


function Login({
    className = ""
}) {
    const { register, handleSubmit } = useForm();
    const navigate=useNavigate();
    const dispatch = useDispatch();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


    const handlelogin=async(data)=>{
        
        try {
            
            await axios.post(`${BACKEND_URL}/api/login`,{
            email:data.email,
            password:data.password
        },{ withCredentials: true } )
        .then((res)=>{
            if (res.data.success){
                console.log("login ho gya hai")
                checkAuth(dispatch)
                navigate("/")
            } ;

        })
        .catch((err)=>(console.log(err)))
        

        } catch (error) {
            console.log("login failed")
        }
    }

    return (
        <div className={`${className}`}>
            <form onSubmit={handleSubmit(handlelogin)} >

                <div className="mb-3">
                    <Input
                        label="Email:"
                        placeholder="Enter your Email"
                        type="email"
                        className="mt-1"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                    />
                </div>

                <div>
                    <Input
                        label="Password:"
                        placeholder="Enter your Password"
                        type="text"
                        className="mt-1"
                        {...register("password", {
                            required: true,
                        })}
                    />
                </div>


                <div className="mt-2">
                    <p>
                        Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
                    </p>

                </div>

                <Button
                    type="submit"
                    className="w-auto mt-2"
                >Login</Button>

            </form>
        </div>
    )
}

export default Login