import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function PropertyEdit() {
  const url = "http://localhost:8081"
    const userId = localStorage.getItem("id");
    const propertyId = localStorage.getItem("propertyId");
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        type: "apartment",
        bedrooms: "",
        bathrooms: "",
        area: "",
        image: null,
        listedBy: userId || "",
        status: "sale",
    });

    const [formError, setFormError] = useState({});

    useEffect(() => {
        if (propertyId) {
            axios
                .get(`${url}/propertyDetail?id=${propertyId}`)
                .then((res) => {
                    const data = res.data.prtData;
                    if (data) {
                        setForm({
                            title: data.title || "",
                            description: data.description || "",
                            price: data.price || "",
                            location: data.location || "",
                            type: data.type || "apartment",
                            bedrooms: data.bedrooms || "",
                            bathrooms: data.bathrooms || "",
                            area: data.area || "",
                            image: null,
                            listedBy: data.listedBy || userId,
                            status: data.status || "sale",
                        });
                    }
                })
                .catch(() => {
                    Swal.fire("Error", "Unable to fetch property details", "error");
                });
        }
        window.scrollTo(0, 0);
    }, [propertyId, userId]);

    const changeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    function updateProperty() {
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
            formData.append("image", form.image, form.image.name);
            formData.append("listedBy", userId);
            formData.append("id", propertyId);
            Swal.fire({
                title: "Update Property?",
                text: "Are you sure you want to update this Property?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Update!",
                cancelButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.put(`${url}/property`, formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    }).then((p) => {
                        Swal.fire("Success", p.data.message, "success");
                        navigate("/dashboard");
                    }).catch(() => {
                        Swal.fire("Error", "Something went wrong while updating", "error");
                    });
                }
            })
        } catch (err) {
            Swal.fire("Error", "Something went wrong while updating", "error");
        }
    }

    function onPropertySubmit(e) {
        e.preventDefault();

        let errors = {};
        let hasErrors = false;

        if (!form.title) {
            errors.title = "Title is required";
            hasErrors = true;
        }
        if (!form.description) {
            errors.description = "Description is required";
            hasErrors = true;
        }
        if (!form.price || form.price <= 0) {
            errors.price = "Valid price is required";
            hasErrors = true;
        }
        if (!form.location) {
            errors.location = "Location is required";
            hasErrors = true;
        }
        if (!form.bedrooms || form.bedrooms <= 0) {
            errors.bedrooms = "Valid bedrooms count required";
            hasErrors = true;
        }
        if (!form.bathrooms || form.bathrooms <= 0) {
            errors.bathrooms = "Valid bathrooms count required";
            hasErrors = true;
        }
        if (!form.area || form.area <= 0) {
            errors.area = "Valid area is required";
            hasErrors = true;
        }
        if (!form.image) {
            errors.image = "Property image is required";
            hasErrors = true;
        }

        setFormError(errors);

        if (hasErrors) {
            Swal.fire("Validation Error", "Please fill all fields correctly", "warning");
        } else {
            updateProperty()
        }
    }


    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 relative top-16">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Edit Property
            </h2>

            <form className="space-y-4" onSubmit={onPropertySubmit}>
                <div>
                    <label className="block text-gray-600 font-medium">Title</label>
                    <input type="text" className="w-full p-2 border rounded-lg focus:outline-blue-500" name="title" value={form.title} onChange={changeHandler} />
                    <p className="text-red-500">{formError.title}</p>
                </div>

                <div>
                    <label className="block text-gray-600 font-medium">Description</label>
                    <textarea className="w-full p-2 border rounded-lg focus:outline-blue-500" rows="3" name="description" value={form.description} onChange={changeHandler}></textarea>
                    <p className="text-red-500">{formError.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-600 font-medium">Price ($)</label>
                        <input type="number" className="w-full p-2 border rounded-lg focus:outline-blue-500" name="price" value={form.price} onChange={changeHandler} />
                        <p className="text-red-500">{formError.price}</p>
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium">Location</label>
                        <input type="text" className="w-full p-2 border rounded-lg focus:outline-blue-500" name="location" value={form.location} onChange={changeHandler} />
                        <p className="text-red-500">{formError.location}</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-gray-600 font-medium">Type</label>
                        <select className="w-full p-2 border rounded-lg focus:outline-blue-500" name="type"
                            value={form.type}
                            onChange={changeHandler}>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="villa">Villa</option>
                            <option value="office">Office</option>
                        </select>
                    </div>
                    <div>
                        {form.type === "office" && (
                            <label className="block text-gray-600 font-medium">Cabins</label>
                        )}

                        {(form.type === "house" || form.type === "villa" || form.type === "apartment") && (
                            <label className="block text-gray-600 font-medium">Bedrooms</label>
                        )}
                        <input type="number" className="w-full p-2 border rounded-lg focus:outline-blue-500" name="bedrooms" value={form.bedrooms} onChange={changeHandler} />
                        <p className="text-red-500">{formError.bedrooms}</p>
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium">Bathrooms</label>
                        <input type="number" className="w-full p-2 border rounded-lg focus:outline-blue-500" name="bathrooms" value={form.bathrooms} onChange={changeHandler} />
                        <p className="text-red-500">{formError.bathrooms}</p>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-600 font-medium">Area (sq ft)</label>
                    <input type="number" className="w-full p-2 border rounded-lg focus:outline-blue-500" name="area" value={form.area} onChange={changeHandler} />
                    <p className="text-red-500">{formError.area}</p>
                </div>

                <div>
                    <label className="block text-gray-600 font-medium">Status</label>
                    <select className="w-full p-2 border rounded-lg focus:outline-blue-500" name="status"
                        value={form.status}
                        onChange={changeHandler}>
                        <option value="sale">Sale</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-600 font-medium">Listed By</label>
                    <input
                        className="w-full p-2 border rounded-lg bg-gray-200 text-gray-500 focus:outline-none cursor-not-allowed"
                        name="listedBy"
                        value={form.listedBy}
                        readOnly
                        disabled
                        onCopy={(e) => e.preventDefault()}
                        onCut={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        style={{ userSelect: "none" }}
                    />
                    <p className="text-red-500">{formError.listedBy}</p>
                </div>


                <div>
                    <label className="block text-gray-600 font-medium">Upload Image</label>
                    <input type="file" className="w-full p-2 border rounded-lg focus:outline-blue-500" accept="image/*" name='image' onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
                    <p className="text-red-500">{formError.image}</p>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700 transition" onClick={onPropertySubmit}>
                    Edit Property
                </button>
            </form>
        </div>
    );
}

export default PropertyEdit;
