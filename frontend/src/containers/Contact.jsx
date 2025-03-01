import React, { useEffect } from "react";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-12 py-16">
      <div className="w-full max-w-3xl bg-white p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 bg-clip-text text-transparent text-center mb-6 sm:mb-8">
          Contact Us
        </h1>
        <p className="text-gray-700 text-base sm:text-lg text-center mb-6 sm:mb-10 leading-relaxed">
          We'd love to hear from you! Reach out to us with any inquiries or feedback.
        </p>

        <form className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-gray-800 font-semibold mb-1 sm:mb-2">Your Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition text-sm sm:text-base" 
              placeholder="Enter your name" 
            />
          </div>
          <div>
            <label className="block text-gray-800 font-semibold mb-1 sm:mb-2">Your Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition text-sm sm:text-base" 
              placeholder="Enter your email" 
            />
          </div>
          <div>
            <label className="block text-gray-800 font-semibold mb-1 sm:mb-2">Message</label>
            <textarea 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition text-sm sm:text-base" 
              rows="4" 
              placeholder="Enter your message"
            ></textarea>
          </div>
          <button className="w-full bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-cyan-400 hover:via-blue-300 hover:to-indigo-400 transition text-sm sm:text-base">
            Send Message
          </button>
        </form>

        <div className="mt-8 sm:mt-10 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 bg-clip-text text-transparent mb-2">
            Contact Information
          </h2>
          <p className="text-gray-800 text-sm sm:text-base">
            Email: <a href="mailto:contact@HorizonHomes.com" className="text-blue-600 font-semibold underline hover:text-indigo-600 transition">contact@HorizonHomes.com</a>
          </p>
          <p className="text-gray-800 text-sm sm:text-base">Phone: <span className="font-semibold">+123 456 7890</span></p>
          <p className="text-gray-800 text-sm sm:text-base">Address: <span className="font-semibold">123 Business Street, Your City</span></p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
