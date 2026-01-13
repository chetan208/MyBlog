import React, { useEffect, useState } from "react";
import { Share2, Settings } from "lucide-react";
import { useSelector } from "react-redux";
import SkeletonCard from "../components/Blog/SkeletonCard";
import BlogCard from "../components/Blog/Card";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Popup } from "../components";
import {
  FaCheck,
  FaFacebook,
  FaLink,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";

const ProfilePage = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { id } = useParams();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.auth.userData);

  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(6);

  const [openShare, setOpenShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  /* ================= FETCH USER ================= */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/finduser/${id}`);
        setUser(res.data); // backend should return user object directly
      } catch (err) {
        console.log("User fetch error:", err);
      }
    };

    fetchUser();
  }, [id]);

  /* ================= FETCH BLOGS ================= */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${BACKEND_URL}/api/blog/user-blogs/${id}`
        );
        setBlogs(res.data.blogs || []);
      } catch (err) {
        console.log("Blogs fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [id]);

  /* ================= RESPONSIVE LIMIT ================= */
  useEffect(() => {
    const handleResize = () => {
      setLimit(window.innerWidth >= 1024 ? 6 : 4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  const isOwner = loggedInUser?._id === id;
  const hasBlogs = blogs.length > 0;
  const profileUrl = window.location.href;

  /* ================= JSX ================= */
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* ================= PROFILE CARD ================= */}
      <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-md border dark:border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-transparent to-transparent dark:from-indigo-900/10 pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* LEFT */}
          <div className="flex items-center gap-5">
            <div className="p-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
             <img
  src={user.avatar?.url}
  alt="profile"
  onClick={() => setOpenImage(true)}
  className="w-24 h-24 rounded-full object-cover bg-white cursor-pointer
             hover:opacity-90 transition"
/>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {user.fullName}
              </h2>
              <p className="text-xs text-gray-500">{user.email}</p>

              {user.bio && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-md">
                  {user.bio}
                </p>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenShare(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium cursor-pointer
              rounded-xl bg-indigo-600 text-white hover:bg-indigo-700
              transition shadow-sm"
            >
              <Share2 size={16} />
              Share Profile
            </button>

            {isOwner && (
              <button
                onClick={() => navigate("/settings")}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium cursor-pointer
                rounded-xl border dark:border-gray-700
                bg-gray-50 dark:bg-gray-800
                text-gray-700 dark:text-gray-300
                hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <Settings size={16} />
                Settings
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= BLOGS SECTION ================= */}
      <div className="space-y-5 p-3 md:p-0">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {isOwner ? "My Blogs" : `Blogs by ${user.fullName}`}
          </h3>

          {hasBlogs && (
            <span className="text-sm text-gray-500">
              {blogs.length} blogs
            </span>
          )}
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: limit }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : !hasBlogs ? (
          <div className="text-center py-16 text-gray-500 px-4">
            <p className="text-lg mb-1">No blogs yet..</p>
            <p>This user hasn’t published any blogs.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 ">
            {blogs.slice(0, limit).map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>

      {/* ================= SHARE POPUP ================= */}
      <Popup
        open={openShare}
        onClose={() => setOpenShare(false)}
        title="Share Profile"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
          Share this profile with others
        </p>

        {/* COPY LINK */}
        <div className="flex items-center gap-2 p-3 rounded-xl border bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
          <FaLink className="text-gray-400" />

          <p className="flex-1 text-sm truncate text-gray-700 dark:text-gray-300">
            {profileUrl}
          </p>

          <button
            onClick={() => {
              navigator.clipboard.writeText(profileUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {copied ? (
              <FaCheck className="text-green-500" />
            ) : (
              <MdContentCopy />
            )}
          </button>
        </div>

        {copied && (
          <p className="text-xs text-green-600 text-center mt-2">
            Link copied to clipboard
          </p>
        )}

        {/* SOCIAL */}
        <div className="flex justify-center gap-6 mt-6">
          <a
            href={`https://wa.me/?text=${profileUrl}`}
            target="_blank"
            className="p-3 rounded-full border hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600"
          >
            <FaWhatsapp size={22} />
          </a>

          <a
            href={`https://twitter.com/intent/tweet?url=${profileUrl}`}
            target="_blank"
            className="p-3 rounded-full border hover:bg-sky-100 dark:hover:bg-sky-900/30 text-sky-500"
          >
            <FaTwitter size={22} />
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${profileUrl}`}
            target="_blank"
            className="p-3 rounded-full border hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600"
          >
            <FaFacebook size={22} />
          </a>
        </div>
      </Popup>

      {openImage && (
  <div
    className="fixed inset-0 z-50 bg-black/80
               flex items-center justify-center p-4"
    onClick={() => setOpenImage(false)}
  >
    <img
      src={user.avatar?.url}
      alt="Profile Preview"
      onClick={(e) => e.stopPropagation()}
      className="max-h-[90vh]  max-w-[90vw] md:h-100 md:w-100 rounded-xl object-contain"
    />
  </div>
)}
    </div>
  );
};

export default ProfilePage;
