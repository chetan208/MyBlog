import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function AddComment() {

    const [content, setcontent] = useState("")
    const [loading, setloading] = useState(false)
    const [btnDissabled, setBtnDissable] = useState(true)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const { id } = useParams()


    useEffect(() => {
        if (content) {
            setBtnDissable(false);
        } else {
            setBtnDissable(true);
        }
    }, [content]);

    async function postComment() {
        setloading(true)
        try {
            await axios.post(`${BACKEND_URL}/api/comment/add/${id}`, {
                content
            }, { withCredentials: true })
            setloading(false)
        } catch (error) {
            console.log("error in adding comment", error)
        }
    }

    return (
        <>
            <textarea
                rows="3"
                placeholder="Write a comment..."
                value={content}

                onChange={(e) => setcontent(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
                disabled={btnDissabled}
                className={`mt-3 w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 text-white transition-all duration-300 cursor-pointer
                    ${loading
                        ? "bg-blue-400 cursor-not-allowed opacity-70"
                        : "bg-blue-600 hover:bg-blue-700 active:scale-99"
                    }
  `}
                onClick={postComment}
            >
                {loading ? (
                    <>
                        {/* Spinner */}

                        <div className=" flex justify-center w-full" >
                            <div className="mr-1" ><span className="w-5 h-5 border-2 cursor-not-allowed border-white border-t-transparent rounded-full animate-spin inline-block"></span></div>
                            <p>Posting...</p>
                        </div>

                    </>
                ) : (
                    "Post"
                )}
            </button>
        </>

    )
}

export default AddComment