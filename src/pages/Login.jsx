import React from 'react'
import { Login as LoginComponent } from '../components'
import login from '../assets/login.png'

function Login() {
  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gray-50 dark:bg-gray-900
        px-4
      "
    >
      {/* MAIN CARD */}
      <div
        className="
          w-full max-w-5xl
          min-h-[85vh]
          flex flex-col md:flex-row     /* 📱 mobile: column | 💻 desktop: row */
          rounded-2xl overflow-hidden
          bg-white dark:bg-gray-800
          shadow-2xl dark:shadow-black/50
        "
      >
        {/* IMAGE SECTION */}
        <div
          className="
            w-full md:w-1/2
            min-h-[280px] md:min-h-full
            flex items-center justify-center
            bg-center bg-contain bg-no-repeat
            dark:opacity-90
          "
          style={{ backgroundImage: `url(${login})` }}
        />

        {/* FORM SECTION */}
        <div
          className="
            w-full md:w-1/2
            flex items-center justify-center
            py-10 md:py-0
          "
        >
          <div
            className="
              w-full
              max-w-sm
              px-6 md:px-8
              flex flex-col justify-center
            "
          >
            <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">
              Please Login with Your Email
            </h1>

            <LoginComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
