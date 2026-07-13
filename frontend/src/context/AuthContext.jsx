import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const stored = localStorage.getItem("aiUser");
    if (token && stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("aiUser");
      }
    }
    setLoading(false);
  }, []);

  // Register — calls POST /api/auth/register
  const signup = async ({ name, email, password, role }) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    const userData = { ...data.user, role: role || "frontend" };
    localStorage.setItem("token", data.token);
    localStorage.setItem("aiUser", JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  };

  // Login — calls POST /api/auth/login
  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    const userData = { ...data.user };
    // Preserve role from any previous signup data if available
    const stored = localStorage.getItem("aiUser");
    if (stored) {
      try {
        const prev = JSON.parse(stored);
        if (prev.email === data.user.email && prev.role) {
          userData.role = prev.role;
        }
      } catch { /* ignore */ }
    }
    localStorage.setItem("token", data.token);
    localStorage.setItem("aiUser", JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("aiUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
