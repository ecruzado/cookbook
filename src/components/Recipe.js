import React, { PropTypes } from 'react';

const Recipe = ({ onClick, name, chef, category, preparation }) => (
  <div className="col s12 l6">
      <h4 className="header" onClick={onClick}>{name}</h4>
      <div className="card horizontal">
          <div className="card-stacked">
              <div className="card-content">
                  <p>{preparation}</p>
              </div>
              <div className="card-action">
                  <a href="#">This is a link</a>
                  {chef}
                  {category}
              </div>
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