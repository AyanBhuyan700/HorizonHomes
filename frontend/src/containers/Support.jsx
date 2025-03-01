import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Support() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-12 py-16">
      <div className="w-full max-w-5xl bg-white p-6 sm:p-10 md:p-12 rounded-3xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 bg-clip-text text-transparent text-center mb-6 sm:mb-8">
          Support Center
        </h1>
        <p className="text-gray-800 text-base sm:text-lg text-center mb-6 sm:mb-10 leading-relaxed">
          We are here to help you. Find answers, get support, and connect with our team.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {[
            { title: "Email Support", desc: "Reach out to us via email for any inquiries or issues.", link: "mailto:support@HorizonHomes.com", linkText: "support@HorizonHomes.com" },
            { title: "Call Us", desc: "Need immediate assistance? Give us a call.", extra: "+123 456 7890" },
            { title: "Frequently Asked Questions", desc: "Check out our FAQ section for quick answers.", link: "/faq", linkText: "Visit FAQs" },
            { title: "Live Chat", desc: "Chat with our support team for real-time assistance.", button: "Start Chat" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-xl shadow-md border-l-4 border-cyan-500 hover:border-indigo-500 hover:shadow-lg transition">
              <h3 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                {item.title}
              </h3>
              <p className="text-gray-700 mt-2 text-sm sm:text-base">{item.desc}</p>
              {item.link && <Link to={item.link} className="text-blue-500 font-semibold underline hover:text-indigo-500 transition">{item.linkText}</Link>}
              {item.extra && <p className="text-gray-900 font-semibold text-lg">{item.extra}</p>}
              {item.button && (
                <button className="mt-4 px-5 py-3 bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-cyan-400 hover:via-blue-300 hover:to-indigo-400 transition w-full sm:w-auto">
                  {item.button}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Support;
