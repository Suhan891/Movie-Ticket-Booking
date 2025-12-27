import { useState } from "react";
import axios from "axios";
import { AuthContext } from './auth';
import { toast } from 'react-toastify';

const client = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const registerAuth = async (data) => {
    const res = await client.post("/user/register", data);

    toast.success("Please Check Your Email to Register")
    return res.data;
  };

  const loginAuth = async (data) => {
    try{
      const res = await client.post("/user/login", data);
      console.log(res)

    // update user
    setUser(res.data.user);

    // backend may return `token` or `accessToken` — accept either
    const serverToken = res.data.token ?? res.data.accessToken ?? null;
    if (serverToken) {
      setToken(serverToken);
      localStorage.setItem("token", serverToken);
    }
    console.log("login response user/ token:", res.data.user, serverToken)
    
    // toast.success("Login Successfull")
    return res.data;
    } catch(error){
      console.error(error)
      toast.error("Login Unsuccessfull")
    }
  };

  const logoutAuth = async () => {
    await client.post("/user/logout");

    setUser(null);
    // settoken(null);
    localStorage.removeItem("token");
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

// `useAuth` moved to `src/lib/auth.js` to keep this file exporting only components
