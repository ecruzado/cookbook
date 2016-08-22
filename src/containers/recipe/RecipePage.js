import { connect } from 'react-redux';
import { addRecipe, updateRecipe, setCurrentRecipeId } from '../../actions/recipeActions';
import RecipeForm from './RecipeForm';

const getRecipe = (recipes, recipeId) => {

    if(!recipeId || recipeId === 0){
        return {};
    }else{
        return recipes.find(x => x.id === +recipeId);
    }
};

const mapStateToProps = (state, ownProps) => ({
    recipe: getRecipe(state.recipes, ownProps.params.id)
});

const mapDispatchToProps = (dispatch) => {
  return {
    onRecipeSave: (recipe) => {
      if(recipe.id && recipe.id !== 0){
        dispatch(updateRecipe(recipe));
        dispatch(setCurrentRecipeId(0));
      }else{
        dispatch(addRecipe(recipe));
      }

    }
  };
};

const RecipePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeForm);

export default RecipePage;