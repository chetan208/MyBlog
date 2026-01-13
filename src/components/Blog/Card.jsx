import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BlogCard({ blog }) {
  const [user, setUser] = useState("");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const findUser = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/finduser/${blog.createdBy}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (blog?.createdBy) findUser();
  }, [blog?.createdBy]);

  return (
    <div
      onClick={() => navigate(`/blog/${blog._id}`)}
      className="
        w-full
        max-w-sm sm:max-w-xs md:max-w-sm lg:max-w-md
        rounded-md
        overflow-hidden
        bg-gray-200 dark:bg-gray-800
        shadow-md hover:shadow-lg
        transition-all
        cursor-pointer
        flex flex-col
      "
    >
      {/* Image */}
      <div className="w-full aspect-[16/9] overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={blog.coverImageURL?.url}
          alt="cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
        {/* Title */}
        <h2
          className="
            font-semibold
            text-base sm:text-lg md:text-xl
            text-gray-800 dark:text-cyan-200
            line-clamp-2
          "
        >
          {blog.title}
        </h2>

        {/* Description */}
        <p
          className="
            text-xs sm:text-sm
            text-gray-600 dark:text-gray-300
            line-clamp-3
          "
        >
          {blog.discription}
        </p>

        {/* Footer */}
        <div className="mt-auto flex justify-between items-center text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
          <span className="truncate max-w-[60%]">
            By {user.fullName}
          </span>
          <span>
            {new Date(blog.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
