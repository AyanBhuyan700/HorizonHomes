import React, { useEffect } from "react";

function About() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 min-h-screen flex justify-center items-center px-6 py-28">
        <div className="max-w-5xl bg-white p-12 rounded-3xl shadow-2xl border border-gray-300">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 bg-clip-text text-transparent text-center mb-6 uppercase tracking-wide">
            About Us
          </h1>
          <p className="text-gray-800 text-lg text-center mb-8 leading-relaxed">
            Welcome to <span className="font-semibold text-cyan-600">HorizonHomes</span>, your trusted online real estate marketplace.
            We connect buyers, sellers, and renters through a seamless and secure platform.
          </p>

          <div className="mt-10 space-y-8">
            {/* Who We Are */}
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 bg-clip-text text-transparent mb-3">
                Who We Are
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We are a dedicated team of real estate professionals and tech experts working to make property transactions smooth and stress-free. Our goal is to bring transparency, convenience, and efficiency to the real estate industry.
              </p>
            </div>

            {/* What We Offer */}
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 bg-clip-text text-transparent mb-3">
                What We Offer
              </h2>
              <ul className="list-disc list-inside text-gray-800 space-y-2">
                <li><strong>Verified Listings:</strong> High-quality residential and commercial properties.</li>
                <li><strong>Advanced Search & Filters:</strong> Easily find properties that match your preferences.</li>
                <li><strong>Secure Transactions:</strong> Safe buying, selling, and renting experience.</li>
                <li><strong>User Dashboard:</strong> Manage property listings and inquiries seamlessly.</li>
                <li><strong>Expert Support:</strong> Guidance from industry professionals.</li>
              </ul>
            </div>

            {/* Why Choose Us? */}
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 bg-clip-text text-transparent mb-3">
                Why Choose Us?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Verified Listings", desc: "We ensure that all properties listed on our platform are genuine and verified." },
                  { title: "User-Friendly Experience", desc: "Our platform is designed to be simple, intuitive, and efficient." },
                  { title: "Secure Transactions", desc: "We prioritize safety and ensure smooth property transactions." },
                  { title: "24/7 Support", desc: "Our expert team is always available to assist you." },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-cyan-500 hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-700">Have questions? We’d love to hear from you!</p>
            <p className="text-gray-800 font-semibold mt-2">Email: <a href="mailto:info@HorizonHomes.com" className="text-cyan-600 underline">info@HorizonHomes.com</a></p>
            <p className="text-gray-800 font-semibold">Phone: +123 456 7890</p>
            <p className="text-gray-800 font-semibold">Location: 123 Real Estate Street, Your City</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About;
