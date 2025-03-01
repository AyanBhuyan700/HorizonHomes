import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const url = "https://horizonhomes-backend.onrender.com";
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [formError, setFormError] = useState({ name: "", email: "", password: "", confirmPassword: "" });


  const changeHandler = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  function registerUser() {
    axios.post(`${url}/register`, form)
      .then((res) => {
        toast.success(res.data.message || "Registered successfully!");
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      });
  }


  function onSubmitUser(e) {
    e.preventDefault();

    let errors = false;
    let error = { name: "", email: "", password: "", confirmPassword: "" };

    if (!form.name.trim()) {
      errors = true;
      error.name = "Name is required";
    }
    if (!form.email.trim()) {
      errors = true;
      error.email = "Email is required";
    }
    if (!form.password.trim()) {
      errors = true;
      error.password = "Password is required";
    }
    if (!form.confirmPassword.trim()) {
      errors = true;
      error.confirmPassword = "Confirm Password is required";
    }
    if (form.password !== form.confirmPassword) {
      errors = true;
      error.confirmPassword = "Passwords do not match";
    }

    setFormError(error);

    if (errors) {
      toast.warning("Please fix the errors before submitting.");
      return;
    }

    registerUser();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 p-6">
      {/* ✅ ToastContainer should be included inside the return */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 mt-16 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Create an Account
        </h2>

        <form onSubmit={onSubmitUser} className="space-y-5">
          <div>
            <label className="block text-gray-800 text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              value={form.name}
              onChange={changeHandler}
            />
            <p className="text-red-600 text-sm">{formError.name}</p>
          </div>

          <div>
            <label className="block text-gray-800 text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              value={form.email}
              onChange={changeHandler}
            />
            <p className="text-red-600 text-sm">{formError.email}</p>
          </div>

          <div>
            <label className="block text-gray-800 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              value={form.password}
              onChange={changeHandler}
            />
            <p className="text-red-600 text-sm">{formError.password}</p>
          </div>

          <div>
            <label className="block text-gray-800 text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              value={form.confirmPassword}
              onChange={changeHandler}
            />
            <p className="text-red-600 text-sm">{formError.confirmPassword}</p>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-cyan-400 hover:via-blue-300 hover:to-indigo-400 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-700 mt-4 text-center">
          Already have an account?
          <Link to="/login" className="bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 bg-clip-text text-transparent font-medium hover:from-cyan-400 hover:via-blue-300 hover:to-indigo-400 transition ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
