import React from 'react';
import "../css/Header.css";
import { FiUser } from "react-icons/fi";
import logo from '../assets/logo/logo.svg';



function Header(props) {
    return (
        <header>
            <nav>
                    <a href="/#" className="logo header-element">
                        <img src={logo} alt="logo" />
                    </a>                    
                <div className='name header-element'>
                    <h1>Juplaylist</h1>
                </div>
                    <a href="/#" className="user header-element">
                        <FiUser className='user-icon'/>
                    </a>   
            </nav>
        </header>
    );
}

export default Header;