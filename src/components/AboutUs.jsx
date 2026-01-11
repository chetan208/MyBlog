import React from "react";

export default function About() {
  return (
    <div
      id="about"
      className="bg-gray-100 dark:bg-gray-900 py-4 px-4 sm:py-8 sm:px-6 md:py-10 md:px-8 lg:px-12 flex justify-center items-center min-h-screen"
    >
      <div className="w-full max-w-296 h-[89vh] bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-none p-4 sm:p-6 md:p-8 lg:p-10
                      flex flex-1 flex-col justify-between">

        {/* Heading */}
        <h1 className="text-center text-blue-600 dark:text-blue-400 font-extrabold "
            style={{ fontSize: 'clamp(1.5rem, 2vw, 3rem)' }}>
          About BlogIt
        </h1>

        {/* Intro */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed md:mb-5 "
           style={{ fontSize: 'clamp(1.2rem, 1.5vw, 1.25rem)' }}>
          Welcome to <span className="font-semibold text-blue-500 dark:text-blue-400">BlogIt</span>!  
          This is a community where everyone can share their thoughts, experiences, and stories. 
          Discover posts from other users, learn from their perspectives, and contribute your own 
          experiences to inspire others.
        </p>

        <div className=" flex flex-col justify-between space-y-4 sm:space-y-6 md:space-y-8">

          {/* About the Creator */}
          <div className="flex-1 p-3 sm:p-4 md:p-6  bg-white dark:bg-gray-700 rounded-xl shadow-md dark:shadow-none border-l-4 border-teal-400 dark:border-teal-500 
                          hover:shadow-xl dark:hover:shadow-none flex flex-col justify-center"
               style={{ fontSize: 'clamp(1rem, 1.2vw, 1.3rem)' }}>
            <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-2"
                style={{ fontSize: 'clamp(1.3rem, 1.5vw, 1.5rem)' }}>
              About the Creator
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              BlogIt was created by <span className="font-medium text-teal-600 dark:text-teal-400">Chetan</span>. 
              It's a platform where users can freely share their experiences, stories, and ideas, 
              and connect with a growing community of bloggers.
            </p>
          </div>

          {/* Why Explore the Blogs */}
          <div className="flex-1 p-3 sm:p-4 md:p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md dark:shadow-none border-l-4 border-blue-400 dark:border-blue-500 
                          hover:shadow-xl dark:hover:shadow-none flex flex-col justify-center"
               style={{ fontSize: 'clamp(1rem, 1.2vw, 1.3rem)' }}>
            <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-2"
                style={{ fontSize: 'clamp(1.3rem, 1.5vw, 1.5rem)' }}>
              Why Explore the Blogs?
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 sm:space-y-2 leading-relaxed">
              <li>Discover experiences and stories shared by other users</li>
              <li>Gain inspiration and learn from diverse perspectives</li>
              <li>Enjoy a growing collection of insightful and engaging posts</li>
            </ul>
          </div>

        </div>

        {/* Footer Note */}
        <p className="text-gray-500 dark:text-gray-400 text-center mt-2"
           style={{ fontSize: 'clamp(1rem, 1vw, 1.2)' }}>
          Thank you for visiting. Keep exploring, learning, and sharing your own stories!
        </p>

      </div>
    </div>
  );
}
