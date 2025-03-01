import axios from 'axios'
import Swal from 'sweetalert2'
import React, { useState } from 'react'


function PropertyAdd() {
    const url = "https://horizonhomes-backend.onrender.com"
    const userId = localStorage.getItem("id")
    const [form, setForm] = useState({ title: "", description: "", price: "", location: "", type: "apartment", bedrooms: "", bathrooms: "", area: "", image: null, listedBy: userId || "", status: "sale" })
    const [formError, setFormError] = useState({ title: "", description: "", price: "", location: "", type: "apartment", bedrooms: "", bathrooms: "", area: "", image: "", listedBy: "", status: "sale" })


    const changeHandler = (e) => {
        setForm(prevForm => ({ ...prevForm, [e.target.name]: e.target.value }));
    };


    function saveProperty() {
        try {
            let formData = new FormData()
            formData.append("title", form.title)
            formData.append("description", form.description)
            formData.append("price", form.price)
            formData.append("location", form.location)
            formData.append("type", form.type)
            formData.append("bedrooms", form.bedrooms)
            formData.append("bathrooms", form.bathrooms)
            formData.append("area", form.area)
            formData.append("status", form.status)
            formData.append("listedBy", userId);
            formData.append("image", form.image, form.image.name);

            axios.post(`${url}/property`, formData, { headers: { "Content-Type": "multipart/form-data" } }
            ).then((p) => {
                Swal.fire("Success", p.data.message, "success");
                resetForm()
            }).catch(() => {
                Swal.fire("Error", "Something went wrong while using API", "error")
            });
        } catch (err) {
            Swal.fire("Error", "Something went wrong while using API", "error")
        }
    }

    function resetForm() {
        setForm({ title: "", description: "", price: "", location: "", type: "apartment", bedrooms: "", bathrooms: "", area: "", image: null, listedBy: userId || "", status: "sale" })
    }


    function onPropertySubmit(e) {
        e.preventDefault();

        let errors = false;
        let error = { title: "", description: "", price: "", location: "", type: "", bedrooms: "", bathrooms: "", area: "", image: "", status: "" }

        if (!form.title) {
            error.title = "Title is required";
            errors = true;
        }
        if (!form.description) {
            error.description = "Description is required";
            errors = true;
        }
        if (!form.price || form.price <= 0) {
            error.price = "Valid price is required";
            errors = true;
        }
        if (!form.location) {
            error.location = "Location is required";
            errors = true;
        }
        if (!form.bedrooms || form.bedrooms <= 0) {
            error.bedrooms = "Number of bedrooms is required";
            errors = true;
        }
        if (!form.bathrooms || form.bathrooms <= 0) {
            error.bathrooms = "Number of bathrooms is required";
            errors = true;
        }
        if (!form.area || form.area <= 0) {
            error.area = "Property area is required";
            errors = true;
        }
        if (!form.image) {
            error.image = "Property image is required";
            errors = true;
        }

        setFormError(error);

        if (errors) {
            Swal.fire("Validation Error", "Please fill all fields correctly", "warning");
        } else {
            saveProperty();
        }

    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 p-6 pb-32">
                <div className="max-w-3xl w-full bg-white bg-opacity-90 backdrop-blur-lg shadow-2xl rounded-2xl p-10 relative top-12">
                    <h2 className="text-4xl font-bold text-gray-900 text-center mb-6">🏡 Add Property</h2>
                    <form className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Title</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                name="title"
                                value={form.title}
                                onChange={changeHandler}
                            />
                            <p className="text-red-500 text-sm">{formError.title}</p>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Description</label>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                rows="4"
                                name="description"
                                value={form.description}
                                onChange={changeHandler}
                            ></textarea>
                            <p className="text-red-500 text-sm">{formError.description}</p>
                        </div>

                        {/* Price & Location */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Price ($)</label>
                                <input
                                    type="number"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    name="price"
                                    min="1000"
                                    value={form.price}
                                    onChange={changeHandler}
                                />
                                <p className="text-red-500 text-sm">{formError.price}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Location</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    name="location"
                                    value={form.location}
                                    onChange={changeHandler}
                                />
                                <p className="text-red-500 text-sm">{formError.location}</p>
                            </div>
                        </div>

                        {/* Property Type, Bedrooms, Bathrooms */}
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Type</label>
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    name="type"
                                    value={form.type}
                                    onChange={changeHandler}
                                >
                                    <option value="apartment">Apartment</option>
                                    <option value="house">House</option>
                                    <option value="villa">Villa</option>
                                    <option value="office">Office</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">{form.type === "office" ? "Cabins" : "Bedrooms"}</label>
                                <input
                                    type="number"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    name="bedrooms"
                                    min="0"
                                    value={form.bedrooms}
                                    onChange={changeHandler}
                                />
                                <p className="text-red-500 text-sm">{formError.bedrooms}</p>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Bathrooms</label>
                                <input
                                    type="number"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    name="bathrooms"
                                    min="0"
                                    value={form.bathrooms}
                                    onChange={changeHandler}
                                />
                                <p className="text-red-500 text-sm">{formError.bathrooms}</p>
                            </div>
                        </div>

                        {/* Area & Status */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Area (sq ft)</label>
                                <input
                                    type="number"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    min="0"
                                    name="area"
                                    value={form.area}
                                    onChange={changeHandler}
                                />
                                <p className="text-red-500 text-sm">{formError.area}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Status</label>
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    name="status"
                                    value={form.status}
                                    onChange={changeHandler}
                                >
                                    <option value="sale">Sale</option>
                                    <option value="rent">Rent</option>
                                </select>
                            </div>
                        </div>

                        {/* Listed By */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Listed By</label>
                            <input
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 focus:outline-none cursor-not-allowed"
                                name="listedBy"
                                value={form.listedBy}
                                readOnly
                                disabled
                                style={{ userSelect: "none" }}
                            />
                            <p className="text-red-500 text-sm">{formError.listedBy}</p>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Upload Image</label>
                            <input
                                type="file"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                accept="image/*"
                                name="image"
                                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                            />
                            <p className="text-red-500 text-sm">{formError.image}</p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold p-3 rounded-lg hover:scale-105 transition-all duration-300"
                            onClick={onPropertySubmit}
                        >
                            📌 Add Property
                        </button>
                    </form>
                </div>
            </div>




        </>
    )
}


export default PropertyAdd;
