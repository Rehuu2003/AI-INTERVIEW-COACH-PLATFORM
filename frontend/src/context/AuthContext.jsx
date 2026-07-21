import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { getUserRole } from "../utils/formatters";

const AuthContext = createContext();

const normalizeUser = (user) => {
  if (!user) return null;
  const role = getUserRole(user);
  return { ...user, role };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const persistUser = (userData) => {
    const normalized = normalizeUser(userData);
    localStorage.setItem("aiUser", JSON.stringify(normalized));
    setUser(normalized);
    return normalized;
  };

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        persistUser(data.user);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("aiUser");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const signup = async ({ name, email, password, role }) => {
    const { data } = await api.post("/auth/register", { name, email, password, role });
    localStorage.setItem("token", data.token);
    persistUser({ ...data.user, role: role || data.user.targetRole || "frontend" });
    return { success: true };
  };

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    persistUser(data.user);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("aiUser");
    setUser(null);
  };

  const refreshUser = async () => {
    const { data } = await api.get("/auth/me");
    return persistUser(data.user);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
