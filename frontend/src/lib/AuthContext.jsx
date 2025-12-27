import { useState } from "react";
import axios from "axios";
import { AuthContext } from './auth';

const client = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("token") || null
  );

  const registerAuth = async (data) => {
    const res = await client.post("/user/register", data);

    return res.data;
  };

  const loginAuth = async (data) => {
    try{
      const res = await client.post("/user/login", data);
      console.log(res)

    setUser(res.data.user);
    console.log("user: ",user)

    if (res.data.accessToken) {
      setAccessToken(res.data.accessToken);
      localStorage.setItem("token", res.data.accessToken);
    }
    console.log("Token: ",accessToken)
    
    return res.data;
    } catch(error){
      console.error(error)
    }
  };

  const logoutAuth = async () => {
    await client.post("/user/logout");

    setUser(null);
    // setAccessToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
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
