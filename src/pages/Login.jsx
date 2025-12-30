import React from 'react'
import { Login as LoginComponent, Header } from '../components'
import login from '../assets/login.png'
import {useDispatch,useSelector} from 'react-redux'
function Login() {
  
  return (
    <div
      className='h-screen'

    >
      {/* <Header /> */}
      <div 
      className='lg:h-[80%] w-full flex items-center justify-center
       lg:gap-9 flex-col-reverse gap-0 sm:flex-col-reverse md:flex-row-reverse
        lg:flex-row-reverse  overflow-hidden  lg:py-5  sm:px-10 md:px-10 lg:px-30 mt-2 ' >

        <div className='w-80 sm:w-100 md:w-80 lg:w-100 px-10 h-full flex flex-col justify-center  shrink-0 '>
          <div><h1 className="text-3xl font-bold mt-5">Please Login with Your Email</h1></div>
          < LoginComponent className="mt-4 w-auto" />
        </div>

        <div className="lg:w-120 md:w-100  bg-cover bg-center flex justify-center  items-center mb-5">
                    <div className='h-70 w-80 lg:h-120 md:h-120 md:w-140 lg:w-150 sm:h-70 sm:w-100 bg-center bg-cover'
                    style = {{ backgroundImage: `url(${ login })` }}>
                    </div>
                 </div>

        

      </div>
    </div >)
}

export default Login