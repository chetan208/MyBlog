import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from "react-router-dom";
import Popup from '../popUp';
import AddComment from './addComment';

function Comments({refreshComments,setRefreshComments}) {
    const { id } = useParams();
    const [comments, setComments] = useState([])
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [isEdit, setisEdit] = useState(false)
    const [editableContant, setEditableContent] = useState("")
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const loggedInUserID = useSelector((state) => (state.auth.userData?._id))


    function timeAgo(date) {
        const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

        if (seconds < 60) return "Just now";
        if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} day ago`;

        return new Date(date).toLocaleDateString();
    }

    function handleDelete() {

    }
    useEffect(() => {

        const Getcomments = async () => {
            try {

                const commentObj = await axios.get(`${BACKEND_URL}/api/comment/get-comment/${id}`)
                setComments(commentObj.data.comments.comments)
            } catch (error) {
                console.log("error in fetaching comments", error)
            }
        }
        if (id) Getcomments()
    }, [id,refreshComments])
    return (
        <>

            <AddComment
                number={comments.length}
                isEdit={isEdit}
                editContent={editableContant}
                setRefreshComments={setRefreshComments}
            />
            <div className="mt-6 max-h-70 overflow-y-auto space-y-5 pr-2">
                {comments.map((comment) => (
                    <div
                        key={comment._id}
                        className="flex gap-4 items-start p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition"
                    >
                        {/* Avatar */}
                        <img
                            src={comment.userAvatar || ""}
                            alt="user"
                            className="w-10 h-10 rounded-full object-cover border"
                        />

                        {/* Comment body */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-gray-800">{comment.username}</p>
                                <span className="text-xs text-gray-400">{timeAgo(comment.createdAt)}</span>
                            </div>

                            <p className="mt-1 text-sm text-gray-700 leading-relaxed">
                                {comment.content}
                            </p>

                            {/* Edit & Delete buttons */}
                            {loggedInUserID === comment.createdBy && (
                                <div className="mt-2 flex gap-3">
                                    <button
                                        className="text-blue-500 text-xs font-semibold hover:underline cursor-pointer"
                                        onClick={() => {
                                            setisEdit(true);
                                            setEditableContent(comment.content);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 text-xs font-semibold hover:underline cursor-pointer"
                                        onClick={() => setDeleteOpen(true)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}

                            {/* Delete popup */}
                            <Popup
                                open={deleteOpen}
                                onClose={() => setDeleteOpen(false)}
                                title="Delete Comment"
                                width="380px"
                            >
                                <p className="text-gray-700 text-sm mb-4">
                                    Are you sure you want to delete this comment? This action cannot be undone.
                                </p>

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setDeleteOpen(false)}
                                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </Popup>
                        </div>
                    </div>
                ))}
            </div>

        </>

    );

}

export default Comments