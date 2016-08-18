import { connect } from 'react-redux';
import { toggleRecipe } from '../actions/recipeActions';
import RecipeList from '../components/RecipeList';

const getVisibleRecipes = (recipes, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return recipes;
    case 'SHOW_PASTAS':
      return recipes.filter(t => t.category === 'PASTAS');
    case 'SHOW_SALADS':
      return recipes.filter(t => t.category === 'SALADS');
    case 'SHOW_MEAT':
      return recipes.filter(t => t.category === 'MEAT');
    case 'SHOW_DESSERTS':
      return recipes.filter(t => t.category === 'DESSERTS');
  }
};

const mapStateToProps = (state) => {
  return {
    recipes: getVisibleRecipes(state.recipes, state.categoryFilter)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRecipeClick: (id) => {
      dispatch(toggleRecipe(id));
    }
  };
};

const VisibleRecipeList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeList);

export default VisibleRecipeList;