import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { 
  Building2, PlusCircle, DollarSign, Key, Home as HomeIcon, 
  MapPin, Eye, Edit3, Trash2, Search, RefreshCw, Sparkles 
} from "lucide-react";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

function Dashboard() {
  const url = "https://horizonhomes-backend.onrender.com";
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function getAllProperty() {
    setLoading(true);
    axios.get(`${url}/property`)
      .then((p) => {
        setProperties(p.data.prtData || []);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error", "Unable to fetch portfolio data from API", "error");
        setLoading(false);
      });
  }

  useEffect(() => {
    getAllProperty();
    window.scrollTo(0, 0);
  }, []);

  function deleteProperty(id, title) {
    Swal.fire({
      title: "Confirm Deletion",
      text: `Are you sure you want to remove "${title}" from the portfolio? This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete Residence",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${url}/property`, { data: { id: id } })
          .then((d) => {
            Swal.fire("Deleted", d.data.message || "Property removed successfully.", "success");
            getAllProperty();
          })
          .catch(() => {
            Swal.fire("Error", "Unable to delete property. Please try again.", "error");
          });
      }
    });
  }

  // Derived metrics
  const totalListings = properties.length;
  const forSaleCount = properties.filter((p) => p.status === "sale").length;
  const forRentCount = properties.filter((p) => p.status === "rent").length;
  const totalValue = properties.reduce((acc, p) => acc + (Number(p.price) || 0), 0);

  const filteredProperties = properties.filter((p) => {
    const s = search.toLowerCase();
    return (
      (p.title && p.title.toLowerCase().includes(s)) ||
      (p.location && p.location.toLowerCase().includes(s)) ||
      (p.type && p.type.toLowerCase().includes(s))
    );
  });

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-700 border border-amber-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Executive Portal
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Properties Management Dashboard
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Oversee and curate all luxury properties, adjust pricing, and review client inquiries.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={getAllProperty}
              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 shadow-sm transition flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-600" /> Refresh
            </button>
            <Link
              to="/addProperty"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> Add Property
            </Link>
          </div>
        </div>

        {/* Executive Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Properties</span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <p className="font-heading text-3xl font-extrabold text-slate-900 mt-3">{totalListings}</p>
            <p className="text-xs text-slate-400 mt-1">Active verified properties</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Asset Value</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <p className="font-heading text-3xl font-extrabold text-slate-900 mt-3">
              ${totalValue.toLocaleString()}
            </p>
            <p className="text-xs text-slate-400 mt-1">Aggregate listing worth</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">For Sale</span>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <HomeIcon className="w-4 h-4" />
              </div>
            </div>
            <p className="font-heading text-3xl font-extrabold text-slate-900 mt-3">{forSaleCount}</p>
            <p className="text-xs text-slate-400 mt-1">Residences on market</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">For Lease</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Key className="w-4 h-4" />
              </div>
            </div>
            <p className="font-heading text-3xl font-extrabold text-slate-900 mt-3">{forRentCount}</p>
            <p className="text-xs text-slate-400 mt-1">Active luxury rentals</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-8 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter listings by title, city, or property type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-500"
            />
          </div>
          <span className="text-xs font-medium text-slate-500 hidden sm:inline">
            Showing {filteredProperties.length} of {properties.length}
          </span>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <Loader text="Retrieving administrative data..." />
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((item) => {
              const imageSrc = item.image
                ? `${url}/${item.image}`
                : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden bg-slate-100">
                      <img
                        src={imageSrc}
                        alt={item.title}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
                        }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                          item.status === "rent" ? "bg-emerald-600 text-white" : "bg-blue-600 text-white"
                        }`}>
                          {item.status === "rent" ? "Rent" : "Sale"}
                        </span>
                        {item.type && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 text-amber-300 backdrop-blur-md capitalize">
                            {item.type}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <h2 className="font-heading text-lg font-bold text-slate-900 truncate">
                        {item.title}
                      </h2>
                      <p className="font-heading text-xl font-extrabold text-slate-900 mt-2">
                        ${Number(item.price || 0).toLocaleString()}
                        {item.status === "rent" && <span className="text-xs text-slate-500 font-normal"> / mo</span>}
                      </p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-6 pt-0 flex items-center gap-2">
                    <button
                      onClick={() => {
                        localStorage.setItem("propertyId", item._id);
                        navigate("/detail");
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Details
                    </button>
                    <button
                      onClick={() => {
                        localStorage.setItem("propertyId", item._id);
                        navigate("/editProperty");
                      }}
                      className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                      title="Edit property"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProperty(item._id, item.title)}
                      className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition"
                      title="Delete property"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <p className="text-slate-600 text-sm mb-4">No properties match your filter.</p>
            <Link
              to="/addProperty"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500 shadow-md transition"
            >
              <PlusCircle className="w-4 h-4" /> Add First Residence
            </Link>
          </div>
        )}
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
