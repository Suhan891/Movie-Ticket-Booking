
import {Routes, Route, useLocation, useSearchParams, useNavigate} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movie from './pages/Movie'
import MovieDetails from './pages/MovieDetails'
import MyBooking from './pages/MyBooking'
import SeatLayout from './pages/SeatLayout'
import Favourite from './pages/Favourite'
import Footer from './components/Footer'

import Register from './components/Register'
import ClientProfile from './components/ClientProfile'
import NoPage from './pages/NoPage'
import VerifyPending from './components/Verify'

import {useAuth} from './lib/auth.js'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

function App() {
  const {user,token,setUser,setToken} = useAuth()

  console.log(user)
  
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(()=>{
    const tokenData = searchParams.get("token")
    const userData = searchParams.get("user")
    
    const user = JSON.parse(decodeURIComponent(userData))  

    if(!userData && !tokenData) return;

    localStorage.setItem("token",tokenData)
    localStorage.setItem("user",JSON.stringify(user))
    console.log(JSON.stringify(user))

    setToken(tokenData);
    setUser(user);

    toast.success("Google Login Successful");
    navigate("/", { replace: true }); // To prevent the user from returning back to the authentication page
  },[searchParams,navigate,setUser,setToken])

  const isLogin = !!user && !!token

  const isAdmin = useLocation().pathname.startsWith('/admin')

  const location = useLocation()
  // correctly compare pathname to both routes
  const hide = location.pathname === '/login' || location.pathname === '/register'

  return (
    <>
      {!isAdmin && !hide  && <Navbar isLogin={isLogin} />}
      <Routes>{!isLogin && <Route path="/register" element={<Register />} />}
        {!isLogin && <Route path="/login" element={<Register />} />}
        {!isLogin && <Route path="/register/verify-pending" element={<VerifyPending />} />}
        <Route path="/profile" element={<ClientProfile/>} />
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/my-booking" element={<MyBooking />} />
        <Route path="/movie/:id/:date" element={<SeatLayout />} />
        <Route path="/favourites" element={<Favourite/>} />
        <Route path="/*" element={<NoPage/>} />
      </Routes>
      {!isAdmin  && !hide  && <Footer />}
    </>
  )
}

export default App
