import axios from 'axios';
import { BlogCard } from '../components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Hero() {
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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-7">

            {/* Unified container */}
            <div className="max-w-7xl mx-auto w-full flex flex-col items-center">

                {/* Hero Gradient Container */}
                <div className="bg-linear-to-r from-cyan-400 via-teal-400 to-teal-500 
                    dark:from-gray-800 dark:via-gray-700 dark:to-gray-900
                    max-w-295 w-[90vw] lg:h-60 rounded-lg shadow-xl dark:shadow-gray-900
                    p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 
                    lg:mx-0 md:mx-3">

                    {/* Greeting Text */}
                    <div className="text-center sm:text-left flex-1">
                        <h2 className="text-white  text-2xl sm:text-3xl font-extrabold 
                            drop-shadow-lg dark:drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] dark:text-purple-400">
                            {authStatus ? "Hello, " + userName : "Welcome!"}
                        </h2>
                        <p className="text-white dark:text-gray-300 text-base sm:text-lg mt-2 sm:mt-3 
                            drop-shadow-md dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                            {authStatus ?
                                "Every great idea starts with a single word. Share your thoughts with the world today!"
                                : "Log in to start writing blogs and share your ideas with the world."
                            }
                        </p>
                        <p className="text-white dark:text-gray-200 text-base sm:text-lg mt-2 sm:mt-3 
                            drop-shadow-md dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                            Sorry! This site is currently under maintenance. Some features may be temporarily unavailable.
                        </p>
                    </div>

                    {/* Write Blog Button */}
                    <button className="mt-4 sm:mt-0 px-6 py-2 bg-white dark:bg-gray-800 
                        text-purple-600 dark:text-purple-400 font-semibold rounded-md shadow-md
                        dark:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                        onClick={() => { authStatus ? navigate("/add-blog") : navigate("/login") }}>
                        {authStatus ? "Write a Blog" : "Login"}
                    </button>

                </div>

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

        </div>
    );
}
