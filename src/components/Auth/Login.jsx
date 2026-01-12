import React from "react";
import { Input, Button } from "../index"
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import checkAuth from "../../services/auth/checkAuth";
import { useState } from "react";

function Login({
    className = ""
}) {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, seterror] = useState();
    const [loading, setLoading] = useState(false);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handlelogin = async (data) => {

        try {
            setLoading(true);
            await axios.post(`${BACKEND_URL}/api/login`, {
                email: data.email,
                password: data.password
            }, { withCredentials: true })
                .then((res) => {
                    if (res.data.success) {
                        checkAuth(dispatch)
                        navigate("/")
                    };

                })
                .catch((err) => (
                    seterror(err.response.data.error)
                ))
        } catch (error) {
            console.log("login failed")
        } finally {
            setLoading(false);
        }
    }
    setTimeout(() => {
        seterror("");
    }, 3000)

    return (
        <div className={`${className} dark:text-gray-100`}>
            <form onSubmit={handleSubmit(handlelogin)} >

                <div className="mb-3">
                    <Input
                        label="Email:"
                        placeholder="Enter your Email"
                        type="email"
                        className="mt-1 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                        error={(error === "No User Found!!") ? "No User Found with this email please Sign in" : null}
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
                        className="mt-1 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                        error={(error === "password incorrect") ? error : null}
                        {...register("password", {
                            required: true,
                        })}
                    />
                </div>

                <div className="mt-2">
                    <p className="text-gray-700 dark:text-gray-300">
                        Don't have an account?{" "}
                        <Link to="/user/signup" className="text-blue-500 dark:text-blue-400">
                            Sign up
                        </Link>
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-35 py-2 rounded-lg font-semibold text-white flex items-center justify-center gap-2 mt-2
                            ${loading
                            ? "bg-blue-400 dark:bg-blue-600 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer active:scale-98"}
                             `}
                >
                    {loading ? (
                        <>
                            {/* Spinner */}
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Processing...
                        </>
                    ) : (
                        "Log in"
                    )}
                </button>

            </form>
        </div>
    )
}

export default Login
