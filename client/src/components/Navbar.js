import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import "../App.css"




const Navbar = () => {
return (
  <div className="navbar">
    <span className="logo"><Logo /></span>
    <span className="home_button"><nav><a href="/">HOME</a></nav></span>
    <span>
        <nav>
            <a href="/search">Search</a>
            <a href="/signup">Singup</a>
            <a href="/login">Login</a>
        </nav>
    </span>
    {/* <div id="indicator"></div> */}
  </div>
)
};

export default Navbar;