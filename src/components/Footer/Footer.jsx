import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-16 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-blue-400">MyBlog</h2>
            <p className="text-sm mt-2 max-w-xs text-gray-400">
              A place to read, write, and share knowledge with the world.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-gray-300">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link to="/blogs" className="hover:text-blue-400">Explore Blogs</Link></li>
              <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-gray-300">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
              <li><Link to="/signup" className="hover:text-blue-400">Sign Up</Link></li>
              <li><Link to="/settings" className="hover:text-blue-400">Settings</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} MyBlog. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-gray-400">
            <a href="#" className="hover:text-blue-400">
              <FaGithub size={18} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaXTwitter size={18} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
