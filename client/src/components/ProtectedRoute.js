import React, { useContext } from "react";
import { Navigate } from "react-router-dom"; // Navigate for redirection
import { AuthContext } from "../context/AuthContext"; // Import the authentication context

const ProtectedRoute = ({ children }) => {
  const { authState } = useContext(AuthContext); // Access the auth state from context

  // If user is authenticated, render children; otherwise, redirect to login
  return authState.isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
