import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function AddComment({ number = 0, isEdit, editContent = "", setRefreshComments, editCommentId, setisEdit }) {

    const [content, setcontent] = useState("")
    const [loading, setloading] = useState(false)
    const [btnDissabled, setBtnDissable] = useState(true)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const { id } = useParams()

    useEffect(() => {
        setcontent(editContent)
    }, [editContent])

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
            setcontent("")
            setRefreshComments(prev => !prev)
            setloading(false)
        } catch (error) {
            console.log("error in adding comment", error)
        }
    }

    return (
        <>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Comments({number})
            </h2>

            <textarea
                rows="2"
                placeholder="Write a comment..."
                value={content}
                onChange={(e) => setcontent(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition-colors"
            />

            <button
                disabled={btnDissabled}
                className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 text-white transition-all duration-300 cursor-pointer
                    ${loading
                        ? "bg-blue-400 cursor-not-allowed opacity-70"
                        : "bg-blue-600 hover:bg-blue-700 active:scale-95 dark:bg-blue-700 dark:hover:bg-blue-600 dark:active:scale-95"
                    }
                `}
                onClick={postComment}
            >
                {loading ? (
                    <div className="flex justify-center w-full">
                        <div className="mr-1">
                            <span className="w-5 h-5 border-2 cursor-not-allowed border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                        </div>
                        <p>Posting...</p>
                    </div>
                ) : (
                    <>
                        {isEdit ? "Edit" : "Post"}
                    </>
                )}
            </button>
        </>
    )
}

export default AddComment;
