import React from 'react';
import {Link, IndexLink } from 'react-router';

const Header = () => {
    return (
        <header>
            <nav className="top-nav">
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">COOKBOOK</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                        <li><Link to="/recipe" activeClassName="active">Recipe</Link></li>
                        <li><Link to="/about" activeClassName="active">About</Link></li> 
                    </ul>            
                </div>
            </nav>
        </header>
    );
};

export default Header;