import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    window.scrollTo(0, 0);
  }, []);

  const handleProtectedAction = (path) => {
    const token = localStorage.getItem("id");

    if (!token || token === "undefined" || token === "null") {
      navigate("/register");
      return;
    }

    navigate(path);
  };

  return (
    <>

      <div className="bg-gray-50">
        {/* Hero Section */}
        <div className="relative w-full h-[600px] flex items-center justify-center bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 text-white text-center p-6 shadow-2xl">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">Find Your Dream Home</h1>
            <p className="text-lg mb-8">Luxury, Comfort, and Elegance – All in One Place.</p>
            <button
              className="bg-white text-cyan-600 px-8 py-3 rounded-full font-semibold shadow-lg transition transform hover:scale-110 hover:shadow-xl"
              onClick={() => handleProtectedAction("/view")}
            >
              Start Exploring
            </button>
          </div>
        </div>

        {/* Featured Properties */}
        <div className="max-w-7xl mx-auto mt-16 p-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Discover Your Ideal Home</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {/* Luxury Apartments */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <img
                src="https://media.equityapartments.com/images/c_crop,x_0,y_0,w_1920,h_1080/c_fill,w_737,h_414/q_auto,f_auto/4227-21/radius-koreatown-apartments-exterior"
                alt="Luxury Apartments"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-blue-600">Luxury Apartments</h3>
                <p className="text-gray-600 mt-2">Starting from $500,000</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-300" onClick={() => handleProtectedAction("/view")}>
                  View Listings
                </button>
              </div>
            </div>

            {/* Beachfront Villas */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <img
                src="https://www.ministryofvillas.com/wp-content/uploads/2019/11/bali-mandalatherocks-18.jpg"
                alt="Beachfront Villas"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-blue-600">Beachfront Villas</h3>
                <p className="text-gray-600 mt-2">Exclusive oceanfront properties</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-300" onClick={() => {
                  handleProtectedAction("/view")
                }}>
                  Explore Villas
                </button>
              </div>
            </div>

            {/* Modern Townhouses */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <img
                src="https://previews.123rf.com/images/elenathewise/elenathewise1111/elenathewise111100142/11372141-modern-town-houses-of-brick-and-glass-on-urban-street.jpg"
                alt="Modern Townhouses"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-blue-600">Modern Townhouses</h3>
                <p className="text-gray-600 mt-2">Perfect for urban living</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-300" onClick={() => handleProtectedAction("/view")}>
                  Browse Homes
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* Contact Section */}
        <div className="max-w-7xl mx-auto mt-16 p-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h2>
          <p className="text-lg text-gray-600 mb-8">Have questions? Reach out to us anytime.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {["Call Us", "Email Us", "Visit Us"].map((title, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">{title}</h3>
                <p className="text-gray-600">
                  {index === 0 ? "+1 234 567 890" : index === 1 ? "support@HorizonHomes.com" : "123 Main Street, City, Country"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 text-white text-center py-16 mt-16 relative overflow-hidden">
          <h2 className="text-3xl font-extrabold mb-4">Looking to Buy or Sell?</h2>
          <p className="text-lg mb-6">Our experts are here to assist you in every step.</p>
          <button
            className="bg-white text-cyan-600 px-8 py-3 rounded-full font-semibold shadow-lg transition transform hover:scale-110 hover:shadow-xl"
            onClick={() => navigate("/contact")}
          >
            Get Started Now
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
