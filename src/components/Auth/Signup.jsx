import React, { useState } from "react";
import { Input, Button } from "../index"
import { useForm } from 'react-hook-form';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import checkAuth from "../../services/auth/checkAuth";
import { login } from "../../store/authslice";
import { useDispatch } from "react-redux";

function Signup({
  className = ""
}) {
  const { register, handleSubmit, watch, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error,seterror]=useState("")
  const [loading, setLoading] = useState(false);

  const name = watch("name")
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  

  const handleSignin = async (data) => {
    try {
      setLoading(true);
      
      
      const signupRes = await axios.post(`${BACKEND_URL}/api/signup`,{
        email:data.email,
        password:data.password,
        
      })

      if(signupRes.data.message==="email registered already"){
        seterror(signupRes.data.message)
        return;
      }
      navigate(`/user/verify/${data.email}`)

      reset();

    } catch (err) {
      console.error("Error during signup:", err);
    } finally {
      setLoading(false);
    }
  };

  setTimeout(() => {
        seterror("");
    }, 3000)

  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit(handleSignin)}>

        {/* <div>
          <Input
            label="Full Name:"
            name="name"
            placeholder="Enter your Full Name"
            type="text"
            className="mt-1 dark:bg-gray-800 dark:text-white dark:border-gray-700"
            {...register("name", { required: true })}
          />
        </div> */}

        <div className="mb-3">
          <Input
            label="Email:"
            placeholder="Enter your Email"
            type="email"
            className="mt-1 dark:bg-gray-800 dark:text-white dark:border-gray-700"
            error={error}
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
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
            className="mt-1 dark:bg-gray-800 dark:text-white dark:border-gray-700"
            {...register("password", { required: true })}
          />
        </div>

        {/* <div className="flex flex-col items-start space-y-2 mt-2">
          <label className="cursor-pointer px-5 py-2 rounded-lg 
              bg-teal-500 text-white font-semibold shadow-md
              hover:bg-teal-600 transition-colors duration-300
              dark:bg-teal-600 dark:hover:bg-teal-700">
            Upload Profile Picture
            <input
              type="file"
              className="hidden"
              name="profile"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </label>

          {!profile && (
            <span className="text-gray-700 text-sm dark:text-gray-400">
              No file chosen
            </span>
          )}

          {profile && (
            <div className="flex items-center space-x-4 mt-2">
              <img
                src={URL.createObjectURL(profile)}
                alt="preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 cursor-pointer dark:border-gray-600"
                onClick={() => setShowPreview(true)}
              />

              <button
                type="button"
                className="cursor-pointer px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => document.querySelector('input[name="profile"]').click()}
              >
                Change
              </button>
            </div>
          )}

          {showPreview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setShowPreview(false)}
              ></div>

              <div className="relative">
                <button
                  onClick={() => setShowPreview(false)}
                  className="absolute -top-3 -right-3 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  ✕
                </button>

                <img
                  src={URL.createObjectURL(profile)}
                  alt="Big Preview"
                  className="w-80 h-80 rounded-xl object-cover shadow-2xl"
                />
              </div>
            </div>
          )}
        </div> */}

        <div className="mt-2">
          <p className="dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/user/login" className="text-blue-500 dark:text-blue-400">
              Log in
            </Link>
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`
            w-35 py-2 rounded-lg font-semibold text-white
            flex items-center justify-center gap-2 mt-2
            ${loading
              ? "bg-blue-400 cursor-not-allowed dark:bg-blue-500"
              : "bg-blue-500 hover:bg-blue-600 cursor-pointer active:scale-98 dark:bg-blue-600 dark:hover:bg-blue-700"}
          `}
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Please wait...
            </>
          ) : (
            "Next"
          )}
        </button>

      </form>
    </div>
  );
}

export default Signup;
