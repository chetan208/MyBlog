import React, { useState } from 'react'
import verifyEmailImg from '../assets/login.png'
import {  useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Input } from '../components';

function VerifyEmail() {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error,setError] = useState("")
const { email } = useParams()
  const navigate=useNavigate()

  const handleVerify = async() => {
    setLoading(true)
    ;
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    
    try {
      const res=  await axios.post(`${BACKEND_URL}/api/signup/verify-account/${email}`,{code})

      if(res.data.success === false){
        setError(res.data.message)
        setLoading(false)
        return;
      }
       if(res.data.success){
        navigate(`/setup-profile/${email}`)
       }
    } catch (error) {
      console.log("error in verification",error)
      setError(error.response.data.message)
      setLoading(false)
    }
     

    setTimeout(() => {
        setError("");
    }, 3000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      {/* MAIN CARD */}
      <div className="w-full max-w-5xl min-h-[85vh] flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-2xl dark:shadow-black/50">
        
        {/* IMAGE SECTION */}
        <div
          className="w-full md:w-1/2 min-h-[280px] md:min-h-full flex items-center justify-center bg-center bg-contain bg-no-repeat dark:opacity-90"
          style={{ backgroundImage: `url(${verifyEmailImg})` }}
        />

        {/* VERIFICATION MESSAGE SECTION */}
        <div className="w-full md:w-1/2 flex items-center justify-center py-10 md:py-0">
          <div className="w-full max-w-sm px-6 md:px-8 flex flex-col justify-center text-left">
            <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">
              Verify Your Email
            </h1>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              We have sent a verification link to your email. Please check your inbox and enter the code below to continue.
            </p>

            {/* INPUT FOR CODE */}
            {/* <input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full mb-4 px-4 py-3 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 text-base"
            /> */}

            <Input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full mb-4 px-4 py-3 border rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 text-base"
            error={error}
            />
            {/* VERIFY BUTTON */}
            <button
              type="submit"
              disabled={loading}
              onClick={handleVerify}
              className={`
                w-[140px] py-3 rounded-lg font-semibold text-white
                flex items-center justify-center gap-2 mt-2
                ${loading
                  ? "bg-blue-400 cursor-not-allowed dark:bg-blue-500"
                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer active:scale-95 dark:bg-blue-600 dark:hover:bg-blue-700"}
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

            {/* RESEND MESSAGE */}
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Didn't receive the email?{' '}
              <span className="text-blue-500 font-semibold dark:text-blue-400 cursor-pointer">
                Resend
              </span>{' '}
              or check your spam folder.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
