import { useState,useEffect } from "react";
import axios from "axios";
import AuthContext from './AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import api from "./api"

// will handle auth related
const client = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );
  // const [token,setToken] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) return toast.error("Unavailable token");

      const storedUser = localStorage.getItem("user");
      console.log("Stored User",storedUser)
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem("user");
        }
        return;
      }
    };
    loadUser();
  }, [token]);


// useEffect(()=>{
//   const storedToken = localStorage.getItem("token")
//   const storedUser = localStorage.getItem("user")

//   if (storedToken) setToken(storedToken);
//   if (storedUser) setUser(JSON.parse(storedUser));

// },[])

  // api is ready to handle all the website functionalities 
  api.interceptors.request.use(response=>
    response,
    async(error)=>{
      const originalRequest = error.config

      if(error.response?.status == 401 && !originalRequest._retry){
        originalRequest._retry = true
        try {
          const res = await client.post("/auth/refreshToken")

          const newAccessToken = res.data?.accessToken
          if(!newAccessToken)
            return toast.error("New Access Token Not received")

          localStorage.setItem("token",newAccessToken)
          originalRequest.headers.Authorization=`Bearer ${newAccessToken}`

          return api(originalRequest)
        } catch (error) {
          navigate("/")
          toast.error(error?.response?.data?.message || "Access Token creation error")
          localStorage.removeItem("token")
          localStorage.removeItem("user")
        }
      }
      return Promise.reject(error)
    }
  )

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
      // console.log(res)


    setUser(res.data.user);

    if (res.data.user) localStorage.setItem("user", JSON.stringify(res.data.user));

    const serverToken = res.data.accessToken ?? null;
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
    }}
  //   try {
  //     const res = await client.post("/auth/login",data)
      
  //     const userData = res.data?.user
  //     localStorage.setItem("user",JSON.stringify(userData))
  //     setUser(user)

  //     const token = res.data?.accessToken
  //     localStorage.setItem("token",token)
  //     setToken(token)

  //     navigate("/")
  //     return toast.success(res.data?.message || "Login Successfull")
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.response?.data?.message || "Login Unsuccessfull")
  //   }
  // };

  // const loginAuth = async (data) => {
  //   const res = await client.post("/auth/login", data);

  //   setUser(res.data.user);
  //   localStorage.setItem("token", res.data.accessToken);
  //   setToken(res.data.accessToken);

  //   toast.success(res.data.message);
  //   return res.data;
  // };
  
  const logoutAuth = async () => {
    try {
      const res = await client.post("/auth/logout");
      setUser(null);
      // setToken(null)
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success(res.data?.message || "Logged out")
    } catch (err) {
      console.error(err)
      toast.error("Logout failed")
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setToken,
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