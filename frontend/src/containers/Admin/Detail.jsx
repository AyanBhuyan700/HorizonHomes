import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom'


function Detail() {
  const url = "https://horizonhomes-backend.onrender.com"
  const userId = localStorage.getItem("id")
  const propertyId = localStorage.getItem("propertyId");
  const navigate = useNavigate()
  const [propId, setPropertyId] = useState(null)
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", price: "", location: "", type: "apartment", bedrooms: "", bathrooms: "", area: "", image: null, listedBy: userId || "", status: "available" })


  function deleteProperty(id) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete!",
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${url}/property`, { data: { id: id } }).then((d) => {
            Swal.fire("Deleted!", d.data.message, "success");
            navigate("/dashboard")
          }).catch(() => {
            Swal.fire("Error", "Something went wrong while deleting", "error")
          });
        }
      });
    } catch (error) {
      Swal.fire("Error", "Something went wrong while deleting", "error")
    }
  }


  useEffect(() => {
    if (!propertyId) {
      Swal.fire("Error", "No property selected!", "error");
      return;
    }

    axios.get(`${url}/propertyDetail?id=${propertyId}`)
      .then((res) => {
        setProperty(res.data.prtData);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error", "Unable to fetch data from API", "error");
        setLoading(false);
      });
      window.scrollTo(0, 0);
  }, [propertyId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading property details...</p>;
  }

  if (!property) {
    return <p className="text-center text-red-500">Property details not available.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg relative top-16">

      {property.image && (
        <img
          src={`${url}/${property.image}`}
          alt="Property image"
          className="w-full h-100 object-cover rounded-lg"
        />
      )}

<div className="mt-4 p-4 sm:p-6 bg-white rounded-lg shadow">
  {/* Property Title & Location */}
  <h1 className="text-2xl font-bold text-gray-800">{property.title}</h1>
  <p className="text-gray-600 mt-2">{property.location}</p>

  {/* Price & Status */}
  <div className="mt-4 flex flex-wrap justify-between items-center">
    <p className="text-xl font-semibold text-green-600">
      $ {property.price?.toLocaleString()}
    </p>
    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm sm:text-base mt-2 sm:mt-0">
      {property.status}
    </span>
  </div>

  {/* Property Details */}
  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-gray-700">
    <div>
      <p className="text-xl font-semibold">{property.bedrooms}</p>
      {property.type === "office" && <p className="text-sm">Cabins</p>}
      {(property.type === "house" || property.type === "villa" || property.type === "apartment") && (
        <p className="text-sm">Bedrooms</p>
      )}
    </div>
    <div>
      <p className="text-xl font-semibold">{property.bathrooms}</p>
      <p className="text-sm">Bathrooms</p>
    </div>
    <div>
      <p className="text-xl font-semibold">{`${property.area} sqft`}</p>
      <p className="text-sm">Area</p>
    </div>
    <div>
      <p className="text-xl font-semibold">{property.type}</p>
      <p className="text-sm">HomeType</p>
    </div>
  </div>

  {/* Description */}
  <p className="mt-4 text-gray-600">{property.description}</p>

  {/* Action Buttons */}
  <div className="mt-6 flex flex-wrap gap-2 sm:gap-4">
    <button
      className="w-full sm:w-[48%] bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      onClick={() => {
        setPropertyId(property._id);
        console.log(property._id);
        setForm({ ...form, title: property.title, price: property.price, status: property.status, bedrooms: property.bedrooms });
        navigate("/editProperty");
      }}
    >
      Edit
    </button>
    <button
      className="w-full sm:w-[48%] bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
      onClick={() => {
        deleteProperty(property._id);
      }}
    >
      Delete
    </button>
  </div>
</div>

    </div>
  );
}

export default Detail;
