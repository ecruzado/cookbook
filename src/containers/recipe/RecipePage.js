import { connect } from 'react-redux';
import { createRecipe, updateRecipe, setCurrentRecipeId } from '../../actions/recipeActions';
import RecipeForm from './RecipeForm';

const getRecipe = (recipes, recipeId = 0) => {

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
      console.log(recipe);
      if(recipe.id && recipe.id !== 0){
        dispatch(updateRecipe(recipe));
      }else{
        dispatch(createRecipe(recipe));
      }

    }
  };
};

const RecipePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeForm);

export default RecipePage;