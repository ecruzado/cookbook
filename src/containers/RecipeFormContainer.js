import { connect } from 'react-redux';
import { addRecipe, updateRecipe, setCurrentRecipeId } from '../actions/recipeActions';
import RecipeForm from '../components/RecipeForm';

const getRecipe = (recipes, recipeId) => {
    if(!recipeId || recipeId === 0){
        return {};
    }else{
        return recipes.find(x => x.id === recipeId);
    }
};

const mapStateToProps = (state) => {
  return {
    recipe: getRecipe(state.recipes, state.currentRecipeId)
  };
};

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

const RecipeFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeForm);

export default RecipeFormContainer;