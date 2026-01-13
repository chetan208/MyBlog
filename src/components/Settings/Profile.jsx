import React, { useState, useRef } from "react";
import { CiEdit } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import checkAuth from "../../services/auth/checkAuth";
import Popup from "../popUp";




function Profile() {
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  const user = useSelector((state) => state.auth.userData);
  const [fullName, setFullName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useParams();

  const displayImage = profilePicUrl || user?.avatar?.url;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfilePic(file);
    setProfilePicUrl(URL.createObjectURL(file));
  };

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  
      const handleSubmit = async () => {
          try {
              setLoading(true);
              const formData = new FormData();
              formData.append("fullName", fullName);
              formData.append("bio", bio);
              formData.append("profileChanged", profilePic ? "true" : "false");
              if (profilePic) {
                  formData.append("profilePic", profilePic);
              }
              const res=await axios.post(`${BACKEND_URL}/api/change-profile`, formData, {
                  withCredentials: true,
              });
              
              await checkAuth(dispatch);
              setIsProfileUpdated(true);
              navigate("/settings");
              setLoading(false);
          } catch (error) {
              console.error("Error updating profile:", error);
          }
      }


  return (
    <div className="max-w-2xl bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm space-y-6">
      <h2 className="text-xl font-semibold">Profile Information</h2>

      {/* PROFILE PHOTO */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <div
            onClick={() => displayImage && setShowPreview(true)}
            className="w-20 h-20 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-pointer"
          >
            {displayImage ? (
              <img
                src={displayImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                No Photo
              </div>
            )}
          </div>

          {/* EDIT ICON */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center"
          >
            <CiEdit size={16} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div>
          <button
            onClick={() => fileInputRef.current.click()}
            className="text-sm text-indigo-600 dark:text-indigo-400 font-medium"
          >
            Change profile photo
          </button>
          <p className="text-xs text-gray-500 mt-1">
            JPG, PNG up to 5MB
          </p>
        </div>
      </div>

      {/* FORM */}
     {/* FORM */}
<div className="space-y-5">
  
  {/* FULL NAME */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
      Full Name
    </label>
    <input
      type="text"
      placeholder="Enter your full name"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none"
    />
  </div>

  {/* BIO */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
      Bio
    </label>
    <textarea
      rows={3}
      placeholder="Tell something about yourself"
      value={bio}
      onChange={(e) => setBio(e.target.value)}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 resize-none outline-none"
    />
  </div>

</div>


      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* IMAGE PREVIEW */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="relative bg-white dark:bg-gray-800 p-4 rounded-xl">
            <img
              src={displayImage}
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

      <Popup
  open={isProfileUpdated}
  onClose={() => {
    setIsProfileUpdated(false);
    navigate("/settings");
  }}
  title=""
>
  <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
      <svg
        className="w-6 h-6 text-green-600 dark:text-green-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>

    <p className="text-gray-700 dark:text-gray-300 text-sm">
      Your profile has been updated successfully.
      <br />
      Changes are now live on your account.
    </p>
  </div>
</Popup>

    </div>
  );
}

export default Profile;
