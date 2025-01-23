import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";  // Import the context
import api from "../apicall/api";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);  // Get login function from context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", formData);
      const token = response.data.token;
      const role = response.data.role; // Assuming role data is returned
      const id = response.data.id; // Assuming role data is returned

      // Use context to store token and role
      login(token, role, id);
      
      setMessage(response.data.message || "Login successful!");
      navigate("/joblist"); // Redirect to the protected route
    } catch (error) {
      setMessage(error.response?.data?.message || "Error during login.");
    }
  };

  return (
    <div className="container mt-5 col-sm-6">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <button type="button" className="btn btn-success mx-2" onClick={() => navigate("/register-form")}>
          Register
        </button>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default LoginForm;
