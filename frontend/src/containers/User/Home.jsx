import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Search, MapPin, Home as HomeIcon, DollarSign, ShieldCheck, 
  Sparkles, Bed, Bath, Maximize2, ArrowRight, Calculator, 
  Award, Key, Star, ArrowUpRight
} from "lucide-react";
import Footer from "../../components/Footer";

function Home() {
  const navigate = useNavigate();
  const url = "https://horizonhomes-backend.onrender.com";
  const [activeTab, setActiveTab] = useState("buy");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [liveProperties, setLiveProperties] = useState([]);

  // Mortgage Calculator State
  const [homePrice, setHomePrice] = useState(2500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Fetch live properties from backend
    axios.get(`${url}/property`)
      .then((res) => {
        if (res.data?.prtData && res.data.prtData.length > 0) {
          setLiveProperties(res.data.prtData.slice(0, 3));
        }
      })
      .catch(() => {
        // Gracefully use curated showcases if backend is sleeping or empty
      });
  }, []);


  const handleProtectedAction = (path) => {
    const token = localStorage.getItem("id");
    if (!token || token === "undefined" || token === "null") {
      navigate("/register");
      return;
    }
    navigate(path);
  };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    handleProtectedAction("/view");
  };

  // Calculate monthly mortgage
  const calculateMonthlyPayment = () => {
    const principal = homePrice * (1 - downPaymentPercent / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12;
    if (monthlyRate === 0) return Math.round(principal / numberOfPayments);
    const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return Math.round(monthly);
  };

  const featuredProperties = [
    {
      id: "1",
      title: "The Bel Air Horizon Sanctuary",
      location: "Bel Air, Los Angeles, CA",
      price: 4850000,
      status: "sale",
      type: "Villa",
      bedrooms: 6,
      bathrooms: 7,
      area: 8400,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      tag: "Architectural Digest",
    },
    {
      id: "2",
      title: "Azure Marina Waterfront Penthouse",
      location: "Biscayne Bay, Miami, FL",
      price: 18500,
      status: "rent",
      type: "Penthouse",
      bedrooms: 4,
      bathrooms: 4.5,
      area: 4600,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      tag: "Private Dock",
    },
    {
      id: "3",
      title: "Tribeca Cast-Iron Luxury Loft",
      location: "Franklin Street, Manhattan, NY",
      price: 3200000,
      status: "sale",
      type: "Loft",
      bedrooms: 3,
      bathrooms: 3,
      area: 3200,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      tag: "Historic Modern",
    },
  ];

  const lifestyleCategories = [
    {
      title: "Waterfront Sanctuaries",
      count: "142 Estates",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Sky Penthouses",
      count: "89 Residences",
      image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Modernist Villas",
      count: "215 Properties",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Private Island Retreats",
      count: "38 Locations",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const displayProperties = liveProperties.length > 0
    ? liveProperties.map(p => ({
        id: p._id,
        title: p.title,
        location: p.location,
        price: p.price,
        status: p.status || "sale",
        type: p.type || "Villa",
        bedrooms: p.bedrooms || 4,
        bathrooms: p.bathrooms || 4,
        area: p.area || 4500,
        image: p.image ? `${url}/${p.image}` : "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
        tag: "Verified Residence",
        isLive: true
      }))
    : featuredProperties;

  const handlePropertyClick = (property) => {
    if (property.isLive) {
      localStorage.setItem("propertyId", property.id);
      handleProtectedAction("/propertyDetail");
    } else {
      handleProtectedAction("/view");
    }
  };

  return (
    <div className="bg-[#070a10] min-h-screen text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* 1. Cinematic Hero Section - Airy & Uncluttered */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-24 px-6 sm:px-8 lg:px-12 overflow-hidden">

        {/* Background Image & Ambient Vignette */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-35 scale-105 transform transition-transform duration-10000 ease-out"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-[#070a10]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Subtle Prestige Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/60 border border-slate-700/60 text-[11px] font-semibold tracking-[0.2em] uppercase text-amber-300 mb-8 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Horizon Homes • Private Client Collection
          </div>

          {/* Heading - Clean & Poetic */}
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.1] mb-6">
            Architectural Masterpieces for <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-amber-200">Discerning Lives</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Curated architectural estates, sky penthouses, and private waterfront sanctuaries across the world's most desirable addresses.
          </p>

          {/* Clean, Streamlined Floating Search Bar */}
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="inline-flex items-center gap-1 p-1 bg-slate-900/70 border border-slate-800 rounded-2xl mb-4 backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setActiveTab("buy")}
                className={`px-6 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                  activeTab === "buy"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Acquisition
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("rent")}
                className={`px-6 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                  activeTab === "rent"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Private Lease
              </button>
            </div>

            {/* Search Inputs Bar */}
            <form 
              onSubmit={handleHeroSearch}
              className="bg-slate-900/80 backdrop-blur-2xl p-3 sm:p-4 rounded-3xl border border-slate-700/70 shadow-2xl grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-left"
            >
              {/* Location Input */}
              <div className="sm:col-span-4 px-4 py-2.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                  <MapPin className="w-3 h-3 text-blue-400" /> Location
                </span>
                <input
                  type="text"
                  placeholder="Bel Air, Miami, Manhattan..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-slate-500 font-medium"
                />
              </div>

              {/* Property Type Select */}
              <div className="sm:col-span-3 px-4 py-2.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                  <HomeIcon className="w-3 h-3 text-indigo-400" /> Property Type
                </span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-transparent text-white text-sm focus:outline-none font-medium cursor-pointer"
                >
                  <option value="all" className="bg-slate-900">All Residences</option>
                  <option value="villa" className="bg-slate-900">Luxury Villas</option>
                  <option value="penthouse" className="bg-slate-900">Sky Penthouses</option>
                  <option value="estate" className="bg-slate-900">Historic Estates</option>
                </select>
              </div>

              {/* Price Select */}
              <div className="sm:col-span-3 px-4 py-2.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                  <DollarSign className="w-3 h-3 text-amber-400" /> Price Range
                </span>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full bg-transparent text-white text-sm focus:outline-none font-medium cursor-pointer"
                >
                  <option value="all" className="bg-slate-900">Any Valuation</option>
                  <option value="1m-3m" className="bg-slate-900">$1M - $3M</option>
                  <option value="3m-10m" className="bg-slate-900">$3M - $10M</option>
                  <option value="10m-plus" className="bg-slate-900">$10M+ Trophy</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full h-full min-h-[50px] rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 group cursor-pointer"
                >
                  <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. Trust Metrics Strip - Spacious & Understated */}
      <section className="py-16 border-y border-slate-800/60 bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="font-heading text-3xl sm:text-4xl font-light text-blue-400">$4.8B+</p>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">Portfolio Volume</p>
            </div>
            <div className="space-y-1">
              <p className="font-heading text-3xl sm:text-4xl font-light text-white">12,500+</p>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">Verified Residences</p>
            </div>
            <div className="space-y-1">
              <p className="font-heading text-3xl sm:text-4xl font-light text-amber-300">45+</p>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">Global Capital Hubs</p>
            </div>
            <div className="space-y-1">
              <p className="font-heading text-3xl sm:text-4xl font-light text-emerald-400">99.4%</p>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Residences - Generous Whitespace & Elegant Cards */}
      <section className="py-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">Curated Residences</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-2">
              Featured Architectural Masterpieces
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl font-light">
              Hand-selected premier properties with verified deeds, refined finishes, and prime locations.
            </p>
          </div>
          <button
            onClick={() => handleProtectedAction("/view")}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-blue-400 hover:text-blue-300 transition group self-start md:self-auto"
          >
            <span>Explore All Properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayProperties.map((property) => (
            <div
              key={property.id}
              onClick={() => handlePropertyClick(property)}
              className="bg-slate-900/60 rounded-3xl overflow-hidden border border-slate-800/80 shadow-lg hover:shadow-2xl hover:border-slate-700 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Image Container with Elegant Aspect Ratio */}
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                
                {/* Floating Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md ${
                    property.status === "rent"
                      ? "bg-emerald-600/90 text-white"
                      : "bg-blue-600/90 text-white"
                  }`}>
                    {property.status === "rent" ? "For Lease" : "For Sale"}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-950/80 text-amber-300 backdrop-blur-md border border-amber-500/20">
                    {property.type}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{property.location}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {property.title}
                  </h3>

                  <div className="mt-3">
                    <span className="font-heading text-2xl font-bold text-amber-300">
                      ${property.price.toLocaleString()}
                    </span>
                    {property.status === "rent" && (
                      <span className="text-xs text-slate-400 font-normal"> / month</span>
                    )}
                  </div>

                  {/* Specs Bar with Generous Spacing */}
                  <div className="grid grid-cols-3 gap-4 pt-5 mt-5 border-t border-slate-800 text-slate-300 text-xs">
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4 text-blue-400" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-4 h-4 text-indigo-400" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize2 className="w-4 h-4 text-amber-400" />
                      <span>{property.area.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </div>

                {/* Refined Action Link */}
                <div className="pt-2 flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-slate-300 group-hover:text-white transition-colors">
                  <span>View Details</span>
                  <ArrowUpRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Architectural Lifestyle Categories - Clean & Airy */}
      <section className="py-24 border-t border-slate-800/60 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">Collections</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-2">
              Explore by Architectural Style
            </h2>
            <p className="text-slate-400 text-sm mt-2 font-light">
              From oceanfront sanctuaries to iconic sky penthouses, discover properties tailored to your lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lifestyleCategories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => handleProtectedAction("/view")}
                className="group relative h-84 rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-slate-800/70 hover:border-slate-600 transition-all duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[11px] font-semibold text-amber-300 tracking-wider uppercase">{cat.count}</span>
                  <h3 className="font-heading text-xl font-bold text-white mt-1 group-hover:text-blue-300 transition-colors">
                    {cat.title}
                  </h3>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 group-hover:text-white">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Streamlined Mortgage & Investment Planner - Clean & Uncluttered */}
      <section className="py-24 max-w-5xl mx-auto px-6 sm:px-8">
        <div className="bg-slate-900/70 rounded-3xl p-8 sm:p-12 border border-slate-800/80 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Calculator className="w-3.5 h-3.5" /> Investment Planning
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">
              Affordability & Financing Estimator
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Estimate your monthly investment breakdown with custom property parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-6">
              {/* Property Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Property Valuation</span>
                  <span className="text-blue-400 font-heading text-base">${homePrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="15000000"
                  step="100000"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Down Payment */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Down Payment ({downPaymentPercent}%)</span>
                  <span className="text-indigo-400 font-heading text-base">
                    ${Math.round((homePrice * downPaymentPercent) / 100).toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Term Selection */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs text-slate-400 font-semibold uppercase">Loan Term:</span>
                {[15, 20, 30].map((years) => (
                  <button
                    key={years}
                    type="button"
                    onClick={() => setLoanTermYears(years)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      loanTermYears === years
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {years} Years
                  </button>
                ))}
              </div>
            </div>

            {/* Result Box */}
            <div className="lg:col-span-5 bg-slate-950/80 p-6 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Estimated Monthly Investment</span>
              <div className="font-heading text-4xl font-bold text-amber-300 mt-2 mb-4">
                ${calculateMonthlyPayment().toLocaleString()}
                <span className="text-xs font-normal text-slate-400"> /mo</span>
              </div>

              <div className="space-y-2 text-xs text-left border-t border-slate-800/80 pt-4 my-4 text-slate-400">
                <div className="flex justify-between">
                  <span>Principal & Interest</span>
                  <span className="text-white font-medium">${calculateMonthlyPayment().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Escrow Tax</span>
                  <span className="text-white font-medium">${Math.round((homePrice * 0.012) / 12).toLocaleString()}/mo</span>
                </div>
              </div>

              <button
                onClick={() => handleProtectedAction("/view")}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md shadow-blue-600/20 cursor-pointer"
              >
                Browse Residences
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. The Sovereign Standard - 3 Uncluttered Pillars */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">Institutional Excellence</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-2">
            The Horizon Standard
          </h2>
          <p className="text-slate-400 text-sm mt-2 font-light">
            Uncompromising legal diligence, discreet representation, and institutional escrow security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: ShieldCheck,
              title: "Verified Title Deeds",
              desc: "Every residence in our portfolio undergoes forensic deed inspection and zoning authentication by certified real estate barristers.",
            },
            {
              icon: Key,
              title: "Institutional Escrow",
              desc: "Acquisition deposits are secured in tier-1 attorney escrow accounts with direct digital authorization via Stripe infrastructure.",
            },
            {
              icon: Award,
              title: "Private Wealth Concierge",
              desc: "Dedicated personal portfolio advisors to orchestrate private chartered viewings, valuation appraisals, and conveyance closings.",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800/80 hover:border-slate-700 transition-colors space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white">{item.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Client Endorsement Quote - Editorial & Prestigious */}
      <section className="py-20 border-t border-slate-800/60 bg-slate-950/60">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <div className="flex justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <blockquote className="font-heading text-xl sm:text-2xl text-slate-200 font-light leading-relaxed italic">
            "HorizonHomes provided discreet access to off-market architectural villas we simply could not locate elsewhere. The digital escrow and closing consultation was genuinely effortless."
          </blockquote>
          <div>
            <p className="font-semibold text-white text-sm">Victoria Sterling</p>
            <p className="text-xs text-blue-400">Private Wealth Portfolio Principal • London & Geneva</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;

