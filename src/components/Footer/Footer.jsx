import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative bg-gray-900 text-gray-300">
      {/* subtle gradient top border */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* ================= TOP ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* BRAND */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              BlogIt
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              BlogIt is a platform to share ideas, experiences, and stories,  
              and connect with a growing community of writers.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200 mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "Explore Blogs", path: "/blogs" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-indigo-400 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200 mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Login", path: "/user/login" },
                { name: "Sign Up", path: "/user/signup" },
                { name: "Settings", path: "/settings" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-indigo-400 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="border-t border-gray-800 my-10" />

        {/* ================= BOTTOM ================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} BlogIt. Built with ❤️ by Chetan.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/chetan208"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-gray-800
              hover:border-indigo-500 hover:text-indigo-400 transition"
            >
              <FaGithub size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/chetan-6218b3329/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-gray-800
              hover:border-indigo-500 hover:text-indigo-400 transition"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
