import React, { useState } from "react";
import axios from "axios";
import "../css/Login.css";

const Login = () => {
  // Definir los estados para email, password y error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Enviar la solicitud POST al backend con axios
    axios
      .post("http://localhost/api/Login", { email, password })
      .then((response) => {
        console.log("Login successful", response.data);
        // Manejar el éxito del inicio de sesión, por ejemplo, redirigir a otra página o guardar el token
        // window.location.href = '/dashboard'; // Redirigir al dashboard
      })
      .catch((error) => {
        console.error("Login error", error);
        setError("Invalid email or password");
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-700"
          >
            Remember me
          </label>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Mostrar error si existe */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
