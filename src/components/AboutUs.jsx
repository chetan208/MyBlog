import React from "react";

export default function About(ref="") {
  return (
    <div id="about" className="bg-gray-100 min-h-screen py-12 px-4 md:py-16 md:px-8 lg:px-16">
      <div className="max-w-295 w-[90vw] mx-auto bg-gray-50 rounded-2xl shadow-xl p-8 md:p-12 lg:p-16">

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-blue-600 mb-8">
          About BlogIt
        </h1>

        {/* Intro */}
        <p className="text-gray-700 text-base md:text-lg lg:text-xl text-center mb-12 leading-relaxed">
          Welcome to <span className="font-semibold text-blue-500">BlogIt</span>!  
          This is a community where everyone can share their thoughts, experiences, and stories. 
          Discover posts from other users, learn from their perspectives, and contribute your own 
          experiences to inspire others.
        </p>

        {/* About the Creator */}
        <div className="mb-10 p-6 md:p-8 bg-white rounded-xl shadow-md border-l-4 border-teal-400 
                        hover:shadow-xl  transition-transform duration-300">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">About the Creator</h2>
          <p className="text-gray-700 leading-relaxed md:text-base lg:text-lg">
            BlogIt was created by <span className="font-medium text-teal-600">Chetan</span>. 
            It's a platform where users can freely share their experiences, stories, and ideas, 
            and connect with a growing community of bloggers.
          </p>
        </div>

        {/* Why Explore the Blogs */}
        <div className="mb-10 p-6 md:p-8 bg-white rounded-xl shadow-md border-l-4 border-blue-400 
                        hover:shadow-xl  transition-transform duration-300">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Why Explore the Blogs?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed md:text-base lg:text-lg">
            <li>Discover experiences and stories shared by other users</li>
            <li>Gain inspiration and learn from diverse perspectives</li>
            <li>Enjoy a growing collection of insightful and engaging posts</li>
          </ul>
        </div>

        {/* Footer Note */}
        <p className="text-gray-500 text-center mt-12 text-sm md:text-base lg:text-base">
          Thank you for visiting. Keep exploring, learning, and sharing your own stories!
        </p>
      </div>
    </div>
  );
}
