import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  // 🔥 Load from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");

    if (storedUser) setUserId(storedUser);
    if (storedRole) setRole(storedRole);
  }, []);

  // ✅ Login function
  const login = (id, role) => {
    localStorage.setItem("userId", id);
    localStorage.setItem("role", role);
    setUserId(id);
    setRole(role);
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.clear();
    setUserId(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ userId, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};