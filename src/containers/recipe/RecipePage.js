import { connect } from 'react-redux';
import { createRecipe, updateRecipe, setCurrentRecipeId , saveRecipe, loadRecipe} from '../../actions/recipeActions';
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
    recipe: state.recipe
});

const mapDispatchToProps = (dispatch) => {
  return {
    onRecipeSave: (recipe) => {
      dispatch(saveRecipe(recipe));
      // .then(()=>{
      //   toastr.success("success")
      // }));
    },
    onLoadRecipe: (id) =>{
      dispatch(loadRecipe(id));
    }
  };
};

const RecipePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeForm);

export default RecipePage;