import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { SlLike } from "react-icons/sl";
import { FaRegShareSquare } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import BlogActionMenu from "./BlogOption";


export default function ViewBlog() {

  const [blog, setBlog] = useState({})
  const [user, setuser] = useState("");

  const { id } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {

    try {
      async function getBlog(id) {
        const res = await axios.get(`${BACKEND_URL}/api/blog/${id}`)

        res.data.success ? setBlog(res.data.blog) : console.log(res.data)
      }

      getBlog(id);
    } catch (error) {
      console.log(error)
    }

  }, [])

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

           <div className="flex" >
             <div className="p-1" >
              <h1 className="text-3xl md:text-4xl font-bold">
              {blog.title}
            </h1>

            <p className="text-sm text-gray-500 mt-2 ml-1">
              By <span className="font-medium">{user.fullName}</span> • {new Date(blog.updatedAt).toLocaleDateString()}
            </p>
             </div>
             {/* {three dot} */}
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
                <SlLike/>
              </button>
              <button className="px-5 py-2 bg-blue-100 rounded-lg hover:bg-blue-200">
                <FaRegShareSquare/>
              </button>
            </div>
          </div>
        </div>


        {/* RIGHT : AUTHOR (TOP) + COMMENTS */}
        <div className="space-y-6">

          {/* AUTHOR CARD (TOP RIGHT) */}
          <div className="bg-white rounded-xl shadow-md p-5 lg:sticky lg:top-23">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar?.url || null}
                alt="author"
                className="w-14 h-14 rounded-full"
              />
              <div>
                <p className="font-semibold">{user.fullName}</p>

                {/* <p className="text-sm text-gray-500">
                  Full Stack Developer
                </p> */}

              </div>
            </div>

            <p className="text-sm text-gray-600 mt-3">
              {blog.discription}
            </p>

          </div>

          {/* COMMENTS */}
          {/* <div className="bg-white rounded-xl shadow-md p-5 lg:sticky lg:top-66">
            <h2 className="text-lg font-semibold mb-3">Comments</h2>

            <textarea
              rows="3"
              placeholder="Write a comment..."
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Post Comment
            </button>

            <div className="mt-5 space-y-4">
              <div className="flex gap-3">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="user"
                  className="w-9 h-9 rounded-full"
                />
                <div className="bg-gray-100 p-3 rounded-lg text-sm">
                  <p className="font-semibold">User123</p>
                  <p>This blog was very helpful.</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3">
                <img
                  src="https://i.pravatar.cc/41"
                  alt="user"
                  className="w-9 h-9 rounded-full"
                />
                <div className="bg-gray-100 p-3 rounded-lg text-sm">
                  <p className="font-semibold">DevGuy</p>
                  <p>Loved the consistency part.</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </div> */}

        </div>


      </div>
    </div>
  );
}
