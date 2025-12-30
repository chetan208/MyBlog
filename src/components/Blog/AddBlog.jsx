import React, { useState } from "react";
import RTE from "./RTE";
import { useSelector } from "react-redux";
import { Button } from "../index"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function AddBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [loading, setloading]=useState(false)

    const navigate=useNavigate();
    

    const userName = useSelector((state) => state.auth.userName);

    const handleImage = (file) => {
        if (!file) return;
        setCoverImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", content);
        formData.append("coverImage", coverImage);
        setloading(true)

        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

        try{
            const response= await axios.post(`${BACKEND_URL}/api/blog/add-blog`, formData,{
            withCredentials: true })
        }catch(err){
            console.log(err)
        }
        finally{
            setloading(false)
            navigate("/")

        }

        
}

window.addEventListener("resize", () => {
  setScreenWidth(window.innerWidth)
});

 return (
        <div className="max-w-7xl mx-auto px-4 py-3">
            {/* Header */}
            <h1 className="font-sans font-semibold text-2xl text-gray-800 mb-4">
                Hey {userName}, Start writing your new blog.
            </h1>

            

            <form onSubmit={handleSubmit}>
                {/* Responsive grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Title */}
                        <div>
                            <label className="block font-semibold mb-1 order-1">
                                Blog Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter blog title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>


                        {
                            screenWidth < 1024 ? (
                                <>
                                <div
                                    className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
                                    hover:border-blue-500 transition order-2 lg:order-3"
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        handleImage(e.dataTransfer.files[0]);
                                    }}
                                    onClick={() =>
                                        document.getElementById("coverInput").click()
                                    }
                                >
                                    <h2 className="font-semibold mb-2">
                                        Cover Image
                                    </h2>

                                    {preview ? (
                                        <>
                                            <div className="border-2 relative" >
                                                <button
                                                    onClick={() => {
                                                         setPreview(false);
                                                         const input = document.getElementById("coverInput");
                                                          input.value = "";
                                                    }}
                                                    className="  absolute -top-3 -right-3 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-200"
                                                    
                                                >
                                                    ✕
                                                </button>
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="h-full w-full object-cover rounded-md z-5"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="h-44 flex flex-col items-center justify-center text-gray-400 text-sm">
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
                                        onChange={(e) =>
                                            handleImage(e.target.files[0])
                                        }
                                    />
                                </div>

                        </>
                            ) : null
                        }

                        {/* Editor */}
                        <div>
                            <label className="block font-semibold mb-2">
                                Content
                            </label>

                            {/* Editor wrapper */}
                            <div className="border rounded-lg ">
                                <RTE
                                    value={content}
                                    onChange={setContent}
                                    height={400}
                                />
                            </div>
                        </div>

                        {/* Publish */}

                       
                         <Button
                                    type="submit"
                                    className={`w-33 md:w-35 lg:w-38 px-3 md:px-5 lg:px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                                         ${loading? "bg-blue-400 cursor-not-allowed": "bg-blue-500 hover:bg-blue-600 cursor-pointer active:scale-98"}`}

                                    disabled={loading}
                                >
                                {loading ? (
            <>
              {/* Spinner */}

              <div className=" flex w-full" >
                <div className="mr-1" ><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span></div>
                <p>Processing...</p>
              </div>

            </>
          ) : (
            "Publish Blog"
          )}
                                
                                </Button>


                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-6">
                        {/* Drag & Drop */}


                        {
                            screenWidth > 1024 ? (
                               
                                <div
                                    className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
                         hover:border-blue-500 transition order-2 lg:order-3"
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        handleImage(e.dataTransfer.files[0]);
                                    }}
                                    onClick={() =>
                                        document.getElementById("coverInput").click()
                                    }
                                >
                                    <h2 className="font-semibold mb-2">
                                        Cover Image
                                    </h2>

                                    {preview ? (
                                        <>
                                            <div className="border-2 relative" >
                                                <button
                                                onClick={() => {
                                                    setPreview(false);
                                                         const input = document.getElementById("coverInput");
                                                          input.value = "";
                                                }}
                                                    className="  absolute -top-3 -right-3 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-200"
                                                >
                                                    ✕
                                                </button>
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="h-full w-full object-cover rounded-md z-5"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="h-44 flex flex-col items-center justify-center text-gray-400 text-sm">
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
                                        onChange={(e) =>
                                            handleImage(e.target.files[0])
                                        }
                                    />
                                </div>
                            ) : null
                        }




                        {/* Tips */}
                        <div className="border rounded-lg p-4 bg-gray-50">
                            <h2 className="font-semibold mb-2">
                                Tips / Info
                            </h2>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
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
    };

    

   

