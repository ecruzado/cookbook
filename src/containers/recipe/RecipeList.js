import React, { PropTypes } from 'react';
import {RecipeCard} from './RecipeCard';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';
import {Modal} from '../../components/modal';
import { connect } from 'react-redux';
import {deleteRecipe} from '../../actions/recipeActions';

const getVisibleRecipes = (recipes, categoryFilter, nameFilter) => {
  switch (categoryFilter) {
    case 'SHOW_ALL':
      return recipes.filter(t => nameFilter==='' || t.name.indexOf(nameFilter) > -1);
    case 'SHOW_PASTAS':
      return recipes.filter(t => t.category === 'PASTAS' && (nameFilter==='' || t.name.indexOf(nameFilter) > -1));
    case 'SHOW_SALADS':
      return recipes.filter(t => t.category === 'SALADS' && (nameFilter==='' || t.name.indexOf(nameFilter) > -1));
    case 'SHOW_MEAT':
      return recipes.filter(t => t.category === 'MEAT' && (nameFilter==='' || t.name.indexOf(nameFilter) > -1));
    case 'SHOW_DESSERTS':
      return recipes.filter(t => t.category === 'DESSERTS' && (nameFilter==='' || t.name.indexOf(nameFilter) > -1));
  }
};


@connect(
  (state) => ({
    recipes: getVisibleRecipes(state.recipes, state.categoryFilter, state.nameFilter)
  }),
  (dispatch) => ({
    onRecipeClick: (id) => {
      dispatch(deleteRecipe(id));
    }
  })  
)
export class RecipeList extends React.Component {
  
  constructor(props, context){
    super(props, context);
    this.state = {
      deleteMessage:'',
      deleteId:0
    };
  }

  @autobind
  onDeleteRecipe(id, name){
    this.setState({
      deleteId: id,
      deleteMessage: "Are you sure you want to delete "+ name
    });
    $('#deleteModal').openModal();
  }

  @autobind
  onDeleteConfirm(){
    this.props.onRecipeClick(this.state.deleteId);
  }

  render(){
    return(
      <div className="">
        <div className="row">
          {this.props.recipes && this.props.recipes.map(recipe => 
            <RecipeCard
              key={recipe.id}
              {...recipe}
              onClick={()=>{
                this.onDeleteRecipe(recipe.id, recipe.name)}}
            />
          )}
          </div>
          <div className="fixed-action-btn" >
            <Link className="btn-floating btn-large red" to="recipe">
              <i className="material-icons">add</i>
            </Link>
          </div>
          <Modal idModal='deleteModal' 
            title="Confirm" 
            message={this.state.deleteMessage}
            onAceptClick={this.onDeleteConfirm}/>
      </div>
    );
  }
}

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  onRecipeClick: PropTypes.func.isRequired
};