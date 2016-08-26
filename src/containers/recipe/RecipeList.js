import React, { PropTypes } from 'react';
import RecipeCard from './RecipeCard';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';
import {Modal} from '../../components/modal';


class RecipeList extends React.Component {
  
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

export default RecipeList;