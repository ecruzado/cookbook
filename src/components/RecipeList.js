import React, { PropTypes } from 'react';
import Recipe from './Recipe';

const RecipeList = ({ recipes, onRecipeClick }) => {
  console.log('tmr');
  console.log(recipes);
  return(
    <ul>
      {recipes.map(recipe =>
        <Recipe
          key={recipe.id}
          {...recipe}
          onClick={() => onRecipeClick(recipe.id)}
        />
      )}
    </ul>
  );

};

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    chef: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    preparation: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onRecipeClick: PropTypes.func.isRequired
};

export default RecipeList;