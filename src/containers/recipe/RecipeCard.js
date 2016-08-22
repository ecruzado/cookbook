import React, { PropTypes } from 'react';
import {Link} from 'react-router';

const RecipeCard = ({ onClick, id, name, chef, category, preparation }) => (
  <div className="col s12 m6">
    <div className="card light-green lighten-5">
        <div className="card-content ">
            <span className="card-title">{name}</span>
            <p>{preparation}</p>
        </div>
        <div className="card-action">
            <span><i className="material-icons">label_outline</i>{category}</span>
            <span> | </span>
            <span><i className="material-icons">person_pin</i>{chef}</span>
            <Link className="right" to={"/recipe/" + id}>Edit</Link>
        </div>        
    </div>
  </div>
);


RecipeCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  chef: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  preparation: PropTypes.string.isRequired
};

export default RecipeCard;