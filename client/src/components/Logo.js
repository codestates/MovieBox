import React from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

const Logo = () => {
    return(
            <Link to="/">
                <img src={logo} alt="logo image" />
            </Link>

    )

    }
    export default Logo;