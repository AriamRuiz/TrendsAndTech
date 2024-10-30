import React, { useState } from "react";
import axios from "axios";
import "../../css/Register.css";

const Register = () => {
  // Estados para los campos del formulario
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!userName || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError(""); // Limpiamos el mensaje de error si todos los campos están llenos

    // axios.post(
    //   "http://localhost:3001/api/register/submit",
    //   userName,
    //   firstName,
    //   lastName,
    //   email,
    //   password
    // );
    // Aquí podrías agregar la lógica para enviar los datos al servidor
    console.log("Datos de registro:", {
      userName,
      firstName,
      lastName,
      email,
      password,
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
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
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
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
