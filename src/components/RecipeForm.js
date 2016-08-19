import React, { PropTypes } from 'react';
import Recipe from './Recipe';

const RecipeForm = ({recipe, onRecipeSave}) => {
  //console.log(recipe);
  let inputName, inputChef, inputPreparation, selectCategory;

  return (
    <div className="container">
    <div className="row">
      <h3 class="header">Recipe Container</h3>
      <form className="col s12" onSubmit={e => {
        e.preventDefault();
        if (!inputName.value.trim() 
          || !inputChef.value.trim()
          || !inputPreparation.value.trim()
          || !selectCategory.value.trim()
        ) {
          return;
        }
        onRecipeSave({
          id: recipe.id?recipe.id : 0,
          name: inputName.value, 
          chef: inputChef.value, 
          category: selectCategory.value, 
          preparation: inputPreparation.value
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
              if(inputName && recipe.name){
                inputName.value = recipe.name;
              }
            }} />
            <label for="name">Name</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input ref={node => {
              inputChef = node
              if(inputChef && recipe.chef){
                inputChef.value = recipe.chef;
              }
            }} />
            <label for="name">Chef</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <select ref={node => {
              selectCategory = node
              if(selectCategory && recipe.category){
                selectCategory.value = recipe.category;
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
              if(inputPreparation && recipe.preparation){
                inputPreparation.value = recipe.preparation;
              }              
            }}/>          
            <label for="name">Preparation</label>
          </div>
        </div>
      
        <button type="submit" className="waves-effect waves-light btn">
          Save Recipe
        </button>
      </form>
    </div>
    </div>
  );
};

export default RecipeForm;