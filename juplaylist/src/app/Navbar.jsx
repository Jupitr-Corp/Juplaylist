import React from 'react';
import "./css/Navbar.css";
import { FiUser } from "react-icons/fi";
import logo from './assets/logo/logo.svg';
import { Link } from "react-router-dom";


function Navbar(props) {
    return (
        <header>
            <nav>
                    <Link to="/Home" className="logo header-element">
                        <img src={logo} alt="logo" />
                    </Link>                    
                <div className='name header-element'>
                    <h1>Juplaylist</h1>
                </div>
                    <Link to="/Account" className="user header-element">
                        <FiUser className='user-icon'/>
                    </Link>   
            </nav>
        </header>
    );
}

export default Navbar;