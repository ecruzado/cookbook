import React from 'react';
import { connect } from 'react-redux';
import { addRecipe } from '../actions/recipeActions';

let AddRecipe = ({ dispatch }) => {
  let inputName, inputChef, inputPreparation, selectCategory;

  return (
    <div className="container">
    <div className="row">
      <h3 class="header">Recipe</h3>
      <form className="col s12" onSubmit={e => {
        e.preventDefault();
        debugger
        if (!inputName.value.trim() 
          || !inputChef.value.trim()
          || !inputPreparation.value.trim()
          || !selectCategory.value.trim()
        ) {
          return;
        }
        dispatch(addRecipe({
          name: inputName.value, 
          chef: inputChef.value, 
          category: selectCategory.value, 
          preparation: inputPreparation.value
        }))
        inputName.value = ''
        inputChef.value = ''
        selectCategory.value = ''
        inputPreparation.value = ''
      }}>

        <div class="row">
          <div class="input-field col s12">
            <input ref={node => {
              inputName = node
            }} />
            <label for="name">Name</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input ref={node => {
              inputChef = node
            }} />
            <label for="name">Chef</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <select ref={node => {
              selectCategory = node
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
AddRecipe = connect()(AddRecipe);

export default AddRecipe;