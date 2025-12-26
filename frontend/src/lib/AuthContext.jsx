import { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const client = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("token") || null
  );

  const register = async (data) => {
    const res = await client.post("/user/register", data);

    return res.data;
  };

  const login = async (data) => {
    const res = await client.post("/user/login", data);

    setUser(res.data.user);

    if (res.data.accessToken) {
      setAccessToken(res.data.accessToken);
      localStorage.setItem("token", res.data.accessToken);
    }

    return res.data;
  };

  const logout = async () => {
    await client.post("/user/logout");

    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
