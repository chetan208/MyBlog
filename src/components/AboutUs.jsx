import React from "react";

export default function About() {
  return (
    <div
      id="about"
      className="
        min-h-screen flex justify-center items-start
       
        px-3 py-8 sm:px-6 sm:py-16
      "
    >
      <div
        className="
          w-full max-w-md sm:max-w-3xl lg:max-w-305
          bg-gray-200 dark:bg-[#111827]
          rounded-xl shadow-lg dark:shadow-none
          px-4 py-6 sm:px-8 sm:py-10
          space-y-6
        "
      >
        {/* ================= HEADING ================= */}
        <h1
          className="
            text-center text-2xl sm:text-3xl font-bold
            text-blue-600 dark:text-blue-400
          "
        >
          About BlogIt
        </h1>

        {/* ================= INTRO ================= */}
        <p
          className="
            text-gray-700 dark:text-gray-300
            text-sm sm:text-base
            leading-relaxed
            text-center sm:text-left
          "
        >
          Welcome to{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            BlogIt
          </span>
          . This is a community where everyone can share their thoughts,
          experiences, and stories. Discover posts from other users,
          learn from their perspectives, and contribute your own
          experiences to inspire others.
        </p>

        {/* ================= ABOUT CREATOR ================= */}
        <div
          className="
            bg-gray-100 dark:bg-[#1F2937]
            rounded-lg p-4 sm:p-6
            border-l-4 border-teal-500
          "
        >
          <h2
            className="
              text-lg font-semibold
              text-gray-900 dark:text-gray-100
              mb-2
            "
          >
            About the Creator
          </h2>

          <p
            className="
              text-gray-700 dark:text-gray-300
              text-sm leading-relaxed
            "
          >
            BlogIt is built by{" "}
            <span className="text-teal-600 dark:text-teal-400 font-medium">
              Chetan
            </span>
            , an Electrical Engineering student at NIT Hamirpur, with a
            passion for writing and technology. The platform allows users
            to freely express their thoughts, experiences, and stories
            while connecting with like-minded bloggers.
          </p>
        </div>

        {/* ================= WHY BLOGS ================= */}
        <div
          className="
            bg-gray-100 dark:bg-[#1F2937]
            rounded-lg p-4 sm:p-6
            border-l-4 border-blue-500
          "
        >
          <h2
            className="
              text-lg font-semibold
              text-gray-900 dark:text-gray-100
              mb-2
            "
          >
            Why Explore the Blogs?
          </h2>

          <ul
            className="
              list-disc list-inside
              text-gray-700 dark:text-gray-300
              text-sm space-y-1
            "
          >
            <li>Discover experiences and stories shared by users</li>
            <li>Gain inspiration from diverse perspectives</li>
            <li>Enjoy a growing collection of engaging posts</li>
          </ul>
        </div>

        {/* ================= FOOTER NOTE ================= */}
        <p
          className="
            text-center
            text-xs sm:text-sm
            text-gray-500 dark:text-gray-400
            pt-2
          "
        >
          Thank you for visiting. Keep exploring, learning, and sharing your stories.
        </p>
      </div>
    </div>
  );
}
