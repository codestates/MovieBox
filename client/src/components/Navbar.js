import React,{ useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import "../App.css"
import SearchModal from './SearchModal';




const Navbar = ({ movieFilter, setMovieFilter, handleSearch, isLogin, handleLogout }) => {
    
    const [searchOpen, setSearchOpen] = useState(false);
    const openSearch = () => setSearchOpen(!searchOpen);

 
return (
  <div className="navbar">
    <span className="logo"><Logo /></span>
    <span className="home_button"><nav><a href="/">HOME</a></nav></span>
    <span>
    {
        isLogin === false ? <nav>
            <a onClick={openSearch}>Search</a>
            <a href="/signup">Singup</a>
            <a href="/login">Login</a>
        </nav> : <nav>
            <a onClick={openSearch}>Search</a>
            <a href="/profile">Profile</a>
            <a onClick={handleLogout}>Logout</a>
        </nav>
        }
        {
            searchOpen &&
            <SearchModal
                movieFilter={movieFilter}
                setMovieFilter={setMovieFilter}
                handleSearch={handleSearch}
            /> 
        }
    </span>
  </div>
  

 )
};

export default Navbar;