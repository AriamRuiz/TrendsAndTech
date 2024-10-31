import React, { useState } from "react";
import axios from "axios";
import "../../css/Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  // Estados para los campos del formulario
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!userName || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError(""); // Limpiamos el mensaje de error si todos los campos están llenos

    axios
      .post("http://localhost/api/Register", {
        userName,
        firstName,
        lastName,
        email,
        password,
      })
      .then((response) => {
        console.log("Register success", response.data);
        setMessage("Registration completed successfully");
      })
      .catch((error) => {
        console.error("Register error", error);
        setError("Error al registrar el usuario");
        if (error.response && error.response.data) {
          setError(error.response.data.message); // Mensaje específico del backend
        } else {
          setError("Error al registrar el usuario");
        }
      });
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter user Name"
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />
        </div>
        <button type="submit">Register</button>
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

export default Register;
