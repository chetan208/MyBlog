import React, { useState, useEffect } from "react";
import RTE from "./RTE";
import { useSelector } from "react-redux";
import { Button } from "../index"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditBlog() {
    const navigate = useNavigate();

    const blog = useSelector((state) => state.blog.blogData?.payload)

    useEffect(() => {
        if (!blog) {
            navigate("/");
        }
    }, [blog, navigate]);

    useEffect(() => {
        const handleReload = (e) => {
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener("beforeunload", handleReload);
        return () => window.removeEventListener("beforeunload", handleReload);
    }, []);

    const [title, setTitle] = useState(blog?.title);
    const [content, setContent] = useState(blog?.body);
    const [coverImage, setCoverImage] = useState(blog?.coverImageURL.url);
    const [preview, setPreview] = useState(blog?.coverImageURL.url);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [loading, setloading] = useState(false)

    const userName = useSelector((state) => state.auth.userName);

    const handleImage = (file) => {
        if (!file) return;
        setCoverImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", content);
        formData.append("coverImage", coverImage);
        setloading(true)

        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

        try {
            await axios.patch(
                `${BACKEND_URL}/api/blog/edit-blog/${blog._id}`,
                formData,
                { withCredentials: true }
            )
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
            navigate("/")
        }
    }

    window.addEventListener("resize", () => {
        setScreenWidth(window.innerWidth)
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-3
                         ">
            {/* Header */}
            <h1 className="font-sans font-semibold text-2xl mb-4
                           text-gray-800 dark:text-gray-100">
                Hey {userName}, Start writing your new blog.
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-5">

                        {/* Title */}
                        <div>
                            <label className="block font-semibold mb-1
                                              text-gray-700 dark:text-gray-300">
                                Blog Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter blog title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border rounded-md px-4 py-2
                                           bg-gray-200 dark:bg-gray-900
                                           border-gray-300 dark:border-gray-700
                                           text-gray-800 dark:text-gray-100
                                           focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Mobile Image Upload */}
                        {screenWidth < 1024 && (
                            <div
                                className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
                                           hover:border-blue-500 transition
                                           border-gray-300 dark:border-gray-700"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    handleImage(e.dataTransfer.files[0]);
                                }}
                                onClick={() => document.getElementById("coverInput").click()}
                            >
                                <h2 className="font-semibold mb-2
                                               text-gray-700 dark:text-gray-300">
                                    Cover Image
                                </h2>

                                {preview ? (
                                    <div className="border-2 relative border-gray-300 dark:border-gray-700">
                                        <button
                                            onClick={() => {
                                                setPreview(false);
                                                document.getElementById("coverInput").value = "";
                                            }}
                                            className="absolute -top-3 -right-3
                                                       bg-white dark:bg-gray-800
                                                       text-black dark:text-white
                                                       w-8 h-8 rounded-full shadow-lg
                                                       hover:bg-gray-200 dark:hover:bg-gray-700"
                                        >
                                            ✕
                                        </button>
                                        <img src={preview} className="w-full rounded-md" />
                                    </div>
                                ) : (
                                    <div className="h-44 flex flex-col items-center justify-center
                                                    text-gray-400 dark:text-gray-500 text-sm">
                                        <p>Drag & drop image</p>
                                        <p className="text-xs mt-1">or click to choose</p>
                                    </div>
                                )}

                                <input
                                    id="coverInput"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    disabled={preview}
                                    onChange={(e) => handleImage(e.target.files[0])}
                                />
                            </div>
                        )}

                        {/* Editor */}
                        <div>
                            <label className="block font-semibold mb-2
                                              text-gray-700 dark:text-gray-300">
                                Content
                            </label>
                            <div className="border rounded-lg
                                            border-gray-300 dark:border-gray-700
                                            bg-white dark:bg-gray-900">
                                <RTE value={content} onChange={setContent} height={400} />
                            </div>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-2 rounded-md text-white
                                ${loading
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 active:scale-98"
                                }`}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    Saving...
                                </div>
                            ) : "Edit"}
                        </Button>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">

                        {screenWidth > 1024 && (
                            <div
                                className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
                                           hover:border-blue-500 transition
                                           border-gray-300 dark:border-gray-700"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    handleImage(e.dataTransfer.files[0]);
                                }}
                                onClick={() => document.getElementById("coverInput").click()}
                            >
                                <h2 className="font-semibold mb-2
                                               text-gray-700 dark:text-gray-300">
                                    Cover Image
                                </h2>

                                {preview ? (
                                    <img src={preview} className="rounded-md" />
                                ) : (
                                    <div className="h-44 flex flex-col items-center justify-center
                                                    text-gray-400 dark:text-gray-500 text-sm">
                                        Drag & drop image
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tips */}
                        <div className="border rounded-lg p-4
                                        bg-gray-200 dark:bg-gray-900
                                        border-gray-300 dark:border-gray-700">
                            <h2 className="font-semibold mb-2
                                           text-gray-700 dark:text-gray-300">
                                Tips / Info
                            </h2>
                            <ul className="list-disc list-inside text-sm
                                           text-gray-600 dark:text-gray-400 space-y-1">
                                <li>Keep title short</li>
                                <li>Image size: 1200×630</li>
                                <li>Clear paragraphs</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
}
