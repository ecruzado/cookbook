import React, { PropTypes } from 'react';
import IngredientList from './ingredient/IngredientList';
import { setCurrentRecipeId, loadRecipe, saveRecipe, loadRecipes} from '../../actions/recipeActions';
import toastr from 'toastr';

class RecipeForm extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      recipe : this.props.recipe
    };
    this.onAddIngredient = this.onAddIngredient.bind(this);
    this.onRemoveIngredient = this.onRemoveIngredient.bind(this);
    this.onChangeIngredient = this.onChangeIngredient.bind(this);
    this.redirect = this.redirect.bind(this);
  }

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

  onRemoveIngredient(id){
    let tempRecipe = this.state.recipe;
    tempRecipe.ingredients = this.state.recipe.ingredients.filter((x,i)=> x.id!== id);
    this.setState({
      recipe: tempRecipe
    });
  }

  componentWillReceiveProps(nextProps) {
      if (this.props.recipe !== nextProps.recipe) {
          this.setState({ recipe: Object.assign({}, nextProps.recipe) });
      }
    }

  componentDidMount(){
    this.props.onLoadRecipe(this.props.params.id);
  }

  redirect() {
    this.props.onLoadRecipes();
    this.context.router.push('/');
  }

  render(){
    console.log(+ new Date());
    let inputName, inputChef, inputPreparation, selectCategory;
    
    let classButton = "waves-effect waves-light btn ";
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
          <form className="col s12" onSubmit={e => {
            e.preventDefault();
            if (!inputName.value.trim() 
              || !inputChef.value.trim()
              || !inputPreparation.value.trim()
            ) {
              return;
            }

            this.props.onRecipeSave({
              id: this.props.recipe.id? this.props.recipe.id : 0,
              name: inputName.value, 
              chef: inputChef.value, 
              category: selectCategory.value, 
              preparation: inputPreparation.value,
              ingredients: this.state.recipe.ingredients
            });
            // inputName.value = ''
            // inputChef.value = ''
            // selectCategory.value = ''
            // inputPreparation.value = ''
          }}>
        
            <div class="row">
              <div class="input-field col s12">
                <input ref={node => {
                  inputName = node;
                  if(inputName && this.props.recipe && this.props.recipe.name){
                    inputName.value = this.props.recipe.name;
                  }
                }} />
                <label for="name">Name</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <input ref={node => {
                  inputChef = node
                  if(inputChef && this.props.recipe && this.props.recipe.chef){
                    inputChef.value = this.props.recipe.chef;
                  }
                }} />
                <label for="name">Chef</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <select ref={node => {
                  selectCategory = node
                  if(selectCategory && this.props.recipe && this.props.recipe.category){
                    selectCategory.value = this.props.recipe.category;
                  }              
                }}>
                  <option value="">Choose your category</option>
                  <option value="PASTAS">PASTAS</option>
                  <option value="SALADS">SALADS</option>
                  <option value="MEAT">MEAT</option>
                  <option value="DESSERTS">DESSERTS</option>
                </select>
                <label>Categoria</label>
              </div>
            </div>        

            <div class="row">
              <div class="input-field col s12">
                <textarea className="materialize-textarea" rows="10" ref={node => {
                  inputPreparation = node
                  if(inputPreparation && this.props.recipe && this.props.recipe.preparation){
                    inputPreparation.value = this.props.recipe.preparation;
                  }              
                }}/>          
                <label for="name">Preparation</label>
              </div>
            </div>
            
            <IngredientList 
              list={this.state.recipe && this.state.recipe.ingredients} 
              onChange={this.onChangeIngredient} 
              onAdd={this.onAddIngredient} 
              onRemove={this.onRemoveIngredient}/>
          
            <button type="submit" className={classButton}>
              {textButton}
            </button>

            <button type="button" className={classButton} onClick={this.redirect}>
              Cancel
            </button>            
          </form>

        </div>
      </div>
    );
  }
}

RecipeForm.contextTypes = {
  router: PropTypes.object
};

export default RecipeForm;