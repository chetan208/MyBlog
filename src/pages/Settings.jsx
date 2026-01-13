import React, { useState } from "react";
import Profile from "../components/Settings/Profile";
import Account from "../components/Settings/Account";
import Security from "../components/Settings/Security";
import Danger from "../components/Settings/Danger";
import Appearence from "../components/Settings/Appearence";


export default function SettingsPage() {
  
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  console.log(activeTab)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 md:flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-semibold mb-6">Settings</h2>
        <nav className="space-y-2">
          {[["profile","Profile"],["account","Account"],["security","Security"],["appearance","Appearance"],["danger","Danger"]].map(([key,label])=> (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab===key ? "bg-indigo-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >{label}</button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your BlogIt account</p>
        </div>

        {/* MOBILE: options list */}
        <div className="md:hidden">
          {!activeTab && (
            <div className="space-y-3">
              {[['profile','Profile'],['account','Account'],['security','Security'],['appearance','Appearance'],['danger','Danger Zone']].map(([key,label]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className="w-full flex justify-between items-center p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                >
                  <span className="font-medium">{label}</span>
                  <span className="text-gray-400">›</span>
                </button>
              ))}
            </div>
          )}

          {activeTab && (
            <div className="mb-4">
              <button
                onClick={() => setActiveTab(null)}
                className="text-sm text-indigo-600"
              >
                ← Back to Settings
              </button>
            </div>
          )}
        </div>

        {/* DESKTOP + MOBILE CONTENT */}
        {activeTab === 'profile' && (
          <Profile/>
        )}

        {activeTab === 'account' && (

          <Account setActiveTab={setActiveTab} />

        )}

        {activeTab === 'security' && (
          <Security />
        )}

        {activeTab === 'appearance' && (
         <Appearence />
        )}

        {activeTab === 'danger' && (
         <Danger/>
        )}
      </main>
    </div>
  );
}
