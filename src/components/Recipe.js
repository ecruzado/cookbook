import React, { PropTypes } from 'react';

const Recipe = ({ onClick, name, chef, category, preparation }) => (
  <p
    onClick={onClick}
  >
    {name}
    {chef}
    {category}
    {preparation}
  </p>
);


Recipe.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.bool.isRequired,
  chef: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  preparation: PropTypes.string.isRequired
};

export default Recipe;