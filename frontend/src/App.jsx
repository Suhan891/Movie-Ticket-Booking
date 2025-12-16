
import {Routes, Route, useLocation} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movie from './pages/Movie'
import MovieDetails from './pages/MovieDetails'
import MyBooking from './pages/MyBooking'
import SeatLayout from './pages/SeatLayout'
import Favourite from './pages/Favourite'
import Footer from './components/Footer'

function App() {
  
  const isAdmin = useLocation().pathname.startsWith('/admin');
  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/my-booking" element={<MyBooking />} />
        <Route path="/movie/:id/:date" element={<SeatLayout />} />
        <Route path="/favourite" element={<Favourite/>} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  )
}

export default App
