// BlogCard.jsx
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function BlogCard({ blog }) {
  const [user, setuser] = useState("");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()

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
    <div className="w-full sm:w-75 lg:w-89 h-85 p-3 rounded-lg shadow-md overflow-hidden bg-gray-50 flex flex-col"
    onClick={()=>{
           navigate(`/blog/${blog._id}`)
    }}
    >
  {/* Image */}
  <div className="h-48 w-full overflow-hidden">
    <img
      src={blog.coverImageURL.url}
      alt="coverimage"
      className="w-full h-full object-contain rounded-md"
    />
  </div>

  {/* Content */}
  <div className="p-4 flex-1 flex flex-col justify-between">
    {/* Title */}
    <h2 className="text-xl font-bold text-gray-800">{blog.title}</h2>

    {/* Body */}
    <div
      className="text-gray-600 text-sm line-clamp-3 mt-2"
    >{blog.discription}</div>

    {/* Author & Date */}
    <div className="flex justify-between items-center text-gray-500 text-xs mt-4">
      <span>By {user.fullName}</span>
      <span>{new Date(blog.updatedAt).toLocaleDateString()}</span>
    </div>
  </div>

</div>

  );
}
