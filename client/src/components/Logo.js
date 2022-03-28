import React from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import style from './Logo.css';

const Logo = () => {
    return(
        <header className={style.header}>
        <div className={style.logo}>
            <Link to="/">
                <img src={logo} alt="logo image" className={style.logo} />
            </Link>
        </div>
        </header>
    )

    }
    export default Logo;