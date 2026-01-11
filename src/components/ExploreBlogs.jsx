import axios from 'axios';
import React, { useState, useEffect, use } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BlogCard from './Blog/Card';




function ExploreBlogs() {
    const [blogs, setBlogs] = useState([]);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const [limit, setLimit] = useState(4);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/blog/allblogs`);
                if (res.data.success) {
                    setBlogs(res.data.blogs);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setLimit(window.innerWidth >= 1024 ? 6 : 4);
        };

        handleResize(); // initial
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const userName = useSelector((state) => (state.auth.userName))
    const authStatus = useSelector((state) => (state.auth.status))

    return (
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center">

            <h2 className="text-2xl self-start md:ml-12 ml-5 sm:text-3xl font-bold text-gray-800 dark:text-purple-300 mb-6">
                Recent Blogs
            </h2>
            {/* Blog grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 mg:grid-cols-3 lg:grid-cols-3 gap-6 w-full lg:pl-12 md:pl-10 sm:pl-8 p-3">

                {blogs.length === 0 ? (
                    <h3 className="text-gray-800 dark:text-gray-200">Currently No Blog to View</h3>
                ) : (
                    blogs
                        .slice(0, limit)
                        .map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))
                )}

            </div>

            {/* Explore Button */}
            <div className="flex self-start md:ml-12 ml-5 mt-10">
                <button
                    onClick={() => navigate("/blogs")}
                    className="bg-teal-400 hover:bg-teal-500 text-gray-800 cursor-pointer  dark:bg-purple-400 dark:hover:bg-purple-500 dark:text-gray-100 font-bold py-2 px-6 rounded-full transition-colors duration-300"
                >
                    Explore Blogs →
                </button>
            </div>

        </div>
    )
}

export default ExploreBlogs