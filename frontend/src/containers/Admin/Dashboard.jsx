import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const url = "https://horizonhomes-backend.onrender.com"
  const [property, setProperty] = useState(null)
  const navigate = useNavigate()

  function getAllProperty() {
    try {
      axios.get(`${url}/property`).then((p) => {
        setProperty(p.data.prtData)
      }).catch(() => {
        Swal.fire("Error", "Unable to Fetch Data From API", "error")
      })
    } catch (err) {
      Swal.fire("Error", "Unable to Fetch Data From API", "error")
    }
  }

  useEffect(() => {
    getAllProperty()
    window.scrollTo(0, 0);
  }, []);



  return (
    <>
      <div className="container mx-auto p-6 relative top-16">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
          Available Properties
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {property?.map((property) => (
            <div
              key={property.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
            >
              <img
                src={`${url}/` + property.image}
                alt="property image"
                className="w-full h-60 object-cover"
              />
              <div className="p-5">
                <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
                <p className="text-lg text-gray-600 mt-1">Price: <span className="font-semibold">{property.price} $</span></p>
                <p className="text-lg text-blue-500 font-semibold mt-1">
                  Location: {property.location}
                </p>
                <button
                  className="mt-5 w-full px-5 py-3 bg-blue-600 text-white rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-300"
                  onClick={() => {
                    localStorage.setItem("propertyId", property._id);
                    navigate("/detail");
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Dashboard;
