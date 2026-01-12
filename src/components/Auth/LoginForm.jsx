import React from 'react'

import { Login as LoginComponent } from '../index'

function LoginForm() {
  return (
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
  )
}

export default LoginForm