import React, { PropTypes } from 'react';
import IngredientList from './ingredient/IngredientList';

class RecipeForm extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      ingredients : this.props.recipe.ingredients?this.props.recipe.ingredients:[]
    };
    this.onAddIngredient = this.onAddIngredient.bind(this);
    this.onRemoveIngredient = this.onRemoveIngredient.bind(this);
    this.onChangeIngredient = this.onChangeIngredient.bind(this);
  }

  onAddIngredient(ingredient){
    let lastId = 1;
    if(this.state.ingredients.length > 0){
      lastId = this.state.ingredients[this.state.ingredients.length - 1].id;
    }
    ingredient.id = lastId + 1;
    this.setState({
      ingredients: [...this.state.ingredients, ingredient]
    });
  }
  
  onRemoveIngredient(id){
    this.setState({
      ingredients: this.state.ingredients.filter((x,i)=> x.id!== id)
    });
  }

  onChangeIngredient(ingredient){
    let indexIng = this.state.ingredients.findIndex(item => item.id == ingredient.id);
    this.setState({
      ingredients:this.state.ingredients.map((item, index)=>{
        if(index === indexIng){
          return Object.assign({}, ingredient);
        }
        return item;
      })
    });
  }

  render(){
    let inputName, inputChef, inputPreparation, selectCategory;

    return (
      <div className="container">
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
            ingredients: this.state.ingredients
          });
          inputName.value = ''
          inputChef.value = ''
          selectCategory.value = ''
          inputPreparation.value = ''
        }}>

          <div class="row">
            <div class="input-field col s12">
              <input ref={node => {
                inputName = node;
                if(inputName && this.props.recipe.name){
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
                if(inputChef && this.props.recipe.chef){
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
                if(selectCategory && this.props.recipe.category){
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
                if(inputPreparation && this.props.recipe.preparation){
                  inputPreparation.value = this.props.recipe.preparation;
                }              
              }}/>          
              <label for="name">Preparation</label>
            </div>
          </div>
          
          <IngredientList 
            list={this.state.ingredients} 
            onChange={this.onChangeIngredient} 
            onAdd={this.onAddIngredient} 
            onRemove={this.onRemoveIngredient}/>
        
          <button type="submit" className="waves-effect waves-light btn">
            Save Recipe
          </button>
        </form>

      </div>
      </div>
    );
  }
}

export default RecipeForm;