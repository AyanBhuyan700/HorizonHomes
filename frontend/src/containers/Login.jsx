import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const url = "https://horizonhomes-backend.onrender.com";
  const [form, setForm] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  async function loginCheck() {
    try {
      const response = await axios.post(`${url}/login`, form);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("role", response.data.role);

      toast.success("Login successful!", { autoClose: 2000 });

      setTimeout(() => {
        if (response.data.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
        window.location.reload();
      }, 2000);
    } catch (err) {
      toast.error("Invalid email or password");
    }
  }

  const onLoginSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    let hasErrors = false;

    if (!form.email.trim()) {
      hasErrors = true;
      errors.email = "Email is required";
    }

    if (!form.password.trim()) {
      hasErrors = true;
      errors.password = "Password is required";
    }

    setFormError(errors);

    if (!hasErrors) {
      loginCheck();
    } else {
      toast.warning("Please fill in all required fields.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 bg-clip-text text-transparent mb-6">
          Login to Your Account
        </h2>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              onChange={changeHandler}
              value={form.email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              onChange={changeHandler}
              value={form.password}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-cyan-400 hover:via-blue-300 hover:to-indigo-400 transition"
            onClick={onLoginSubmit}
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500 bg-clip-text text-transparent hover:from-cyan-400 hover:via-blue-300 hover:to-indigo-400"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
