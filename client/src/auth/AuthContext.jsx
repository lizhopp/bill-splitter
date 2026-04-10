/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();

  const register = async (credentials) => {
    const response = await fetch(API_BASE + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response.ok) {
      throw Error(result.message);
    }
    setToken(result.token);
  };

  const login = async (credentials) => {
    const response = await fetch(API_BASE + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response.ok) {
      throw Error(result.message);
    }
    setToken(result.token);
  };

  const logout = () => setToken(null);

  const value = { token, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within AuthProvider");
  return context;
}
