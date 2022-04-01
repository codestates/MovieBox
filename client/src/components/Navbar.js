import React,{ useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import "../App.css"
import SearchModal from './SearchModal';




const Navbar = () => {
    const outside = useRef()
    console.log(outside);
    
    const [searchOpen, setSearchOpen] = useState(false);
    const openSearch = () => setSearchOpen(true);

    const handleCloseModal = e => {
        if (searchOpen && (!outside.current || !outside.current.contains(e.target))) setSearchOpen(false);
      };
    
    useEffect(() => {
        window.addEventListener("click", handleCloseModal);
        return () => {
            window.removeEventListener("click", handleCloseModal);
        } 
    });

return (
  <div className="navbar">
    <span className="logo"><Logo /></span>
    <span className="home_button"><nav><a href="/">HOME</a></nav></span>
    <span>
        <nav>
            <a onClick={openSearch}>Search</a>
            <a href="/signup">Singup</a>
            <a href="/login">Login</a>
        </nav>
        {
            searchOpen &&
            <SearchModal ref={outside}/> 
        }
    </span>
    {/* <div id="indicator"></div> */}
  </div>

 )
};

export default Navbar;