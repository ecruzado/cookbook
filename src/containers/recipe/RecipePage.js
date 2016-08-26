import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createRecipe, updateRecipe, setCurrentRecipeId , saveRecipe, loadRecipe, loadRecipes} from '../../actions/recipeActions';
import toastr from 'toastr';
import {RecipeForm} from './RecipeForm';
import autobind from 'autobind-decorator';

@connect(
  (state, ownProps) => ({
      recipe: state.recipe.recipe,
      isLoading: state.recipe.isLoading,
      isSaving: state.recipe.isSaving,
      error: state.recipe.error
  }),
  (dispatch) => ({
      onRecipeSave: (recipe) => {
        if(recipe.id && recipe.id != 0){
          console.log('upd');
          dispatch(updateRecipe(recipe));
        }else{
          console.log('sav');
          dispatch(saveRecipe(recipe));
        }
      },
      onLoadRecipe: (id) =>{
        dispatch(loadRecipe(id));
      },
      onLoadRecipes: () =>{
        dispatch(loadRecipes());
      }
  })  
)
export default class RecipePage extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      recipe : this.props.recipe
    };

  }

  componentWillReceiveProps(nextProps) {
      if (this.props.recipe !== nextProps.recipe) {
          this.setState({ recipe: Object.assign({}, nextProps.recipe) });
      }
    }

  componentDidMount(){
    this.props.onLoadRecipe(this.props.params.id);
    this.applyBehaviours();
  }

  componentDidUpdate() {
    this.applyBehaviours();
  }

  applyBehaviours() {
    $('select').material_select(this.updateRecipeState);
  }

  @autobind
  updateRecipeState(event) {
      let value = "";
      let field = "";
      if(!event) {
          field = "category";
          value = $("select[name='category']").val();
      }
      else {
          value = event.target.value;
          field = event.target.name;
      }
      
      let recipe = this.state.recipe;
      recipe[field] = value;
      this.setState({ recipe: recipe });
  }  

  @autobind
  onAddIngredient(ingredient){
    let lastId = 1;
    if(this.state.recipe.ingredients.length > 0){
      lastId = this.state.recipe.ingredients[this.state.recipe.ingredients.length - 1].id;
    }
    ingredient.id = lastId + 1;
    let tempRecipe = this.state.recipe;
    tempRecipe.ingredients = [...this.state.recipe.ingredients, ingredient];
    this.setState({
      recipe: tempRecipe
    });
  }

  @autobind
  onChangeIngredient(ingredient){
    let indexIng = this.state.recipe.ingredients.findIndex(item => item.id == ingredient.id);
    let tempRecipe = this.state.recipe;
    tempRecipe.ingredients = this.state.recipe.ingredients.map((item, index)=>{
      if(index === indexIng){
        return Object.assign({}, ingredient);
      }
      return item;
    });

    this.setState({
      recipe: tempRecipe
    });
  }

  @autobind
  onRemoveIngredient(id){
    let tempRecipe = this.state.recipe;
    tempRecipe.ingredients = this.state.recipe.ingredients.filter((x,i)=> x.id!== id);
    this.setState({
      recipe: tempRecipe
    });
  }

  @autobind
  redirect() {
    this.props.onLoadRecipes();
    this.context.router.push('/');
  }

  @autobind
  saveRecipe(event) {
    event.preventDefault();
    let recipe = Object.assign({}, this.state.recipe);
    this.props.onRecipeSave(recipe);
  }

  render(){
    console.log(+ new Date());
    
    let classButton = "waves-effect waves-light btn-large recipe-button ";
    if(this.props.error ||
      this.props.isLoading || 
      this.props.isSaving){
      classButton += "disabled"
    }

    let textButton = "SAVE RECIPE";
    if(this.props.isLoading){
      textButton = "Loading...";
    }
    if(this.props.isSaving){
      textButton = "Saving...";
    }

    let preloader;
    if(this.props.isLoading){
      preloader = (
        <div className="progress">
            <div className="indeterminate"></div>
        </div>        
      );
    }

    return (
      <div className="container">
        {preloader}
        <div className="row">
          <h3 class="header">Recipe</h3>
          {this.state.recipe &&
            <RecipeForm
              recipe={this.state.recipe}
              onChange={this.updateRecipeState}
              onChangeIngredient={this.onChangeIngredient}
              onAddIngredient={this.onAddIngredient}
              onRemoveIngredient={this.onRemoveIngredient}
              classButton={classButton}
              textButton={textButton}
              onSubmit={this.saveRecipe}
            />
          }
        </div>
      </div>
    );
  }
}

// RecipeForm.contextTypes = {
//   router: PropTypes.object
// };

