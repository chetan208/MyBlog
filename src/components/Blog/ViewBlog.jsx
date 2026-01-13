import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { SlLike } from "react-icons/sl";
import { FaRegShareSquare } from "react-icons/fa";
import BlogActionMenu from "./BlogOption";
import { useDispatch } from "react-redux";
import { addblog } from "../../store/blogslice";
import AddComment from "./addComment";
import Comments from "./ViewComments";
import Popup from "../popUp";
import { FaWhatsapp, FaTwitter, FaFacebook } from "react-icons/fa";
import { FaLink, FaCheck } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";



export default function ViewBlog() {
  const [likes, setLikes] = useState(0);   // dummy count
  const [liked, setLiked] = useState(false);

  const [refreshLike, setRefreshLike] = useState(false);
  const dispatch = useDispatch()
  const [copied, setCopied] = useState(false);

  const [blog, setBlog] = useState({})
  const [user, setuser] = useState("");
  const [refreshComments, setRefreshComments] = useState(false);
  const [openShare, setOpenShare] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const { id } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const getBlog = async (id) => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/blog/${id}`, { withCredentials: true });



        if (res.data.success) {
          setBlog(res.data.blog);
          dispatch(addblog(res.data.blog));
        } else {
          console.log(res.data);
        }

      } catch (error) {
        console.log(error);
      }
    };
    getBlog(id);

  }, []);

  useEffect(() => {
    const findUser = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/finduser/${blog.createdBy}`
        );
        setuser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (blog?.createdBy) {
      findUser();
    }
  }, [blog?.createdBy]);

  useEffect(() => {
    const getlikes = async (id) => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/blog/like/${id}`, { withCredentials: true })


        setLikes(res.data.likeCount)
        setLiked(res.data.likedByCurrentUser)
      } catch (error) {
        console.log("error in fetching likes", error.message)
      }
    }

    getlikes(id)
  }, [refreshLike])

  async function handleLikeClick() {

    setLiked(prev => !prev);

    setLikes(prev => liked ? prev - 1 : prev + 1);
    try {

      const res = await axios.post(`${BACKEND_URL}/api/blog/like/${id}`, {}, { withCredentials: true })
      if (res.data.success) {

        setRefreshLike((prev) => !prev)
      }

    } catch (error) {
      console.log("error occured while adding like")
    }
  }

  return (
    <>
      <div className=" min-h-screen px-4 py-6">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT : BLOG CONTENT */}
          <div className="lg:col-span-2 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 overflow-hidden">

            {/* Cover */}
            <div className="w-full h-80 md:h-96 lg:h-[30rem] overflow-hidden rounded-t-xl dark:bg-gray-900 dark:border-2 ">
              <img
                src={blog.coverImageURL?.url}
                alt="cover"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Content */}
            <div className="p-5 md:p-8">

              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold dark:text-gray-100">
                    {blog.title}
                  </h1>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    By <span className="font-medium dark:text-gray-300">{user.fullName}</span> • {new Date(blog.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <BlogActionMenu user={user} />
              </div>

              <hr className="my-6 dark:border-gray-700" />
              <div className="relative">

                <div
                  className={`
      blog-content max-w-none dark:text-gray-200
      overflow-hidden transition-all duration-300
      ${expanded ? "max-h-full" : "max-h-65"}
    `}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(blog.body),
                  }}
                />

                {/* Fade overlay when collapsed */}
                {!expanded && (
                  <div
                    className="absolute bottom-0 left-0 w-full h-28
        bg-linear-to-t
        dark:from-gray-800
        to-transparent"
                  />
                )}

              </div>

              <button
                onClick={() => setExpanded(prev => !prev)}
                className="
    mt-4 text-teal-500 hover:text-teal-600
    font-medium cursor-pointer
    transition
  "
              >
                {expanded ? "Read less" : "Read more"}
              </button>



              {/* LIKE / SHARE */}
              <div className="flex items-center gap-6 mt-10">

                {/* LIKE */}
                <button
                  onClick={handleLikeClick}
                  className="group flex items-center gap-1 cursor-pointer select-none"
                >
                  <BiSolidLike
                    className={`
        text-xl transition-all duration-200
        ${liked
                        ? "text-teal-500 scale-110"
                        : "text-gray-500 dark:text-gray-400 group-hover:text-teal-400"}
      `}
                  />

                  <span
                    className={`
        text-sm transition-colors
        ${liked
                        ? "text-teal-500"
                        : "text-gray-500 dark:text-gray-400"}
      `}
                  >
                    {likes}
                  </span>
                </button>

                {/* SHARE */}
                <button
                  onClick={() => setOpenShare(true)}
                  className="
      cursor-pointer text-xl
      text-gray-500 dark:text-gray-400
      hover:text-teal-500
      transition-all duration-200
      active:scale-95
    "
                >
                  <FaRegShareSquare />
                </button>

              </div>




            </div>
          </div>

          {/* RIGHT : AUTHOR + COMMENTS */}
          <div className="lg:col-span-1">
            {/* Sticky Sidebar */}
            <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 flex flex-col gap-6 lg:sticky lg:top-18 max-h-[calc(100vh-2.5rem)]">

              {/* AUTHOR CARD */}
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar?.url || ""}
                  alt="author"
                  className="w-14 h-14 rounded-full object-cover border dark:border-gray-700"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{user.fullName}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{blog.discription}</p>

              {/* COMMENTS */}
              <div className="flex-1 space-y-4 pr-2">
                <Comments refreshComments={refreshComments} setRefreshComments={setRefreshComments} />
              </div>

            </div>
          </div>

        </div>
      </div>

      <Popup
        open={openShare}
        onClose={() => setOpenShare(false)}
        title="Share this blog"
      >
        {/* Link copy box */}
        <div
          className="flex items-center gap-2 p-2 rounded-lg border
             bg-gray-50 dark:bg-gray-900
             border-gray-300 dark:border-gray-700"
        >
          <FaLink className="text-gray-400 dark:text-gray-500" />

          <p className="flex-1 text-sm truncate
                text-gray-700 dark:text-gray-300">
            {window.location.href}
          </p>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="p-2 rounded-md
               hover:bg-gray-200 dark:hover:bg-gray-800
               text-gray-600 dark:text-gray-300
               transition"
          >
            {copied ? <FaCheck size={18} /> : <MdContentCopy size={18} />}
          </button>
        </div>



        {/* Other options */}
        <div className="flex items-center justify-center gap-6 mt-4">

          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${window.location.href}`}
            target="_blank"
            className="p-3 rounded-full border
               hover:bg-green-100 dark:hover:bg-green-900/30
               text-green-600 dark:text-green-400"
          >
            <FaWhatsapp size={22} />
          </a>

          {/* Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
            target="_blank"
            className="p-3 rounded-full border
               hover:bg-sky-100 dark:hover:bg-sky-900/30
               text-sky-500 dark:text-sky-400"
          >
            <FaTwitter size={22} />
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target="_blank"
            className="p-3 rounded-full border
               hover:bg-blue-100 dark:hover:bg-blue-900/30
               text-blue-600 dark:text-blue-400"
          >
            <FaFacebook size={22} />
          </a>

        </div>


      </Popup>


    </>
  );
}
