import React from "react";
import { useSelector } from "react-redux";

function Account({ setActiveTab }) {
  const user = useSelector((state) => state.auth.userData);

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl p-5 sm:p-6 shadow-sm space-y-5">
      <h2 className="text-lg font-medium">Account</h2>

      {/* Email Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </span>

        <span className="text-sm text-gray-500 break-all sm:break-normal sm:text-right">
          {user?.email}
        </span>
      </div>

      {/* Change Password */}
      <button
        onClick={() => setActiveTab("security")}
        className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline self-start"
      >
        Change Password
      </button>
    </div>
  );
}

export default Account;
