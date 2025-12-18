import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const client = axios.create({
  baseURL: "http://localhost:8081/users",
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete client.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const register = async ({ name, username, password }) => {
    const res = await client.post("/register", {
      name,
      username,
      password,
    });
    return res.data.message;
  };

  const login = async ({ username, password }) => {
    const res = await client.post("/login", {
      username,
      password,
    });

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser(res.data.user); // backend data
    return res.data.message;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
