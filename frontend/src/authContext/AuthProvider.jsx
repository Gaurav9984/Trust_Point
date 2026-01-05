import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

const API_BASE = "https://trustpoint.in";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔥 Axios instance (NO withCredentials)
  const api = axios.create({
    baseURL: API_BASE,
  });

  /* ===============================
     LOAD TOKEN (SAFE)
  =============================== */
  const getToken = () => {
    try {
      return localStorage.getItem("trust_point_token");
    } catch {
      return null;
    }
  };

  /* ===============================
     FETCH CURRENT USER (SAFE)
  =============================== */
  const fetchUser = async () => {
    const token = getToken();

    // 🔥 MOST IMPORTANT GUARD
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
      try {
        localStorage.setItem(
          "trust_point_user",
          JSON.stringify(res.data.user)
        );
      } catch {}
    } catch (err) {
      console.error("Auth check failed:", err);
      try {
        localStorage.removeItem("trust_point_user");
        localStorage.removeItem("trust_point_token");
      } catch {}
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     LOGIN
  =============================== */
  const login = async (invester_id, password) => {
    try {
      const res = await api.post("/auth/login", { invester_id, password });

      if (res.data?.access) {
        try {
          localStorage.setItem("trust_point_token", res.data.access);
        } catch {}

        await fetchUser(); // 🔥 fetch AFTER token saved
        return res.data;
      }

      throw new Error("Invalid login response");
    } catch (err) {
      throw err.response?.data || { message: "Login failed" };
    }
  };

  /* ===============================
     REGISTER
  =============================== */
  const register = async (email, fullName, password) => {
    try {
      const res = await api.post("/auth/signup", {
        name: fullName,
        email,
        password,
      });

      if (res.data?.access) {
        try {
          localStorage.setItem("trust_point_token", res.data.access);
        } catch {}

        await fetchUser();
      }

      return res.data;
    } catch (err) {
      throw err.response?.data || { message: "Registration failed" };
    }
  };

  /* ===============================
     LOGOUT
  =============================== */
  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("trust_point_user");
      localStorage.removeItem("trust_point_token");
    } catch {}
    navigate("/login");
  };

  /* ===============================
     ON APP LOAD
  =============================== */
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser: fetchUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
