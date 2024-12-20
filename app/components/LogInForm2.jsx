// Code for the login form component
// Related file: app/login/page.jsx
// app/api/auth/login/route.js
// after the user logs in, they are redirected to the home page


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    const { email, password } = formData;
  
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
  
      setSuccess("Login successful!");
      router.push("/?welcome=true"); // Pass query parameter on successful login
    } catch (err) {
      setError(err.message);
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full p-4">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

        {error && <p className="text-red-500 mb-4 text-center bg-red-100 p-2 rounded">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-center bg-green-100 p-2 rounded">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <a href="/pages/signup" className="text-blue-600 hover:underline font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

