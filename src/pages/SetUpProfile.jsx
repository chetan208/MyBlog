import React, { useState, useRef } from "react";
import setupProfileImg from "../assets/login.png";
import { CiEdit } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";


function SetupProfile() {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [profilePic,setProfilePic] = useState(null)

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const navigate=useNavigate()
  const {email} = useParams()

  const handleNext = async() => {
    setLoading(true);
    // console.log("Full Name:", fullName);
    // console.log("Bio:", bio);
    // console.log("Profile Pic:", profilePic);
    // setTimeout(() => setLoading(false), 2000);

    const formData = new FormData();

      formData.append("email", email);
     formData.append("fullName", fullName);
  formData.append("bio", bio);
  formData.append("profilePic", profilePic);

    try {
       const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
       const res = await axios.post(`${BACKEND_URL}/api/setup-profile`,formData)
       console.log(res.data.message)

       
       navigate("/")
       setLoading(false)
    } catch (error) {
      console.log("error in setting up")
      setLoading(false)
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicUrl(URL.createObjectURL(e.target.files[0]));
      setProfilePic(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      {/* MAIN CARD */}
      <div className="w-full max-w-5xl min-h-[85vh] flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-2xl">

        {/* IMAGE SECTION */}
        <div
          className="w-full md:w-1/2 min-h-[280px] md:min-h-full bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(${setupProfileImg})` }}
        />

        {/* FORM SECTION */}
        <div className="w-full md:w-1/2 flex items-center justify-center py-10">
          <div className="w-full max-w-sm px-6 flex flex-col">

            <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">
              Set up your profile
            </h1>

            {/* PROFILE PICTURE */}
            <div
             onClick={() => fileInputRef.current.click()}
             className="mb-6 flex items-center gap-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-3">

              {/* IMAGE */}
              <div className="relative">
                <div
                  onClick={(e) =>{
                      e.stopPropagation();
                     profilePicUrl && setShowPreview(true)
                  }}
                  className="w-18 h-18 rounded-full overflow-hidden border-2 border-gray-400 dark:border-gray-600 cursor-pointer flex items-center justify-center bg-gray-100 dark:bg-gray-700"
                >
                  {profilePicUrl ? (
                    <img
                      src={profilePicUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      No Photo
                    </span>
                  )}
                </div>

                {/* CUT ICON */}
                {profilePic && (
                  <button
                    onClick={() => {
                        e.stopPropagation();
                        setProfilePicUrl(null)
                    }}
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600"
                  >
                    <CiEdit/>
                  </button>
                )}

                {/* HIDDEN FILE INPUT */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* TEXT */}
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  {profilePic ? "Edit Profile Photo" : "Upload Profile Photo"}
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  JPG, PNG up to 5MB
                </p>
              </div>
            </div>

            {/* FULL NAME */}
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mb-4 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />

            {/* BIO */}
            <textarea
              placeholder="Bio"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mb-4 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 resize-none dark:bg-gray-700 dark:text-white"
            />

            {/* NEXT BUTTON */}
            <button
              onClick={handleNext}
              disabled={loading}
              className={`w-[140px] py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 cursor-pointer
                ${loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 active:scale-95"
                }`}
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Please wait...
                </>
              ) : (
                "Complete Setup"
              )}
            </button>

          </div>
        </div>
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="relative bg-white dark:bg-gray-800 p-4 rounded-xl">
            <img
              src={profilePic}
              alt="Preview"
              className="max-w-[90vw] max-h-[80vh] rounded-lg"
            />
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SetupProfile;
