import React from 'react';
import { connect } from 'react-redux';
import { addRecipe } from '../actions/recipeActions';

let AddRecipe = ({ dispatch }) => {
  let inputName, inputChef, inputCategory, inputPreparation;

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (!inputName.value.trim() 
          || !inputChef.value.trim()
          || !inputCategory.value.trim()
          || !inputPreparation.value.trim()
        ) {
          return;
        }
        dispatch(addRecipe({
          name: inputName.value, 
          chef: inputChef.value, 
          category: inputCategory.value, 
          preparation: inputPreparation.value
        }))
        inputName.value = ''
        inputChef.value = ''
        inputCategory.value = ''
        inputPreparation.value = ''
      }}>
        <input placeholder="name" ref={node => {
          inputName = node
        }} />
        <input placeholder="chef" ref={node => {
          inputChef = node
        }} />
        <input placeholder="category" ref={node => {
          inputCategory = node
        }} />
        <input placeholder="preparation" ref={node => {
          inputPreparation = node
        }} />
        <button type="submit">
          Add Recipe
        </button>
      </form>
    </div>
  );
};
AddRecipe = connect()(AddRecipe);

export default AddRecipe;