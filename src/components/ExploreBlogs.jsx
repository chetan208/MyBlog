import axios from 'axios';
import React, { useState, useEffect, use } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BlogCard from './Blog/Card';
import { SkeletonCard } from './Blog/SkeletonCard';




function ExploreBlogs() {
    const [blogs, setBlogs] = useState([]);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const [limit, setLimit] = useState(4);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${BACKEND_URL}/api/blog/allblogs`);
                if (res.data.success) {
                    setBlogs(res.data.blogs);
                }
                setLoading(false);
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
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center px-8 sm:px-2">

            <h2 className="text-3xl self-start md:ml-6 sm:text-4xl font-bold text-gray-800 dark:text-purple-300 mb-6">
                Recent Blogs
            </h2>
            {/* Blog grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 mg:grid-cols-3 lg:grid-cols-3 gap-4 sm:px-6 w-full">

                {loading ? (
                    Array.from({ length: limit }).map((_, i) => (
                        <SkeletonCard key={i} className="rounded-full" />
                    ))
                ) : (
                    blogs
                        .slice(0, limit)
                        .map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))
                )}

            </div>

            {/* Explore Button */}
            <div className="flex  self-start  md:ml-6  mt-5 md:mt-8">
                <button
                    onClick={() => navigate("/blogs")}
                    className="bg-teal-400 md:w-50 md:h-13 md:text-xl hover:bg-teal-500 text-gray-800 cursor-pointer  dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-gray-100 font-bold py-2 px-6 rounded-full transition-colors duration-300"
                >
                    Explore Blogs →
                </button>
            </div>

        </div>
    )
}

export default ExploreBlogs