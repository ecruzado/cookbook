import React, { PropTypes } from 'react';

const Recipe = ({ onClick, name, chef, category, preparation }) => (
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
            <a href="javascript:void(0);" className="right" onClick={onClick}>Edit</a>
        </div>        
    </div>
  </div>
);


Recipe.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  chef: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  preparation: PropTypes.string.isRequired
};

export default Recipe;