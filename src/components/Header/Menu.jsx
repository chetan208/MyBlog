import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

import { IoHome } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { FcAbout } from "react-icons/fc";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { RiUserAddLine } from "react-icons/ri";
import { MdExplore } from "react-icons/md";

import { logout as logoutAction } from "../../store/authslice";
import logout from "../../services/auth/logout";

import { useSelector, useDispatch } from "react-redux";

export default function Sidebar({ menuOpen, setMenuOpen }) {
  const AuthStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const navItems = [
    { path: "/", name: "Home", icon: IoHome },
    { name: "Explore Blogs", path: "/", icon: MdExplore },
    { path: "/add-blog", name: "Write Blog", icon: TfiWrite, authentication: true },
    { path: "/about", name: "About", icon: FcAbout },
    { path: "/", name: "Contact", icon: MdOutlineConnectWithoutContact },
    { path: "/settings", name: "Settings", icon: IoSettingsOutline, authentication: true },
    { path: "/", name: "Logout", icon: BiLogOut, authentication: true },
    { name: "Login", path: "/user/login", icon: BiLogIn, authentication: false },
    { name: "Sign Up", path: "/user/signup", icon: RiUserAddLine, authentication: false },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 
        ${menuOpen ? "opacity-30 visible" : "opacity-0 invisible"}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-[80vw] sm:w-80
        bg-white dark:bg-gray-900 shadow-2xl p-5 z-50
        transform transition-transform duration-300 ease-in-out
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="font-bold text-2xl text-blue-600 dark:text-blue-400 tracking-tight">
              BlogIt
            </h1>

            <RxCross2
              size={26}
              className="cursor-pointer text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
              onClick={() => setMenuOpen(false)}
            />
          </div>

          {/* Menu */}
          <div className="flex-1 mt-4 space-y-1">
            {navItems.map((item) => {
              if (item.authentication === true && !AuthStatus) return null;
              if (item.authentication === false && AuthStatus) return null;

              return (
                <div
                  key={item.name}
                  className={`group rounded-xl transition hover:bg-gray-100 dark:hover:bg-gray-700
                                    ${item.name === "Explore Blogs" ? "" : ""}`}
                >
                  <Link
                    to={item.path}
                    onClick={async () => {
                      setMenuOpen(false);
                      if (item.name === "Logout") {
                        await logout(); // backend logout
                        dispatch(logoutAction()); // redux update
                        navigate("/");
                      }
                    }}
                    className={`flex items-center gap-4 px-4 py-3 font-medium
                              text-gray-700 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white
                              ${item.name === "Logout" ? "text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-700" : ""}`}
                  >
                    <item.icon size={20} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* User Profile */}
          {AuthStatus && user && (
            <div className="mt-auto pt-4">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/80 dark:bg-gray-800 shadow-sm">
                <img
                  src={user.avatar.url}
                  alt="User"
                  className="w-11 h-11 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                />

                <div className="leading-tight">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-45">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
