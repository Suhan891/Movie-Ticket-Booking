import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
    baseUrl: "http://8080",
    withCredentials: true
})

api.interceptors.request.use(config =>{
    const accessToken = localStorage.getItem("token")
    if(!accessToken){
        toast.error("Not getting accessToken in localStorage")
        return
    }

    config.headers.Authorization=`Bearer ${accessToken}`
    return config
})

export default api