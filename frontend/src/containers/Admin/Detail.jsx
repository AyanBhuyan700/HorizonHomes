import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { 
  Building2, MapPin, Bed, Bath, Maximize2, Edit3, Trash2, 
  ArrowLeft, ShieldCheck, DollarSign, Tag, CheckCircle2 
} from "lucide-react";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

function Detail() {
  const url = "https://horizonhomes-backend.onrender.com";
  const propertyId = localStorage.getItem("propertyId");
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  function deleteProperty(id) {
    Swal.fire({
      title: "Delete Residence?",
      text: "This action will permanently purge the property from the portfolio database.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Permanently Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${url}/property`, { data: { id: id } })
          .then((d) => {
            Swal.fire("Deleted", d.data.message || "Property removed successfully.", "success");
            navigate("/dashboard");
          })
          .catch(() => {
            Swal.fire("Error", "Something went wrong while deleting", "error");
          });
      }
    });
  }

  useEffect(() => {
    if (!propertyId) {
      Swal.fire("Notice", "No property selected", "info");
      navigate("/dashboard");
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
  }, [propertyId, navigate]);

  if (loading) return <Loader text="Loading administrative archives..." />;

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center max-w-md shadow-lg">
          <p className="text-slate-600 text-sm mb-4">Property details unavailable or record deleted.</p>
          <Link
            to="/dashboard"
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition shadow-md"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const imageSrc = property.image
    ? `${url}/${property.image}`
    : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                localStorage.setItem("propertyId", property._id);
                navigate("/editProperty");
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Record
            </button>
            <button
              onClick={() => deleteProperty(property._id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-sm transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden mb-12">
          {/* Image */}
          <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
            <img
              src={imageSrc}
              alt={property.title}
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-6 left-6 flex gap-2">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${
                property.status === "rent" ? "bg-emerald-600 text-white" : "bg-blue-600 text-white"
              }`}>
                {property.status === "rent" ? "For Rent" : "For Sale"}
              </span>
              {property.type && (
                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900/90 text-amber-300 backdrop-blur-md capitalize">
                  {property.type}
                </span>
              )}
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs text-slate-300 flex items-center gap-1.5 mb-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                {property.location}
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold">{property.title}</h1>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-8 sm:p-10 space-y-8">
            {/* Price & Specs Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Listing Price</span>
                <p className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 mt-0.5">
                  ${Number(property.price || 0).toLocaleString()}
                  {property.status === "rent" && <span className="text-sm font-normal text-slate-500"> / month</span>}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> Database Verified
                </span>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Bed className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
                <p className="font-heading text-xl font-bold text-slate-900">{property.bedrooms || "—"}</p>
                <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                  {property.type === "office" ? "Cabins" : "Bedrooms"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Bath className="w-5 h-5 text-indigo-600 mx-auto mb-1.5" />
                <p className="font-heading text-xl font-bold text-slate-900">{property.bathrooms || "—"}</p>
                <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Bathrooms</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Maximize2 className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
                <p className="font-heading text-xl font-bold text-slate-900">
                  {property.area ? Number(property.area).toLocaleString() : "—"}
                </p>
                <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Square Feet</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Building2 className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
                <p className="font-heading text-xl font-bold text-slate-900 capitalize">{property.type || "Villa"}</p>
                <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Home Type</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-lg mb-2">Description & Notes</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {property.description || "No specific architectural description provided."}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
