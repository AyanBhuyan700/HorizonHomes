import axios from "axios";
import Swal from "sweetalert2";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Building2, PlusCircle, ArrowLeft, Upload, Image as ImageIcon, 
  DollarSign, MapPin, Bed, Bath, Maximize2, Sparkles, CheckCircle2 
} from "lucide-react";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

function PropertyAdd() {
    const url = "https://horizonhomes-backend.onrender.com";
    const userId = localStorage.getItem("id");
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

    const [previewUrl, setPreviewUrl] = useState(null);
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);

    const changeHandler = (e) => {
        setForm(prevForm => ({ ...prevForm, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm(prev => ({ ...prev, image: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    function saveProperty() {
        setLoading(true);
        let formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("location", form.location);
        formData.append("type", form.type);
        formData.append("bedrooms", form.bedrooms);
        formData.append("bathrooms", form.bathrooms);
        formData.append("area", form.area);
        formData.append("status", form.status);
        formData.append("listedBy", userId);
        if (form.image) {
            formData.append("image", form.image, form.image.name);
        }

        axios.post(`${url}/property`, formData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((p) => {
                Swal.fire("Residence Published", p.data.message || "Property added to portfolio.", "success");
                resetForm();
                navigate("/dashboard");
            })
            .catch(() => {
                Swal.fire("Error", "Something went wrong while publishing listing", "error");
            })
            .finally(() => setLoading(false));
    }

    function resetForm() {
        setForm({
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
        setPreviewUrl(null);
        setFormError({});
    }

    function onPropertySubmit(e) {
        e.preventDefault();
        let errors = false;
        let error = {};

        if (!form.title.trim()) {
            error.title = "Title is required";
            errors = true;
        }
        if (!form.description.trim()) {
            error.description = "Description is required";
            errors = true;
        }
        if (!form.price || Number(form.price) <= 0) {
            error.price = "Valid price is required";
            errors = true;
        }
        if (!form.location.trim()) {
            error.location = "Location is required";
            errors = true;
        }
        if (!form.bedrooms || Number(form.bedrooms) <= 0) {
            error.bedrooms = "Bedrooms/cabins required";
            errors = true;
        }
        if (!form.bathrooms || Number(form.bathrooms) <= 0) {
            error.bathrooms = "Bathrooms required";
            errors = true;
        }
        if (!form.area || Number(form.area) <= 0) {
            error.area = "Area (sqft) required";
            errors = true;
        }
        if (!form.image) {
            error.image = "Property media is required";
            errors = true;
        }

        setFormError(error);

        if (errors) {
            Swal.fire("Incomplete Listing", "Please fill in all mandatory fields and upload a cover photo.", "warning");
        } else {
            saveProperty();
        }
    }

    return (
        <div className="bg-slate-50 min-h-screen text-slate-900 pt-28 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header & Breadcrumb */}
                <div className="flex items-center justify-between gap-4 mb-8">
                    <div>
                        <nav className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-1.5">
                            <Link to="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
                            <span>/</span>
                            <span className="text-slate-700 font-semibold">New Listing</span>
                        </nav>
                        <h1 className="font-heading text-3xl font-extrabold text-slate-900 tracking-tight">
                            Publish Luxury Residence
                        </h1>
                    </div>
                    <Link
                        to="/dashboard"
                        className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition shadow-sm inline-flex items-center gap-1.5"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </Link>
                </div>

                {loading ? (
                    <Loader text="Publishing listing to portfolio..." />
                ) : (
                    <form onSubmit={onPropertySubmit} className="space-y-8">
                        {/* Section 1: Basic Information */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
                            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-slate-900 text-base">General Information</h3>
                                    <p className="text-xs text-slate-500">Property title, status, architectural category</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                                    Property Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={changeHandler}
                                    placeholder="e.g. The Bel Air Horizon Sanctuary"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-medium"
                                />
                                {formError.title && <p className="text-red-500 text-xs mt-1">{formError.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                                        Listing Intent *
                                    </label>
                                    <select
                                        name="status"
                                        value={form.status}
                                        onChange={changeHandler}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                                    >
                                        <option value="sale">For Sale (Outright Acquisition)</option>
                                        <option value="rent">For Lease (Monthly Rental)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                                        Architectural Category *
                                    </label>
                                    <select
                                        name="type"
                                        value={form.type}
                                        onChange={changeHandler}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                                    >
                                        <option value="apartment">Apartment / Penthouse</option>
                                        <option value="villa">Luxury Villa</option>
                                        <option value="house">Modern House</option>
                                        <option value="office">Commercial Office / Estate</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                                    Architectural Narrative & Description *
                                </label>
                                <textarea
                                    name="description"
                                    rows="4"
                                    value={form.description}
                                    onChange={changeHandler}
                                    placeholder="Detail the property's design pedigree, materials, lighting, smart home features, and panoramic views..."
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-medium"
                                ></textarea>
                                {formError.description && <p className="text-red-500 text-xs mt-1">{formError.description}</p>}
                            </div>
                        </div>

                        {/* Section 2: Valuation & Location */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
                            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-slate-900 text-base">Valuation & Location</h3>
                                    <p className="text-xs text-slate-500">Asking price and metropolitan jurisdiction</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                                        Price ($ USD) *
                                    </label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="number"
                                            name="price"
                                            min="100"
                                            value={form.price}
                                            onChange={changeHandler}
                                            placeholder="e.g. 3500000"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-medium"
                                        />
                                    </div>
                                    {formError.price && <p className="text-red-500 text-xs mt-1">{formError.price}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                                        Location / Address *
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            name="location"
                                            value={form.location}
                                            onChange={changeHandler}
                                            placeholder="e.g. Tribeca, New York, NY"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-medium"
                                        />
                                    </div>
                                    {formError.location && <p className="text-red-500 text-xs mt-1">{formError.location}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Physical Specifications */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
                            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-slate-900 text-base">Specifications & Spatial Metrics</h3>
                                    <p className="text-xs text-slate-500">Rooms, bathrooms, and floor area</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                                        Bedrooms / Cabins *
                                    </label>
                                    <input
                                        type="number"
                                        name="bedrooms"
                                        min="1"
                                        value={form.bedrooms}
                                        onChange={changeHandler}
                                        placeholder="e.g. 4"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-medium"
                                    />
                                    {formError.bedrooms && <p className="text-red-500 text-xs mt-1">{formError.bedrooms}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                                        Bathrooms *
                                    </label>
                                    <input
                                        type="number"
                                        name="bathrooms"
                                        min="1"
                                        step="0.5"
                                        value={form.bathrooms}
                                        onChange={changeHandler}
                                        placeholder="e.g. 4.5"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-medium"
                                    />
                                    {formError.bathrooms && <p className="text-red-500 text-xs mt-1">{formError.bathrooms}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                                        Floor Area (SqFt) *
                                    </label>
                                    <input
                                        type="number"
                                        name="area"
                                        min="100"
                                        value={form.area}
                                        onChange={changeHandler}
                                        placeholder="e.g. 5200"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-medium"
                                    />
                                    {formError.area && <p className="text-red-500 text-xs mt-1">{formError.area}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Media Upload */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
                            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                                    4
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-slate-900 text-base">Cover Media</h3>
                                    <p className="text-xs text-slate-500">High-resolution architectural photography</p>
                                </div>
                            </div>

                            <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-3xl p-8 text-center transition bg-slate-50/50">
                                {previewUrl ? (
                                    <div className="space-y-4">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="max-h-64 mx-auto rounded-2xl object-cover shadow-md"
                                        />
                                        <p className="text-xs text-slate-500 font-medium">Selected: {form.image?.name}</p>
                                        <label className="inline-block px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-xs font-semibold text-slate-700 cursor-pointer transition">
                                            Change Cover Image
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer block">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                        <p className="font-heading font-bold text-slate-800 text-sm">
                                            Click to upload architectural photo
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1">PNG, JPG, or WEBP up to 10MB</p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                            {formError.image && <p className="text-red-500 text-xs">{formError.image}</p>}
                        </div>

                        {/* Submit Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                type="submit"
                                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm hover:from-blue-500 hover:to-indigo-500 transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <PlusCircle className="w-4 h-4" />
                                <span>Publish Residence to Portfolio</span>
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                )}
            </div>
            <div className="mt-20">
                <Footer />
            </div>
        </div>
    );
}

export default PropertyAdd;
