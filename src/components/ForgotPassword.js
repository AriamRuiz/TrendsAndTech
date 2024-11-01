import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost/api/ForgotPassword", {
        email,
        newPassword,
      });
      if (response.data.status === 1) {
        setMessage("Password updated successfully");
      } else {
        setMessage(response.data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email and new password to reset your account
        </p>

        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("success") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Change Password
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/LoginPage"
            className="text-blue-600 font-semibold hover:underline"
          >
            Log in here
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
