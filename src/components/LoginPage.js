import React, { useState } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Book, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register"); // go to register page.
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost/api/LoginPage", {
        email,
        password,
      });
      if (response.data && response.data.success) {
        console.log("Login successful", response.data);
        setMessage("Login successfully");
        window.location.href = "/library"; // Redirigir
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Server error. Please try again later.");
        console.error("Login error", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute inset-0 z-0 opacity-50 bg-grid-pattern"></div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Card className="shadow-lg p-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center mb-6">
              <Book className="h-16 w-16 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Library App Login
            </h2>
            <p className="text-sm text-gray-500 text-center">
              Enter your credentials to access your library
            </p>
          </motion.div>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}

          <form onSubmit={handleLogin} className="mt-8 w-full">
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 w-full"
                  />
                </div>
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

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging In..." : "Log In"}
                </Button>
              </div>
            </div>
            {message && <p>{message}</p>}
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/forgot-password"
              className="text-xl font-bold transition duration-200"
              style={{ color: "#0934df" }}
            >
              Forgot your password?
            </Link>
            <hr className="my-4 border-gray-200" />
            <button onClick={handleRegisterClick}>Register</button>{" "}
            {/* register button */}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
