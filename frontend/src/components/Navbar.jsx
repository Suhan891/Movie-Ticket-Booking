import { useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import {
  SearchIcon,
  XIcon,
  MenuIcon,
  User,
  LayoutDashboard,
  Tickets,
  LogOut
} from 'lucide-react'

const Navbar = ({ isLogin }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDashBoard, setIsDashBoard] = useState(false)

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">

      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="Logo" className="w-36 h-auto" />
      </Link>

      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50
        flex flex-col md:flex-row items-center max-md:justify-center gap-8
        md:px-8 py-3 max-md:h-screen md:rounded-full
        backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20
        overflow-hidden transition-[width] duration-300
        ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}
      >
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(false)}
        />

        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to="/">Home</Link>
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to="/movies">Movies</Link>
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to="/">Theaters</Link>
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to="/">Releases</Link>
        <Link onClick={() => { window.scrollTo(0, 0); setIsOpen(false) }} to="/favourites">Favourite</Link>
      </div>

      <div className="flex items-center gap-8 relative">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />

        {!isLogin ? (
          <button className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">
            Login
          </button>
        ) : (
          <User
            className="cursor-pointer"
            onClick={() => setIsDashBoard(prev => !prev)}
          />
        )}

        {isDashBoard && (
          <div className="absolute right-0 top-10 w-48 bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
            <div className="p-4 border-b border-white/10">
              <p className="text-sm font-medium text-white"> User Name</p>
              <p className="text-xs text-gray-400">user@example.com</p>
            </div>

            <div className="flex flex-col py-1">
              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                onClick={() => setIsDashBoard(false)}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>

              <Link
                to="/my-booking"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                onClick={() => setIsDashBoard(false)}
              >
                <Tickets size={16} />
                My Bookings
              </Link>

              <button className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full text-left">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <MenuIcon
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
    </div>
  )
}

export default Navbar
