import React, { useState } from "react";
import axios from "axios";
import "../css/ForgotPassword.css";
import { Link } from "react-router-dom";

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
      // Comprueba la respuesta de la API y muestra el mensaje adecuado
      if (response.data.status === 1) {
        setMessage("Password successfully");
      } else {
        setMessage(response.data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="forgot-password">
      <h2>Forgot Password</h2>
      <form onSubmit={handleChangePassword}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
      <hr className="my-4 border-gray-200" />
      <div className="mt-6 text-center">
        <Link
          to="/LoginPage"
          className="text-xl font-bold transition duration-200"
          style={{ color: "#0934df" }}
        >
          LOGIN HERE
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
