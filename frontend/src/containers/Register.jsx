import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User, Mail, Lock, Eye, EyeOff, Building2, ArrowRight, ShieldCheck } from "lucide-react";
import Loader from "../components/Loader";

function Register() {
  const url = "https://horizonhomes-backend.onrender.com";
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  function registerUser() {
    setLoading(true);
    axios.post(`${url}/register`, form)
      .then((res) => {
        toast.success(res.data.message || "Account registered successfully! Please log in.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Registration failed. Please check your details.");
      })
      .finally(() => setLoading(false));
  }

  function onSubmitUser(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.warning("Full name is required");
      return;
    }
    if (!form.email.trim()) {
      toast.warning("Valid email address is required");
      return;
    }
    if (!form.password.trim()) {
      toast.warning("Password is required");
      return;
    }
    if (form.password.length < 6) {
      toast.warning("Password should be at least 6 characters");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    registerUser();
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-950">
      {/* Background Architectural Image with Luxury Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent pointer-events-none" />

      <ToastContainer position="top-right" autoClose={2500} theme="dark" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-105 transition">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading text-2xl font-extrabold text-white tracking-tight">
              Horizon<span className="text-blue-400">Homes</span>
            </span>
          </Link>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Create Client Account
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 font-light">
            Join our exclusive network to view off-market properties and schedule tours.
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/85 backdrop-blur-2xl rounded-3xl border border-slate-800 p-8 shadow-2xl glow-blue">
          {loading ? (
            <Loader text="Registering your client profile..." />
          ) : (
            <form onSubmit={onSubmitUser} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    name="name"
                    required
                    onChange={changeHandler}
                    value={form.name}
                    placeholder="Jane Doe"
                    className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-slate-600 font-medium"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={changeHandler}
                    value={form.email}
                    placeholder="jane@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-slate-600 font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    onChange={changeHandler}
                    value={form.password}
                    placeholder="At least 6 characters"
                    className="w-full pl-11 pr-11 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-slate-600 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    onChange={changeHandler}
                    value={form.confirmPassword}
                    placeholder="Re-enter password"
                    className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-slate-600 font-medium"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-semibold text-sm hover:from-blue-500 hover:to-indigo-500 transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          )}

          {/* Footer note */}
          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-400 transition inline-flex items-center gap-1">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
