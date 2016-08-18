import React from 'react';
import {Link, IndexLink } from 'react-router';

const Footer = () => {
    return (
        <footer className="page-footer grey darken-3">
            <div className="container">
            <div className="row">
                <div className="col s12 m6">
                <h5 className="white-text">Company Bio</h5>
                <p className="grey-text text-lighten-4">We are a team of college students working on this project like it's our full time job. Any amount would help support and continue development on this project and is greatly appreciated.</p>
                </div>
                <div className="col s12 m6">
                <h5 className="white-text">Settings</h5>
                <ul>
                    <li><a className="white-text" href="Admin.html">Admin</a></li>
                    <li><a className="white-text" href="#!">About</a></li>
                </ul>
                </div>        
            </div>
            </div>
            <div className="footer-copyright">
            <div className="container">
            Made by <a className="orange-text text-lighten-3" href="http://materializecss.com">Materialize</a>
            </div>
            </div>
        </footer>

    );
};

export default Footer;