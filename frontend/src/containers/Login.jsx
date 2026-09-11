import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, Lock, Eye, EyeOff, Building2, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import Loader from "../components/Loader";

function Login() {
  const url = "https://horizonhomes-backend.onrender.com";
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  async function loginCheck() {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/login`, form);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("role", response.data.role);

      toast.success("Welcome back! Redirecting...", { autoClose: 1500 });

      setTimeout(() => {
        if (response.data.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
        window.location.reload();
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  const onLoginSubmit = (e) => {
    e.preventDefault();

    if (!form.email.trim()) {
      toast.warning("Please enter your registered email");
      return;
    }
    if (!form.password.trim()) {
      toast.warning("Please enter your account password");
      return;
    }

    loginCheck();
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-950">
      {/* Background Architectural Image with Luxury Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')" }}
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
            Client & Advisor Sign In
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 font-light">
            Access your verified portfolio, inquiries, and luxury listings.
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/85 backdrop-blur-2xl rounded-3xl border border-slate-800 p-8 shadow-2xl glow-blue">
          {loading ? (
            <Loader text="Authenticating credentials..." />
          ) : (
            <form onSubmit={onLoginSubmit} className="space-y-5">
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
                    placeholder="name@domain.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder:text-slate-600 font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    onChange={changeHandler}
                    value={form.password}
                    placeholder="••••••••••••"
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

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-semibold text-sm hover:from-blue-500 hover:to-indigo-500 transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          )}

          {/* Footer note */}
          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              New to HorizonHomes?{" "}
              <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition">
                Create an account
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

export default Login;
