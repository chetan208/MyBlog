import React from "react"
import { Link ,useNavigate,useLocation} from "react-router-dom"
import DropDown from "./DropedDown"
import { useSelector } from "react-redux"
import {ProfileMenu} from "../index"
import ModeToggle from "../Mode-toggle"

export default function DesktopNavItems(){
     const status = useSelector((state) => (state.auth.status))
     const navigate = useNavigate()

      const handleAboutClick = () => {
    if (location.pathname === "/") {
      const aboutSection = document.getElementById("about");
      aboutSection?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/about");
    }
  };

    return (
        <nav className="hidden md:flex items-center space-x-6">

                        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-200 text-gray-800">Home</Link>

                        {/* <div className="" >
                            <DropDown
                            label="Categories"
                            options={[
                                {
                                    name:"education",
                                    path:"/education"
                                },
                                {
                                    name:"Dsa",
                                    path:"/dsa"
                                }
                            ]}
                            />
                        </div> */}

                        {status? (
                             <Link to="/add-blog"  className="hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-200 text-gray-800">Write</Link>
                        ) : null}

                        <Link onClick={handleAboutClick} className="hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-200 text-gray-800">About</Link>
                        <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-200 text-gray-800">Contact</Link>

                        {/* <input
                            type="text"
                            placeholder="Search..."
                            className="border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        /> */}

                        {status? (
                            <ProfileMenu />
                        ):(
                            <>
                        <button className="text-blue-600 dark:text-blue-400 cursor-pointer" onClick={()=>navigate("/user/login")} >Login</button>
                        <button className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded cursor-pointer" onClick={()=>navigate("/user/signup")} >
                            Sign Up
                        </button>
                        </>
                        )}

                       
                       
        </nav>
    )
}
