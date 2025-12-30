import React from "react"
import { Link ,useNavigate} from "react-router-dom"
import DropDown from "./DropedDown"
import { useSelector } from "react-redux"
import {ProfileMenu} from "../index"


export default function DesktopNavItems(){
     const status = useSelector((state) => (state.auth.status))

     const navigate=useNavigate()
    return (
        <nav className="hidden md:flex items-center space-x-6">

                        <Link to="/" className="hover:text-blue-600">Home</Link>

                        <div className="" >
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
                        </div>

                        {status? (
                            
                             <Link to="/add-blog" className="hover:text-blue-600">Write</Link>
                        ) : null}

                        
                         <Link to="/about" className="hover:text-blue-600">About</Link>
                         <Link to="/contact" className="hover:text-blue-600">Contact</Link>

                        <input
                            type="text"
                            placeholder="Search..."
                            className="border rounded px-2 py-1 text-sm"
                        />

                        {status? (
                            <ProfileMenu />
                        ):(
                            <>
                        <button className="text-blue-600 cursor-pointer" onClick={()=>navigate("/login")} >Login</button>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer" onClick={()=>navigate("/signup")} >
                            Sign Up
                        </button>
                        </>
                        )}
                       
                    </nav>
    )
}