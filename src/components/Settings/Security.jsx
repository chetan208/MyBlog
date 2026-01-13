import React, { useState } from 'react'
import axios from 'axios';
import Popup from '../popUp';
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Security() {
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [error, setError] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${BACKEND_URL}/api/change-password`,
        { oldPassword, newPassword },
        { withCredentials: true }
      );

      setIsPasswordUpdated(true);
      setOldPassword('');
      setNewPassword('');
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // auto hide error
  if (error) {
    setTimeout(() => setError(null), 3000);
  }

  return (
    <div className="max-w-2xl bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-medium">Security</h2>

      {/* Old Password */}
      <div className="relative">
        <input
          type={showOldPassword ? "text" : "password"}
          className="w-full p-3 pr-10 rounded-lg bg-gray-100 dark:bg-gray-800"
          placeholder="Old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={() => setShowOldPassword(!showOldPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {/* New Password */}
      <div className="relative">
        <input
          type={showNewPassword ? "text" : "password"}
          className="w-full p-3 pr-10 rounded-lg bg-gray-100 dark:bg-gray-800"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={() => setShowNewPassword(!showNewPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
      >
        {loading ? 'Updating...' : 'Update Password'}
      </button>

      <Popup
        open={isPasswordUpdated}
        onClose={() => {
          setIsPasswordUpdated(false);
          navigate("/settings");
        }}
        title=""
      >
        <div className="flex flex-col items-center text-center px-2">
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
                d="M9 12l2 2 4-4"
              />
            </svg>
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Your password has been changed successfully.
            <br />
            Please use your new password the next time you sign in.
          </p>
        </div>
      </Popup>
    </div>
  );
}

export default Security;
