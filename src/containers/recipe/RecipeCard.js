import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import {Rating} from '../../components/rating';

export const RecipeCard = ({ onClick, id, name, chef, category, preparation, rate }) => (
  <div className="col s12 m6">
    <div className="card light-green lighten-5">
        <div className="card-content ">
            <span className="card-title">{name}</span>
            <p>{preparation}</p>
            <Rating stars="5" rate={rate} allowClick={false} />
        </div>
        <div className="card-action">
            <i className="material-icons">label_outline</i>{category}
            <span> | </span>
            <i className="material-icons">person_pin</i>{chef}
            <a href="javascript:void(0)"className="right" onClick={onClick}>Delete</a>
            <Link className="right" to={"/recipe/" + id}>Edit</Link>
        </div>        
    </div>
  </div>
);