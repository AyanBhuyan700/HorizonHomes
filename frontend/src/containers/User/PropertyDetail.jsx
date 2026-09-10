import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { 
  MapPin, Bed, Bath, Maximize2, ShieldCheck, Check, 
  ArrowLeft, Calendar, Share2, Heart, Phone, Mail, 
  CreditCard, Sparkles, Building, Lock
} from "lucide-react";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

function PropertyDetail() {
    const propertyId = localStorage.getItem("propertyId");
    const url = "https://horizonhomes-backend.onrender.com";
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [tourDate, setTourDate] = useState("");
    const [tourBooked, setTourBooked] = useState(false);

    useEffect(() => {
        if (!propertyId) {
            Swal.fire("Notice", "Please select a property to view details.", "info");
            navigate("/view");
            return;
        }

        axios.get(`${url}/propertyDetail?id=${propertyId}`)
            .then((res) => setProperty(res.data.prtData))
            .catch(() => Swal.fire("Error", "Unable to fetch property details", "error"))
            .finally(() => setLoading(false));

        window.scrollTo(0, 0);
    }, [propertyId, navigate]);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: property?.title,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            Swal.fire("Link Copied", "Property URL copied to clipboard!", "success");
        }
    };

    const handleBookTour = (e) => {
        e.preventDefault();
        if (!tourDate) {
            Swal.fire("Select Date", "Please choose a preferred tour date", "warning");
            return;
        }
        setTourBooked(true);
        Swal.fire("Private Showing Requested", `Our concierge will confirm your viewing for ${tourDate}.`, "success");
    };

    if (loading) return <Loader text="Retrieving property archives..." />;

    if (!property) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center max-w-md shadow-lg">
                    <h2 className="font-heading text-xl font-bold text-slate-800 mb-2">Residence Not Found</h2>
                    <p className="text-slate-600 text-sm mb-6">This property listing may have been moved or sold.</p>
                    <button
                        onClick={() => navigate("/view")}
                        className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500 transition shadow-md"
                    >
                        Back to Properties
                    </button>
                </div>
            </div>
        );
    }

    const imageSrc = property.image
        ? `${url}/${property.image}`
        : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80";

    const amenitiesList = [
        "Private Swimming Pool",
        "Smart Home Automation",
        "24/7 Monitored Security",
        "Multi-Car Garage",
        "Panoramic Horizon Views",
        "Climate-Controlled Wine Cellar",
        "Private Landscaped Garden",
        "High-Speed Fiber Connectivity",
    ];

    return (
        <div className="bg-slate-50 min-h-screen text-slate-900 pt-28 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Navigation & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <nav className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                        <span>/</span>
                        <Link to="/view" className="hover:text-blue-600 transition">Residences</Link>
                        <span>/</span>
                        <span className="text-slate-700 font-semibold truncate max-w-xs">{property.title}</span>
                    </nav>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                            onClick={handleShare}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition shadow-sm"
                        >
                            <Share2 className="w-3.5 h-3.5" /> Share
                        </button>
                        <button
                            onClick={() => setSaved(!saved)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition shadow-sm"
                        >
                            <Heart className={`w-3.5 h-3.5 ${saved ? "fill-rose-500 text-rose-500" : ""}`} />
                            {saved ? "Saved" : "Save"}
                        </button>
                    </div>
                </div>

                {/* Main Image Showcase */}
                <div className="relative rounded-3xl overflow-hidden h-72 sm:h-96 md:h-[480px] lg:h-[540px] shadow-xl bg-slate-900 mb-10">
                    <img
                        src={imageSrc}
                        alt={property.title}
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
                        }}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

                    {/* Overlay Badges */}
                    <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${
                            property.status === "rent"
                                ? "bg-emerald-600 text-white"
                                : "bg-blue-600 text-white"
                        }`}>
                            {property.status === "rent" ? "For Rent" : "For Sale"}
                        </span>
                        <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900/90 text-amber-300 backdrop-blur-md border border-amber-500/30 shadow-lg capitalize">
                            {property.type}
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-slate-800 backdrop-blur-md shadow-lg">
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Verified Title
                        </span>
                    </div>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5 mb-1">
                            <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                            {property.location}
                        </span>
                        <h1 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight">
                            {property.title}
                        </h1>
                    </div>
                </div>

                {/* Two-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left 8 Cols: Details, Amenities, Specs */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Specs Matrix */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
                                <Bed className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                <p className="font-heading text-2xl font-bold text-slate-900">{property.bedrooms || "—"}</p>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
                                    {property.type === "office" ? "Executive Cabins" : "Bedrooms"}
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
                                <Bath className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                                <p className="font-heading text-2xl font-bold text-slate-900">{property.bathrooms || "—"}</p>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Bathrooms</p>
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
                                <Maximize2 className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                                <p className="font-heading text-2xl font-bold text-slate-900">
                                    {property.area ? Number(property.area).toLocaleString() : "—"}
                                </p>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Square Feet</p>
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
                                <Building className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                                <p className="font-heading text-2xl font-bold text-slate-900 capitalize">{property.type || "Villa"}</p>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Architecture</p>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                            <h2 className="font-heading text-2xl font-bold text-slate-900">Architectural Narrative</h2>
                            <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                                {property.description || "Designed to the highest luxury standards, this residence seamlessly blends sophisticated design with everyday comfort. Generous natural light, expansive entertaining spaces, and custom architectural detailing create an extraordinary living environment."}
                            </p>
                        </div>

                        {/* Amenities Matrix */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
                            <h2 className="font-heading text-2xl font-bold text-slate-900">Curated Amenities & Highlights</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {amenitiesList.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                                        <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                            <Check className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Guarantee Card */}
                        <div className="p-6 rounded-3xl bg-blue-50/60 border border-blue-100 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                                <Lock className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-slate-900 text-base">Discreet Legal Escrow & Protection</h3>
                                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                                    Every transaction on HorizonHomes is backed by licensed escrow accounts, automated digital contracts, and verified title registry guarantee.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right 4 Cols: Sticky Checkout & Tour Booking Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xl lg:sticky lg:top-28">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Offered Price</span>
                            <div className="flex items-baseline gap-1 mt-1 mb-4">
                                <span className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
                                    ${Number(property.price || 0).toLocaleString()}
                                </span>
                                {property.status === "rent" && (
                                    <span className="text-sm font-medium text-slate-500">/ month</span>
                                )}
                            </div>

                            {/* Buy Now / Reserve Button */}
                            <button
                                onClick={() => navigate("/payment")}
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm hover:from-blue-500 hover:to-indigo-500 transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 mb-4"
                            >
                                <CreditCard className="w-4 h-4" />
                                <span>{property.status === "rent" ? "Secure Lease Deposit" : "Acquire Residence Now"}</span>
                            </button>

                            {/* Schedule Private Tour Mini-form */}
                            <div className="border-t border-slate-100 pt-6 mt-6">
                                <h3 className="font-heading font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-600" /> Schedule a Private Showing
                                </h3>
                                <p className="text-xs text-slate-500 mb-3">
                                    Experience this residence in person with a HorizonHomes luxury advisor.
                                </p>

                                <form onSubmit={handleBookTour} className="space-y-3">
                                    <input
                                        type="date"
                                        value={tourDate}
                                        onChange={(e) => setTourDate(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-500"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition"
                                    >
                                        Request Tour Date
                                    </button>
                                </form>
                            </div>

                            {/* Concierge Advisor Contact */}
                            <div className="border-t border-slate-100 pt-6 mt-6 space-y-3">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Listing Advisor</span>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                                        HH
                                    </div>
                                    <div>
                                        <p className="font-heading font-bold text-slate-900 text-sm">HorizonHomes Concierge</p>
                                        <p className="text-xs text-slate-500">Private Client Group</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-1">
                                    <a
                                        href="tel:+18005559090"
                                        className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center justify-center gap-1.5 transition"
                                    >
                                        <Phone className="w-3 h-3 text-blue-600" /> Call
                                    </a>
                                    <a
                                        href="mailto:concierge@horizonhomes.com"
                                        className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center justify-center gap-1.5 transition"
                                    >
                                        <Mail className="w-3 h-3 text-indigo-600" /> Email
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-20">
                <Footer />
            </div>
        </div>
    );
}

export default PropertyDetail;
