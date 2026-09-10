import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { 
  Search, MapPin, Bed, Bath, Maximize2, ArrowRight, 
  Heart, Sparkles, Filter, RefreshCw, ArrowUpRight
} from "lucide-react";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

function PropertyView() {
    const url = "https://horizonhomes-backend.onrender.com";
    const [properties, setProperties] = useState([]);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'sale', 'rent'
    const [sortBy, setSortBy] = useState("default"); // 'default', 'price-low', 'price-high'
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("favorites") || "[]");
        } catch {
            return [];
        }
    });
    const navigate = useNavigate();

    function getAllProperty() {
        setLoading(true);
        axios.get(`${url}/property`)
            .then((response) => {
                setProperties(response.data.prtData || []);
                setLoading(false);
            })
            .catch(() => {
                Swal.fire("Error", "Unable to fetch data from API. Please try again.", "error");
                setLoading(false);
            });
    }

    useEffect(() => {
        getAllProperty();
        window.scrollTo(0, 0);
    }, []);

    const toggleFavorite = (id, e) => {
        e.stopPropagation();
        const updated = favorites.includes(id)
            ? favorites.filter((fav) => fav !== id)
            : [...favorites, id];
        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
    };

    // Filter and Sort Logic
    const filteredProperties = properties
        .filter((property) => {
            const propertyType = property.type ? property.type.toLowerCase() : "";
            const propertyStatus = property.status ? property.status.toLowerCase() : "";
            const searchTerm = search.toLowerCase();

            const matchesType = filterType === "all" || propertyType === filterType;
            const matchesStatus = statusFilter === "all" || propertyStatus === statusFilter;
            const matchesSearch =
                (property.title && property.title.toLowerCase().includes(searchTerm)) ||
                (property.location && property.location.toLowerCase().includes(searchTerm));

            return matchesType && matchesStatus && matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
            if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
            return 0;
        });

    return (
        <div className="bg-[#070a10] min-h-screen text-slate-100 pt-32 pb-20 selection:bg-blue-600 selection:text-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Header & Breadcrumb */}
                <div className="mb-12">
                    <nav className="text-xs text-slate-400 font-medium mb-3 flex items-center gap-2">
                        <Link to="/" className="hover:text-white transition">Home</Link>
                        <span>/</span>
                        <span className="text-blue-400 font-semibold">Properties</span>
                    </nav>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Curated Residences
                            </div>
                            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
                                Available Masterpieces
                            </h1>
                            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-light">
                                Verified luxury villas, penthouses, and private estates available for immediate acquisition and private lease.
                            </p>
                        </div>
                        <button
                            onClick={getAllProperty}
                            className="inline-flex items-center gap-2 self-start md:self-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
                        >
                            <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                            <span>Refresh Listings</span>
                        </button>
                    </div>
                </div>

                {/* Filter Control Console - Clean & Spacious */}
                <div className="bg-slate-900/60 p-5 sm:p-6 rounded-3xl border border-slate-800/80 shadow-xl mb-10 space-y-4 backdrop-blur-xl">
                    {/* Row 1: Search & Sort */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search Input */}
                        <div className="relative w-full md:flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by property title, neighborhood, or city..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-2xl text-sm text-white focus:outline-none focus:border-blue-500 transition font-medium placeholder:text-slate-500"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white font-semibold px-2 py-0.5"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        {/* Status Filter (Sale / Rent) */}
                        <div className="flex items-center bg-slate-950/80 p-1 rounded-2xl w-full md:w-auto shrink-0 justify-center border border-slate-800">
                            {[
                                { id: "all", label: "All Properties" },
                                { id: "sale", label: "For Sale" },
                                { id: "rent", label: "For Rent" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setStatusFilter(tab.id)}
                                    className={`px-5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                                        statusFilter === tab.id
                                            ? "bg-blue-600 text-white shadow-sm"
                                            : "text-slate-400 hover:text-white"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="w-full md:w-auto shrink-0">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full md:w-auto px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs font-semibold text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
                            >
                                <option value="default">Sort: Recommended</option>
                                <option value="price-low">Valuation: Low to High</option>
                                <option value="price-high">Valuation: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 2: Property Type Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-800/80">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-2 flex items-center gap-1">
                            <Filter className="w-3 h-3 text-blue-400" /> Type:
                        </span>
                        {[
                            { id: "all", label: "All Properties" },
                            { id: "villa", label: "Villas" },
                            { id: "apartment", label: "Apartments & Penthouses" },
                            { id: "house", label: "Modern Houses" },
                            { id: "office", label: "Commercial Estates" },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setFilterType(item.id)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition whitespace-nowrap ${
                                    filterType === item.id
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : "bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-8 text-xs text-slate-400">
                    <span>Showing <strong className="text-white">{filteredProperties.length}</strong> available residences</span>
                    {(search || filterType !== "all" || statusFilter !== "all") && (
                        <button
                            onClick={() => {
                                setSearch("");
                                setFilterType("all");
                                setStatusFilter("all");
                            }}
                            className="text-blue-400 hover:text-blue-300 underline font-semibold"
                        >
                            Reset all filters
                        </button>
                    )}
                </div>

                {/* Listings Grid */}
                {loading ? (
                    <Loader text="Loading properties..." />
                ) : filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredProperties.map((item) => {
                            const isFav = favorites.includes(item._id);
                            const imageSrc = item.image
                                ? `${url}/${item.image}`
                                : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80";

                            return (
                                <div
                                    key={item._id}
                                    onClick={() => {
                                        localStorage.setItem("propertyId", item._id);
                                        navigate("/propertyDetail");
                                    }}
                                    className="bg-slate-900/60 rounded-3xl overflow-hidden border border-slate-800/80 shadow-lg hover:shadow-2xl hover:border-slate-700 transition-all duration-300 flex flex-col group cursor-pointer"
                                >
                                    {/* Image Wrapper */}
                                    <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                                        <img
                                            src={imageSrc}
                                            alt={item.title || "Property"}
                                            onError={(e) => {
                                                e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
                                            }}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />

                                        {/* Status Badge */}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md ${
                                                item.status === "rent"
                                                    ? "bg-emerald-600/90 text-white"
                                                    : "bg-blue-600/90 text-white"
                                            }`}>
                                                {item.status === "rent" ? "For Rent" : "For Sale"}
                                            </span>
                                            {item.type && (
                                                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-950/80 text-amber-300 backdrop-blur-md border border-amber-500/20 capitalize">
                                                    {item.type}
                                                </span>
                                            )}
                                        </div>

                                        {/* Favorite Button */}
                                        <button
                                            onClick={(e) => toggleFavorite(item._id, e)}
                                            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-110 transition shadow-md"
                                            title="Save to favorites"
                                        >
                                            <Heart className={`w-4 h-4 ${isFav ? "fill-rose-500 text-rose-500" : "text-white"}`} />
                                        </button>

                                        <div className="absolute bottom-3 left-4 text-xs font-medium text-slate-300 flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                            <span>{item.location}</span>
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                                        <div>
                                            <h2 className="font-heading text-xl font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                                                {item.title}
                                            </h2>

                                            {/* Price */}
                                            <div className="mt-3 flex items-baseline gap-1">
                                                <span className="font-heading text-2xl font-bold text-amber-300">
                                                    ${Number(item.price || 0).toLocaleString()}
                                                </span>
                                                {item.status === "rent" && (
                                                    <span className="text-xs text-slate-400 font-normal"> / month</span>
                                                )}
                                            </div>

                                            {/* Specs Row */}
                                            <div className="grid grid-cols-3 gap-4 pt-5 mt-5 border-t border-slate-800 text-slate-300 text-xs">
                                                <div className="flex items-center gap-2">
                                                    <Bed className="w-4 h-4 text-blue-400" />
                                                    <span>{item.bedrooms || "—"} {item.type === "office" ? "Cabins" : "Beds"}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Bath className="w-4 h-4 text-indigo-400" />
                                                    <span>{item.bathrooms || "—"} Baths</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Maximize2 className="w-4 h-4 text-amber-400" />
                                                    <span>{item.area ? `${Number(item.area).toLocaleString()} sqft` : "—"}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="pt-2 flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-slate-300 group-hover:text-white transition-colors">
                                            <span>View Details</span>
                                            <ArrowUpRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-12 text-center max-w-lg mx-auto shadow-xl">
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8" />
                        </div>
                        <h3 className="font-heading text-xl font-bold text-white mb-2">No Residences Found</h3>
                        <p className="text-slate-400 text-sm mb-6">
                            We couldn't find any properties matching your current search criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearch("");
                                setFilterType("all");
                                setStatusFilter("all");
                            }}
                            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition shadow-md"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>
            <div className="mt-28">
                <Footer />
            </div>
        </div>
    );
}

export default PropertyView;

