import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function PropertyDetail() {
    const propertyId = localStorage.getItem("propertyId");
    const url = "https://horizonhomes-backend.onrender.com";
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!propertyId) {
            Swal.fire("Error", "No property selected!", "error");
            navigate("/");
            return;
        }

        axios.get(`${url}/propertyDetail?id=${propertyId}`)
            .then((res) => setProperty(res.data.prtData))
            .catch(() => Swal.fire("Error", "Unable to fetch data from API", "error"))
            .finally(() => setLoading(false));

        window.scrollTo(0, 0);
    }, [propertyId, navigate]);

    if (loading) return <div className="text-center p-6">Loading...</div>;

    if (!property) return <div className="text-center p-6 text-red-500">Property not found.</div>;

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-xl rounded-2xl relative top-24 mb-20">
            {/* Property Image */}
            {property.image && (
                <img
                    src={`${url}/${property.image}`}
                    alt="Property"
                    className="w-full h-60 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-xl"
                />
            )}

            {/* Title & Location */}
            <div className="mt-6">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h1>
                <p className="text-base sm:text-lg text-gray-600 mt-2">📍 {property.location}</p>
            </div>

            {/* Price & Status */}
            <div className="mt-6 flex flex-wrap justify-between items-center bg-gray-100 p-4 rounded-lg">
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-green-600">
                    💰 $ {property.price?.toLocaleString()} {property.status === "rent" ? "/ Month" : ""}
                </p>
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm sm:text-base md:text-lg font-medium mt-2 sm:mt-0">
                    {property.status}
                </span>
            </div>

            {/* Property Details */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center text-gray-700">
                <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                    <p className="text-lg sm:text-xl md:text-2xl font-bold">{property.bedrooms}</p>
                    <p className="text-xs sm:text-sm">{property.type === "office" ? "Cabins" : "Bedrooms"}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                    <p className="text-lg sm:text-xl md:text-2xl font-bold">{property.bathrooms}</p>
                    <p className="text-xs sm:text-sm">Bathrooms</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                    <p className="text-lg sm:text-xl md:text-2xl font-bold">{property.area} sqft</p>
                    <p className="text-xs sm:text-sm">Area</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                    <p className="text-lg sm:text-xl md:text-2xl font-bold">{property.type}</p>
                    <p className="text-xs sm:text-sm">Home Type</p>
                </div>
            </div>

            {/* Description */}
            <p className="mt-6 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">{property.description}</p>

            {/* Payment Button */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                    className="w-full sm:w-auto flex-1 bg-green-600 text-white py-3 rounded-lg text-sm sm:text-lg font-semibold hover:bg-green-700 transition duration-300"
                    onClick={() => navigate("/payment")}
                >
                    Buy Now for $ {property.price?.toLocaleString()}
                </button>
                <button
                    className="w-full sm:w-auto flex-1 bg-gray-600 text-white py-3 rounded-lg text-sm sm:text-lg font-semibold hover:bg-gray-700 transition duration-300"
                    onClick={() => navigate("/view")}
                >
                    Back to Listings
                </button>
            </div>
        </div>
    );
}

export default PropertyDetail;
