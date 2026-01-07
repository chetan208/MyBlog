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



export default function ViewBlog() {

  const dispatch = useDispatch()

  const [blog, setBlog] = useState({})
  const [user, setuser] = useState("");
  const [refreshComments, setRefreshComments] = useState(false);

  const { id } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    const getBlog = async (id) => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/blog/${id}`);

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



  return (
    <div className="bg-gray-100 min-h-screen px-4 py-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT : BLOG CONTENT */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden  ">

          {/* Cover */}
          <div className=" md:h-100 lg:h-120 sm:h-90 h-80 py-3 flex items-center justify-center">
            <img
              src={blog.coverImageURL?.url}
              alt="cover"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Content */}
          <div className="p-5 md:p-8">

            <div className="flex justify-between" >
              <div className="p-1" >
                <h1 className="text-3xl md:text-4xl font-bold">
                  {blog.title}
                </h1>

                <p className="text-sm text-gray-500 mt-2">
                  By <span className="font-medium">{user.fullName}</span> • {new Date(blog.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <BlogActionMenu user={user} />
            </div>

            <hr className="my-6" />

            <div className="blog-content max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.body),
              }}
            >

            </div>

            {/* TAGS
            <div className="flex flex-wrap gap-2 mt-8">
              {["React", "WebDev", "JavaScript"].map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div> */}

            {/* LIKE / SHARE (INSIDE CONTENT) */}
            <div className="flex gap-4 mt-8">
              <button className="px-5 py-2 bg-red-100 rounded-lg hover:bg-red-200">
                <SlLike />
              </button>
              <button className="px-5 py-2 bg-blue-100 rounded-lg hover:bg-blue-200">
                <FaRegShareSquare />
              </button>
            </div>
          </div>
        </div>


        {/* RIGHT : AUTHOR + COMMENTS */}
        <div className="lg:col-span-1">
          {/* Sticky Sidebar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6 lg:sticky lg:top-18 max-h-[calc(100vh-2.5rem)]">

            {/* AUTHOR CARD */}
            <div className="flex items-center gap-4">
              <img
                src={user.avatar?.url || ""}
                alt="author"
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <p className="font-semibold text-gray-900">{user.fullName}</p>
                {/* Optional role */}
                {/* <p className="text-sm text-gray-500">Full Stack Developer</p> */}
              </div>
            </div>
            <p className="text-sm text-gray-600">{blog.discription}</p>

            {/* COMMENTS */}
            <div className="flex-1   space-y-4 pr-2">
              <Comments refreshComments={refreshComments} setRefreshComments={setRefreshComments} />
            </div>

          </div>
        </div>



      </div>
    </div>
  );
}
