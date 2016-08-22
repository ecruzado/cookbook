import React, { PropTypes } from 'react';
import IngredientList from './ingredient/IngredientList';

const RecipeForm = ({recipe, onRecipeSave}) => {
  let inputName, inputChef, inputPreparation, selectCategory;
  let list = [
    {id:1, name: 'ingredient 1', quantity: '500g'},
    {id:2, name: 'ingredient 2', quantity: '100g'},
    {id:3, name: 'ingredient 3', quantity: '200g'}
  ];

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
        
        <IngredientList list={list} onChange={ingredient=>{
          let indexIng = list.findIndex(item => item.id == ingredient.id);
          lis = list.map((item, index)=>{
            if(index === indexIng){
              return Object.assign({}, ingredient);
            }
            return item;
          });
        }}/>
      
        <button type="submit" className="waves-effect waves-light btn">
          Save Recipe
        </button>
      </form>

    </div>
    </div>
  );
};

export default RecipeForm;