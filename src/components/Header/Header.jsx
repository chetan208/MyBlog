import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

import HamburgerMenu from "./Hamberger";
import DesktopNavItems from "./DesktopNavItems";

function Header() {
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* MAIN ROW */}
        <div className="flex items-center justify-between h-16">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-3">
            {/* Hamburger (mobile) */}
            <div className="md:hidden flex items-center">
              <HamburgerMenu />
            </div>

            {/* Logo */}
            <h1
              onClick={() => navigate("/")}
              className="text-xl font-bold text-blue-600 cursor-pointer 
              flex items-center h-10"
            >
              MyBlog
            </h1>
          </div>

          

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4 h-10">
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center">
              <DesktopNavItems />
            </div>

            {/* Profile Icon */}
            <div
              onClick={() => navigate(status ? "/settings" : "/login")}
              className="cursor-pointer flex items-center justify-center h-10 w-10 md:hidden"
            >
              {status && user ? (
                <img
                  src={user.avatar.url}
                  alt="profile"
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-3xl text-gray-600 hover:text-black transition" />
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
