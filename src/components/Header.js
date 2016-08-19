import React from 'react';
import {Link, IndexLink } from 'react-router';

const Header = ({onNameSearch}) => {
    return (
        <header>
            <nav className="top-nav light-green">
                <div className="nav-wrapper container">
                    <a href="#" className="brand-logo">COOKBOOK</a>
                  
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><input id="search" type="search" placeholder="Recipe Name" onKeyPress={onNameSearch}/></li>
                        <li><a href="sass.html"><i className="material-icons">search</i></a></li> 
                    </ul>                   
                </div>
            </nav>
        </header>
    );
};

export default Header;