import { connect } from 'react-redux';
import { createRecipe, updateRecipe, setCurrentRecipeId , saveRecipe} from '../../actions/recipeActions';
import RecipeForm from './RecipeForm';
import toastr from 'toastr';

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
      // if(recipe.id && recipe.id !== 0){
      //   dispatch(updateRecipe(recipe));
      // }else{
      //   dispatch(createRecipe(recipe));
      // }
      dispatch(saveRecipe(recipe).then(()=>{
        toastr.success("success")
      }));
    }
  };
};

const RecipePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeForm);

export default RecipePage;