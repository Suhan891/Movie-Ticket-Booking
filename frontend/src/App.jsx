
import {Routes, Route, useLocation} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movie from './pages/Movie'
import MovieDetails from './pages/MovieDetails'
import MyBooking from './pages/MyBooking'
import SeatLayout from './pages/SeatLayout'
import Favourite from './pages/Favourite'
import Footer from './components/Footer'

import Register from './components/Register'
import NoPage from './pages/NoPage'
import VerifyPending from './components/Verify'

function App() {
  const isLogin = false;
  const isAdmin = useLocation().pathname.startsWith('/admin');
  return (
    <>
      {/* {!isAdmin && <Navbar isLogin={isLogin} />} */}
      <Routes>{!isLogin && <Route path="/register" element={<Register />} />}
        <Route path="/register/verify-pending" element={<VerifyPending />} />
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/my-booking" element={<MyBooking />} />
        <Route path="/movie/:id/:date" element={<SeatLayout />} />
        <Route path="/favourites" element={<Favourite/>} />
        <Route path="/*" element={<NoPage/>} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  )
}

export default App
