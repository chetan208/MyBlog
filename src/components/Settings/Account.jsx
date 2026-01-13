import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Popup from "../popUp";
import deleteAccount from "../../services/auth/deleteAccount";
import { logout as logoutAction } from "../../store/authslice";


function Account({ setActiveTab }) {
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState();
  const [isDeleting, setIsDeleting] = React.useState(false);
 
  // LOGOUT
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  // DELETE ACCOUNT
  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const res=await deleteAccount(password);
      // dispatch(logoutAction());

      
      if(res.success){
        dispatch(logoutAction());
      }
      setError(res.message);
      setIsDeleting(false);

    } catch (error) {
      setError(error.response?.data?.message || "Account deletion failed");
      console.error("Account deletion failed:", error);
    }
    
  };

  console.log(error);
  return (
    <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl p-5 sm:p-6 shadow-sm space-y-5">
      <h2 className="text-lg font-medium">Account</h2>

      {/* Email Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {user.name}
        </span>

        <span className="text-sm text-gray-500 break-all sm:break-normal sm:text-right">
          {user?.email}
        </span>
      </div>

      {/* Change Password */}
      <button
        onClick={() => setActiveTab("security")}
        className="text-sm font-medium text-indigo-600 cursor-pointer dark:text-indigo-400 hover:underline self-start"
      >
        Change Password
      </button>

      {/* Divider */}
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium rounded-lg
          bg-gray-100 dark:bg-gray-800
          text-gray-700 dark:text-gray-300
          hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Logout
        </button>

        {/* Delete Account */}
        <button
          onClick={()=> setIsDeleteOpen(true)}
          className="px-4 py-2 text-sm font-medium rounded-lg
          bg-red-600 text-white
          hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>

      <Popup
  open={isDeleteOpen}
  onClose={() => setIsDeleteOpen(false)}
  title=""
>
  <div className="flex flex-col items-center text-center space-y-4">
    {/* Icon */}
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
      <svg
        className="w-6 h-6 text-red-600 dark:text-red-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>

    {/* Text */}
    <div className="space-y-1">
      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
        Delete Account
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        This action is permanent and cannot be undone.
        <br />
        Please enter your password to confirm.
      </p>
    </div>

    {/* Password Input */}
    <input
      type="password"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-3 py-2 text-sm rounded-lg
      border border-gray-300 dark:border-gray-700
      bg-white dark:bg-gray-800
      text-gray-800 dark:text-gray-200
      focus:outline-none focus:ring-2 focus:ring-red-500"
    />

     {error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

    {/* Actions */}
    <div className="flex w-full gap-3 pt-2">
      <button
        onClick={() => setIsDeleteOpen(false)}
        className="w-full px-4 py-2 text-sm font-medium rounded-lg
        bg-gray-100 dark:bg-gray-800
        text-gray-700 dark:text-gray-300
        hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        Cancel
      </button>

      <button
        onClick={handleDeleteAccount}
        disabled={!password}
        className="w-full px-4 py-2 text-sm font-medium rounded-lg
        bg-red-600 text-white
        hover:bg-red-700
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
       {
        isDeleting ? "Deleting..." : "Delete Account"
       }
      </button>
    </div>
  </div>
  
      </Popup>

    </div>
  );
}

export default Account;
