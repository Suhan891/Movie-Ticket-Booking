import {useState} from 'react'
import { Link } from 'react-router-dom'
import {assets} from '../assets/assets'
import {SearchIcon,XIcon,MenuIcon, User} from 'lucide-react'


const Navbar = ({isLogin}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center
      justify-between px-6 md:px-16 1g:px-36 py-5'>
      <Link to='/' className='max-md:flex-1'>
      <img src={assets.logo} alt="" className='w-36 h-auto'/>
      </Link>

      <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isOpen ? "max-md:w-full" : "max-md:w-0"}`}>
        <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' onClick={()=> setIsOpen(!isOpen)}/>
        <Link onClick={()=>{scrollTo(0,0);setIsOpen(false)} } to="/">Home</Link>
        <Link onClick={()=>{scrollTo(0,0);setIsOpen(false)} } to="/movies">Movies</Link>
        <Link onClick={()=>{scrollTo(0,0);setIsOpen(false)} } to="/">Theaters</Link>
        <Link onClick={()=>{scrollTo(0,0);setIsOpen(false)} } to="/">Releses</Link>
        <Link onClick={()=>{scrollTo(0,0);setIsOpen(false)} } to="/favourites">Favourite</Link>
      </div>

      <div className='flex items-center gap-8'>
      <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer'/>
      {!isLogin ? <button className='px-4 py-1 sm:px-7 sm:py-2 bg-primary
      hover:bg-primary-dull transition rounded-full font-medium
      cursor-pointer'>Login</button>  : <User /> }

        import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const goToMovie = () => {
    navigate(`/movies/${movie._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col justify-between p-3 bg-gray-800 rounded-2xl
      hover:-translate-y-1 transition duration-300 w-64">

      <img
        onClick={goToMovie}
        src={movie.backdrop_path}
        alt={movie.title}
        className="rounded-lg h-52 w-full object-cover cursor-pointer"
      />

      <p className="font-semibold mt-2 truncate">
        {movie.title}
      </p>

      <p className="text-sm text-gray-400 mt-2">
        {new Date(movie.release_date).getFullYear()} ·{' '}
        {movie.genres?.slice(0, 2).map(g => g.name).join(' | ')} ·{' '}
        {movie.runtime} min
      </p>

      <div className="flex items-center justify-between mt-4 pb-3">
        <button
          onClick={goToMovie}
          className="px-4 py-2 text-xs bg-primary hover:bg-primary-dull transition
          rounded-full font-medium cursor-pointer"
        >
          Buy Tickets
        </button>

        <p className="flex items-center gap-1 text-sm text-gray-400 pr-1">
          <StarIcon className="w-4 h-4 text-primary fill-primary" />
          {movie.vote_average.toFixed(1)}
        </p>
      </div>

    </div>
  );
};


      </div>
     <MenuIcon
className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' onClick={()=> setIsOpen(!isOpen)} />
    </div>
  )
}

export default Navbar
