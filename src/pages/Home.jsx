import axios from 'axios';
import { BlogCard } from '../components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Home() {
    const [blogs, setBlogs] = useState([]);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

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

    const userName = useSelector((state) => (state.auth.userName))
    const authStatus = useSelector((state) => (state.auth.status))

    return (
        <div className="min-h-screen bg-gray-100 py-7">

            {/* Unified container for perfect alignment */}
            <div className="max-w-7xl mx-auto w-full  flex flex-col items-center">


                <div className="bg-linear-to-r   from-cyan-400 via-teal-400 to-teal-500 max-w-295 w-[90vw] lg:h-60 
                rounded-lg  shadow-lg p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 
                lg:mx-0 md:mx-3">

                    {/* Greeting Text */}
                    <div className="text-center sm:text-left flex-1">
                        <h2 className="text-white text-2xl sm:text-3xl font-extrabold drop-shadow-lg">

                            {authStatus ? "Hello, " + userName : "Welcome!"}

                        </h2>
                        <p className="text-white text-base sm:text-lg mt-2 sm:mt-3 drop-shadow-md">
                            {
                                authStatus ?
                                    "Every great idea starts with a single word. Share your thoughts with the world today!"
                                    : "Log in to start writing blogs and share your ideas with the world."
                            }

                        </p>
                        <p className="text-white text-base sm:text-lg mt-2 sm:mt-3 drop-shadow-md" >Sorry! This site is currently under maintenance. Some features may be temporarily unavailable.</p>
                    </div>

                    {/* Write Blog Button */}
                    <button className="mt-4 sm:mt-0 px-6 py-2 bg-white text-purple-600 font-semibold rounded-md shadow-md hover:bg-gray-100 transition cursor-pointer"
                        onClick={() => {
                            authStatus ? (navigate("/add-blog")) : (navigate("/login"))
                        }}>
                        {
                            authStatus ? "Write a Blog" : "Login"
                        }

                    </button>

                </div>


                {/* Blog grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 mg:grid-cols-3 lg:grid-cols-3 gap-6 w-full lg:pl-12 md:pl-10 sm:pl-8 p-3 ">

                    {
                        blogs.length === 0 ? (
                            <h3>Currently No Blog to View</h3>
                        ) :
                            (
                                blogs.map((blog) => (
                                    <BlogCard key={blog._id} blog={blog} />
                                ))
                            )
                    }



                </div>

            </div>
        </div>
    );
}
