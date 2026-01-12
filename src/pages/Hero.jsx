import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {Spotlight} from '../components/ui/spotlight'

import{BackgroundBeams} from "../components/ui/background-beams"

export default function Hero() {
  const navigate = useNavigate();
  const userName = useSelector((state) => state.auth.userName);
  const authStatus = useSelector((state) => state.auth.status);

  return (

    <>
    <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
    
    <div className="
      min-h-screen 
      bg-gray-300 dark:bg-[#0b0f19]
      flex items-center justify-center 
      px-4
    ">
      
     
        {/* FULL CENTER WRAPPER */}
        <div className="h-full flex items-center justify-center">
          
          {/* CONTENT */}
          <div className="text-center max-w-4xl px-6">
            <h1
              className="
                text-5xl sm:text-6xl lg:text-7xl
                font-extrabold tracking-tight
                text-gray-900 
                dark:text-white
              "
            >
              {authStatus ? (
                <>
                  Hello,{" "}
                  <span className="text-teal-500 dark:text-purple-400">
                    {userName}
                  </span>
                </>
              ) : (
                "Share your thoughts with the world"
              )}
            </h1>

            <p
              className="
                mt-8 
                text-xl sm:text-2xl
                text-gray-700 
                dark:text-gray-300
              "
            >
              {authStatus
                ? "Every idea matters. Write blogs, express yourself, and inspire people around the globe."
                : "Login to start writing blogs and publish your ideas."}
            </p>

            <p
              className="
                mt-5 
                text-base 
                text-gray-500 
                dark:text-gray-400
              "
            >
              🚧 Site under maintenance. Some features may be temporarily unavailable.
            </p>

            <div className="mt-12 flex justify-center">
              <button
                onClick={() =>
                  authStatus ? navigate("/add-blog") : navigate("/user/login")
                }
                className="
                  px-12 py-4 rounded-full
                  bg-teal-500 
                  dark:bg-purple-600
                  text-white font-semibold
                  text-lg
                  hover:bg-teal-600 
                  dark:hover:bg-purple-700
                  active:scale-95
                  transition-all duration-200
                  shadow-xl
                "
              >
                {authStatus ? "Write a Blog" : "Login to Continue"}
              </button>
            </div>
          </div>

        </div>
      
     <BackgroundBeams />
    
    </div>
    
    </>
  );
}
