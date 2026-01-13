import React,{useEffect, useState} from "react";
import { Mail, MapPin, Clock } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import Popup from "./popUp";





const ContactUs = () => {

  const user = useSelector((state) => state.auth.userData);

 



  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [message , setMessage] = useState("");
  const [loading , setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

   
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/api/contact`, {
        name,
        email,
        message
      });
      setMessage(""); // clear message
      setSuccessPopup(true);
    } catch (error) {
      console.error("Error sending contact message:", error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* ================= HEADER ================= */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Contact Us
          </h1>
          <p className="text-gray-600 text-xl dark:text-gray-400  mx-auto">
            Have a question, feedback, or just want to say hello?  
            We’d love to hear from you.
          </p>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* ===== CONTACT FORM ===== */}
          <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Send us a message
            </h2>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-700
                  bg-gray-100 dark:bg-gray-900
                  text-gray-900 dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-700
                  bg-gray-100 dark:bg-gray-900
                  text-gray-900 dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}  
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-700
                  bg-gray-100 dark:bg-gray-900
                  text-gray-900 dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full py-2.5 rounded-xl font-medium text-white
                bg-indigo-600 hover:bg-indigo-700 transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* ===== CONTACT INFO ===== */}
          <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Get in touch
              </h2>

              <div className="flex items-start gap-4">
                <Mail className="text-indigo-600 mt-1 cursor-pointer"  onClick={() => window.location.href = "mailto:blogit.read@gmail.com"} />
                <div>
                  <p onClick={() => window.location.href = "mailto:blogit.read@gmail.com"} className="cursor-pointer font-medium text-gray-900 dark:text-gray-100">
                    Email
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer" onClick={() => window.location.href = "mailto:blogit.read@gmail.com"}>
                    blogit.read@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-indigo-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Location
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    NIT Hamirpur, Himachal Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-indigo-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Response Time
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Within 24 hours
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
              Your message is important to us. We respect your privacy and will never share your email.
            </p>
          </div>
        </div>
      </div>

      <Popup
  open={successPopup}
  onClose={() => setSuccessPopup(false)}
  title="Message Sent Successfully!"
>
  <div className="text-center space-y-3">
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Message sent successfully!
    </p>

    <p className="text-sm text-gray-600 dark:text-gray-400">
      We’ll reply to you on your email.
    </p>

    <button
      onClick={() => setSuccessPopup(false)}
      className="mt-4 px-6 py-2 rounded-xl text-sm font-medium
      bg-indigo-600 text-white hover:bg-indigo-700 transition"
    >
      Okay
    </button>
  </div>
</Popup>

    </div>
  );
};

export default ContactUs;
