import React, { useState , useEffect} from 'react';
import { Search, Calendar, User, ChevronDown } from 'lucide-react';
import { BlogCard } from '../components';
import axios from 'axios';

const BlogExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [visibleBlogs, setVisibleBlogs] = useState(6);

  const categories = ['All', 'Technology', 'Design', 'Business', 'Lifestyle', 'Travel'];

  const [blogs, setBlogs] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/blog/allblogs`);
        if (res.data.success) {
          setBlogs(res.data.blogs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setLimit(window.innerWidth >= 1024 ? 6 : 4);
    };

    handleResize(); // initial
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredBlogs = blogs;
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Explore Blogs</h1>
          <p className="text-slate-600 dark:text-slate-300">Discover stories, insights, and ideas from our community</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogs.slice(0,visibleBlogs).map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>

        {/* Load More Button */}
        {visibleBlogs < blogs.length && (
          <div className="text-center">
            <button
              onClick={() => setVisibleBlogs(prev => prev + 6)}
              className="px-8 py-3 bg-slate-900 dark:bg-gray-700 text-white dark:text-slate-200 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-gray-600 transition-colors shadow-md"
            >
              Load More Blogs
            </button>
          </div>
        )}

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400 text-lg">No blogs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogExplorer;
