import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import profileimg from "./profile.png";
import { MdArrowDropDown } from "react-icons/md";
import {logout as logoutAction} from "../../store/authslice";
import logout from "../../services/auth/logout"
import deleteAccount from "../../services/auth/deleteAccount";

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const userName = useSelector((state) => state.auth.userName);
  const profileimgUrl=useSelector((state)=>(state.auth.userData.avatar.url));
  const publicId=useSelector((state)=>(state.auth.userData.avatar.publicId));

  console.log(publicId)

  const capitalize = (str = "") =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // Click outside dropdown to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };


    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile button */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center cursor-pointer select-none"
      >
        <img
          src={profileimgUrl}
          alt="profile"
          className="w-8 h-8 rounded-full mr-1"
        />
        <span className="text-md font-bold">{capitalize(userName)}</span>
        <MdArrowDropDown
          className={`text-3xl ml-1 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
          <button
            onClick={() => navigate("/profile")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            My Profile
          </button>
          <button
            onClick={() => navigate("/add-blog")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Write Blog
          </button>
          <button
            onClick={async (e) => {
              e.stopPropagation();
              try {
                await logout(); // backend logout
                dispatch(logoutAction()) // update redux state
                setOpen(false); // dropdown close, optional
                navigate("/");
              } catch (err) {
                console.error("Logout failed:", err);
              }
            }}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>

            <button
            onClick={async (e) => {
              e.stopPropagation();
              try {
                await deleteAccount(); // backend logout
                dispatch(logoutAction()) // update redux state
                setOpen(false); // dropdown close, optional
                navigate("/");
              } catch (err) {
                console.error("Logout failed:", err);
              }
            }}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            Delete
          </button>

        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
