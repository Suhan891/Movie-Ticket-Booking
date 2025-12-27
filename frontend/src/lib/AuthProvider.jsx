import { useState } from "react";
import axios from "axios";
import AuthContext from './AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const client = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true
});

// // attach token from localStorage to requests
// client.interceptors.request.use((config) => {
//   const t = localStorage.getItem('token');
//   if (t) config.headers = { ...config.headers, Authorization: `Bearer ${t}` };
//   return config;
// });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );
  const navigate = useNavigate()

  const registerAuth = async (data) => {
    try {
      const res = await client.post("/auth/register", data);
      toast.success(res.data?.message || "Please check your email to verify your account")
      return res.data;
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || "Registration failed")
      throw err
    }
  };

  const loginAuth = async (data) => {
    try{
      const res = await client.post("/auth/login", data);
      console.log(res)

    // update user
    setUser(res.data.user);

    // backend may return `token` or `accessToken` — accept either
    const serverToken = res.data.token ?? res.data.accessToken ?? null;
    if(!serverToken)
      toast.error("Token not received")
    if (serverToken) {
      localStorage.setItem("token", serverToken);
      setToken(serverToken);
    }
    console.log("login response user/ token:", res.data.user, serverToken)
    navigate("/")
    toast.success(res.data?.message || "Login Successful")
    return res.data;
    } catch(error){
      console.error(error)
      // toast.error("Login Unsuccessfull")
      toast.error(error?.response?.data?.message || "Login failed")
    }
  };

  const logoutAuth = async () => {
    try {
      await client.post("/auth/logout");
      setUser(null);
      localStorage.removeItem("token");
      toast.success("Logged out")
    } catch (err) {
      console.error(err)
      toast.error("Logout failed")
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        registerAuth,
        loginAuth,
        logoutAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};