import { connect } from 'react-redux';
import { setCurrentRecipeId } from '../../actions/recipeActions';
import RecipeList from './RecipeList';

const getVisibleRecipes = (recipes, categoryFilter, nameFilter) => {
  switch (categoryFilter) {
    case 'SHOW_ALL':
      return recipes.filter(t => nameFilter==='' || t.name.indexOf(nameFilter) > -1);
    case 'SHOW_PASTAS':
      return recipes.filter(t => t.category === 'PASTAS' && (nameFilter==='' || t.name.indexOf(nameFilter) > -1));
    case 'SHOW_SALADS':
      return recipes.filter(t => t.category === 'SALADS' && (nameFilter==='' || t.name.indexOf(nameFilter) > -1));
    case 'SHOW_MEAT':
      return recipes.filter(t => t.category === 'MEAT' && (nameFilter==='' || t.name.indexOf(nameFilter) > -1));
    case 'SHOW_DESSERTS':
      return recipes.filter(t => t.category === 'DESSERTS' && (nameFilter==='' || t.name.indexOf(nameFilter) > -1));
  }
};

const mapStateToProps = (state) => {
  return {
    recipes: getVisibleRecipes(state.recipes, state.categoryFilter, state.nameFilter)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRecipeClick: (id) => {
      dispatch(setCurrentRecipeId(id));
    }
  };
};

const VisibleRecipeList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeList);

export default VisibleRecipeList;