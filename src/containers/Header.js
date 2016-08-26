import React from 'react';
import {Link, IndexLink } from 'react-router';
import {connect} from 'react-redux';
import { setNameFilter } from '../actions/recipeActions';

@connect(
    (state, ownProps) => ({}),
    (dispatch, ownProps) => ({
        onNameSearch: (event) => {
            if(event.key === 'Enter'){
                dispatch(setNameFilter(event.target.value));
            }
        }
    })    
)
export default class Header extends React.Component {
    render(){
        return (
            <header>
                <nav className="top-nav light-green">
                    <div className="nav-wrapper container">
                        <Link to="/" className="brand-logo">COOKBOOK</Link>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li>
                                <input id="search" type="search" placeholder="Recipe Name" 
                                    onKeyPress={this.props.onNameSearch}/>
                            </li>
                            <li>
                                <a href="sass.html"><i className="material-icons">search</i></a>
                            </li> 
                        </ul>                   
                    </div>
                </nav>
            </header>
        );        
    }
}