import React, { createContext, useState } from 'react';

// Create the Context
const AuthContext = createContext();

// AuthProvider component to provide context to the app
const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token') || null,
    role: JSON.parse(localStorage.getItem('role')) || null,
    id: localStorage.getItem('id') || null,
    isAuthenticated: !!localStorage.getItem('token')
  });

  // Login function to set auth state and store token
  const login = (token, role, id) => {
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    localStorage.setItem('role', JSON.stringify(role));
    setAuthState({
      token,
      role,
      id,
      isAuthenticated: true
    });
  };

  // Logout function to clear auth state and token
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    setAuthState({
      token: null,
      id: null,
      role: null,
      isAuthenticated: false
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
