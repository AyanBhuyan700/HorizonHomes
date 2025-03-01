import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function PropertyView() {
    const url = "http://localhost:8081";
    const [properties, setProperties] = useState([]);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("all");
    const navigate = useNavigate();

    function getAllProperty() {
        try {
            axios.get(`${url}/property`)
                .then((response) => {
                    setProperties(response.data.prtData);
                })
                .catch(() => {
                    Swal.fire("Error", "Unable to Fetch Data From API", "error");
                });
        } catch (err) {
            Swal.fire("Error", "Unable to Fetch Data From API", "error");
        }
    }

    useEffect(() => {
        getAllProperty();
        window.scrollTo(0, 0);
    }, []);

    const filteredProperties = properties.filter((property) => {
        const propertyType = property.type ? property.type.toLowerCase() : "";
        const searchTerm = search.toLowerCase();

        return (
            (filterType === "all" || propertyType === filterType) &&
            (property.title.toLowerCase().includes(searchTerm) ||
                property.location.toLowerCase().includes(searchTerm))
        );
    });

    return (
        <div className="container mx-auto p-6 relative top-14">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
                🏡 Available Properties
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <input
                    type="text"
                    placeholder="🔍 Search by title or location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {["All", "Villa", "Apartment", "House", "Office"].map((type) => (
                        <button
                            key={type}
                            className={`px-4 py-2 text-sm font-medium rounded-lg shadow-md transition-all duration-300 ${filterType === type.toLowerCase()
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 hover:bg-blue-500 hover:text-white"
                                }`}
                            onClick={() => setFilterType(type.toLowerCase())}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.length > 0 ? (
                    filteredProperties.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white shadow-md rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <img
                                src={`${url}/` + item.image}
                                alt="property image"
                                className="w-full h-56 object-cover rounded-t-xl"
                            />
                            <div className="p-5">
                                <h2 className="text-2xl font-semibold text-gray-800">{item.title}</h2>
                                <p className="text-gray-600 mt-1 text-lg font-medium">
                                    💰 Price: <span className="text-green-600 font-bold">{item.price} {item.status === "rent" ? "$ / Month" : "$"}</span>
                                </p>
                                <p className="text-lg font-medium mt-1 text-gray-700">
                                    📍 Location: <span className="text-blue-600 font-bold">{item.location}</span>
                                </p>
                                <p className="text-lg font-medium mt-1 text-gray-700">
                                    🏷 Status: <span className="text-red-600 font-bold">{item.status}</span>
                                </p>
                                <button
                                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all duration-300"
                                    onClick={() => {
                                        localStorage.setItem("propertyId", item._id);
                                        navigate("/propertyDetail");
                                    }}
                                >
                                    🔍 View Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 col-span-3 text-lg">No properties found.</p>
                )}
            </div>
        </div>
    );
}

export default PropertyView;
