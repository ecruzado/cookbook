import React, { PropTypes } from 'react';
import {IngredientList} from './ingredient/IngredientList';
import {Link, IndexLink } from 'react-router';

export const RecipeForm = ({recipe,onChange,onSubmit,classButton,textButton,
  onChangeIngredient,onAddIngredient,onRemoveIngredient}) => {
  console.log('RecipeForm render');  
  console.log(recipe);
  return(
    <form className="col s12" onSubmit={onSubmit}>
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">mode_edit</i>
          <input name="name" value={recipe && recipe.name} 
            onChange={onChange} />
          <label className="active" for="name">Name</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">account_circle</i>
          <input name="chef"  value={recipe && recipe.chef}  
            onChange={onChange} />
          <label className="active" for="chef">Chef</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">label</i>
          <select name="category" value={recipe && recipe.category}  
            onChange={onChange} >
            <option value="">Choose your category</option>
            <option value="PASTAS">PASTAS</option>
            <option value="SALADS">SALADS</option>
            <option value="MEAT">MEAT</option>
            <option value="DESSERTS">DESSERTS</option>
          </select>
          <label className="active" for="category">Categoria</label>
        </div>
      </div>        
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">list</i>
          <textarea name="preparation" className="materialize-textarea" rows="10" 
            value={recipe && recipe.preparation}  onChange={onChange} />          
          <label className="active" for="preparation">Preparation</label>
        </div>
      </div>
      <IngredientList 
        list={recipe && recipe.ingredients} 
        onChange={onChangeIngredient} 
        onAdd={onAddIngredient} 
        onRemove={onRemoveIngredient}/>
      <div className="row right-align">
        <button type="submit" className={classButton}>
          <i className="material-icons left">done</i>
          {textButton}
        </button>
        <Link to="/" className="waves-effect waves-light btn-large recipe-button">
          <i className="material-icons left">settings_backup_restore</i>
          Cancel      
        </Link>
      </div>
    </form>
  )
};