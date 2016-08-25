import { connect } from 'react-redux';
import { createRecipe, updateRecipe, setCurrentRecipeId , saveRecipe, loadRecipe, loadRecipes} from '../../actions/recipeActions';
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
    recipe: state.recipe.recipe,
    isLoading: state.recipe.isLoading,
    isSaving: state.recipe.isSaving,
    error: state.recipe.error
});

const mapDispatchToProps = (dispatch) => {
  return {
    onRecipeSave: (recipe) => {
      if(recipe.id && recipe.id != 0){
        console.log('upd');
        dispatch(updateRecipe(recipe));
      }else{
        console.log('sav');
        dispatch(saveRecipe(recipe));
      }
      // .then(()=>{
      //   toastr.success("success")
      // }));
    },
    onLoadRecipe: (id) =>{
      dispatch(loadRecipe(id));
    },
    onLoadRecipes: () =>{
      dispatch(loadRecipes());
    }
  };
};

const RecipePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeForm);

export default RecipePage;