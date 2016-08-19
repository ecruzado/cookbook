import React from 'react';
import {Link, IndexLink } from 'react-router';

const Header = () => {
    return (
        <header>
            <nav className="top-nav light-green">
                <div className="nav-wrapper container">
                    <a href="#" className="brand-logo">COOKBOOK</a>
                  
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><input id="search" type="search" required/></li>
                    </ul>                   
                </div>
            </nav>
        </header>
    );
};

export default Header;