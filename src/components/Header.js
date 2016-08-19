import React from 'react';
import {Link, IndexLink } from 'react-router';

const Header = () => {
    return (
        <header>
            <nav className="top-nav light-green">
                <div className="nav-wrapper container">
                    <a href="#" className="brand-logo">COOKBOOK</a>
                  
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><input id="search" type="search" placeholder="name"/></li>
                        <li><a href="sass.html"><i class="material-icons">search</i></a></li> 
                    </ul>                   
                </div>
            </nav>
        </header>
    );
};

export default Header;