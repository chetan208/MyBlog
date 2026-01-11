import axios from "axios";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { useRef, useEffect } from "react";
import { Popup } from "../index"
import EditBlog from "./EditBlog";

export default function BlogActionMenu({ user }) {
  const [open, setOpen] = useState(false);
  const [openpop, setOpenpop] = useState(false);
  const [isBlogDelete, setIsBlogDelete] = useState(false)
  const [loading,setloading]=useState(false)
  const navigate = useNavigate()
  const menuRef = useRef(null);
  const loggedInUserID = useSelector((state) => (state.auth.userData?._id))

  const { id } = useParams()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  async function onDelete() {
    setOpenpop(true);
  }

  async function onPopupDelete() {
    setloading(true)
    const res=await axios.delete(`${BACKEND_URL}/api/blog/delete/${id}`, { withCredentials: true })
    res.data.success? setIsBlogDelete(true):setIsBlogDelete(false)
    setOpenpop(false)
  }

  useEffect(() => {
    if (isBlogDelete) {
      const timer = setTimeout(() => {
        setIsBlogDelete(false);
        navigate('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isBlogDelete, navigate]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    loggedInUserID === user._id ? (
      <div className="relative" ref={menuRef}>
        {/* 3 dot button */}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <BsThreeDotsVertical className="text-xl text-gray-600 dark:text-gray-300 cursor-pointer" />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-xl shadow-lg border dark:border-gray-700 z-50">
            <div className="flex flex-col items-center">
              <button
                onClick={() => navigate(`/edit-blog/${id}`)}
                className="w-full px-4 py-2 text-left flex items-center gap-2 rounded-xl
                           hover:bg-gray-100 dark:hover:bg-gray-800
                           text-gray-700 dark:text-gray-200"
              >
                <FaEdit /> Edit Blog
              </button>

              <button
                onClick={onDelete}
                className="w-full px-4 py-2 text-left flex items-center gap-2 rounded-xl
                           text-red-600 dark:text-red-500
                           hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <MdDelete /> Delete Blog
              </button>
            </div>
          </div>
        )}

        <Popup
          open={openpop}
          onClose={() => setOpenpop(false)}
          title="Delete Blog"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Are you sure you want to delete this blog?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setOpenpop(false)}
              className="px-4 py-2 border rounded-lg cursor-pointer
                         border-gray-300 dark:border-gray-600
                         text-gray-700 dark:text-gray-200"
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 bg-red-600 hover:bg-red-700
                         text-white rounded-lg cursor-pointer"
              onClick={onPopupDelete}
            >
              {loading ? (
                <div className="flex w-full items-center">
                  <div className="mr-1">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                  </div>
                  <p>Deleting...</p>
                </div>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </Popup>

        <Popup
          open={isBlogDelete}
          onClose={() => {
            setIsBlogDelete(false);
            navigate("/");
          }}
          title=""
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-sm">
              The blog has been deleted successfully.
              <br />
              You can create a new blog anytime.
            </p>
          </div>
        </Popup>
      </div>
    ) : null
  )
}
