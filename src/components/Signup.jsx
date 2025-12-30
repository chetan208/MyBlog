import React, { useState } from "react";
import { Input, Button } from "./index"
import { useForm } from 'react-hook-form';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import checkAuth from "../services/auth/checkAuth";
import { login } from "../store/authslice";
import { useDispatch } from "react-redux";




function Signup({
  className = ""
}) {
  const { register, handleSubmit, watch, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState('')
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);


  const name = watch("name")
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;



  const handleSignin = async (data) => {
    try {
      // Signup request
      setLoading(true);
      const formData = new FormData();

      formData.append("fullName", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("avatar", profile); // file object


      const signupRes = await axios.post(`${BACKEND_URL}/api/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );



      if (signupRes.data.success) {
        // Login request after successful signup
        const loginRes = await axios.post(
          `${BACKEND_URL}/api/login`,
          {
            email: data.email,
            password: data.password,
          },
          { withCredentials: true }
        );

        if (loginRes.data.success) {
          // Update Redux state
          checkAuth(dispatch);

          // Navigate to home
          navigate("/");

          // Optional: full page reload
          // window.location.reload();
        } else {
          console.log("Login failed after signup");
        }
      } else {
        console.log("Signup failed");
      }
    } catch (err) {
      console.error("Error during signup/login:", err);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit(handleSignin)} >


        <div>
          <Input
            label="Full Name:"
            name="name"
            placeholder="Enter your Full Name"
            type="text"
            className="mt-1"
            {...register("name", {
              required: true,
            })}
          ></Input>
        </div>

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

        <div className="flex flex-col items-start space-y-2 mt-2">
          <label className="cursor-pointer px-5 py-2 rounded-lg 
              bg-teal-500 text-white font-semibold shadow-md
              hover:bg-teal-600 transition-colors duration-300">
            {profile ? "Upload Profile Picture" : "Upload Profile Picture"} {/* Always same text */}
            <input
              type="file"
              className="hidden"
              name="profile"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </label>

          {!profile && (
            <span className="text-gray-700 text-sm">No file chosen</span>
          )}

          {profile && (
            <div className="flex items-center space-x-4 mt-2">
              {/* Preview */}
              <img
                src={URL.createObjectURL(profile)}
                alt="preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
                onClick={() => setShowPreview(true)}
              />

              {/* Only this Change Button will show */}
              <button
                type="button"
                className="cursor-pointer px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
                onClick={() => document.querySelector('input[name="profile"]').click()}
              >
                Change
              </button>
            </div>
          )}

          {showPreview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Blurred Background */}
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setShowPreview(false)}
              ></div>

              {/* Image Wrapper */}
              <div className="relative">
                {/* Cross Button */}
                <button
                  onClick={() => setShowPreview(false)}
                  className="absolute -top-3 -right-3 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-200"
                >
                  ✕
                </button>

                {/* Big Image */}
                <img
                  src={URL.createObjectURL(profile)}
                  alt="Big Preview"
                  className="w-80 h-80 rounded-xl object-cover shadow-2xl"
                />
              </div>
            </div>
          )}
        </div>






        <div className="mt-2">
          <p>
            Already have an account?  <Link to="/login" className="text-blue-500">Log in</Link>
          </p>

        </div>

        <button
          type="submit"
          disabled={loading}
          className={`

               w-35 py-2 rounded-lg font-semibold  text-white
               flex items-center justify-center gap-2 mt-2
              

    ${loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 cursor-pointer active:scale-98"}
  `}
        >
          {loading ? (
            <>
              {/* Spinner */}
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </>
          ) : (
            "Sign Up"
          )}
        </button>

      </form>
    </div>
  )

};




export default Signup