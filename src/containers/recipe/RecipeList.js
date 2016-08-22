import React, { PropTypes } from 'react';
import RecipeCard from './RecipeCard';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';

class RecipeList extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="">
        <div className="row">
          {this.props.recipes && this.props.recipes.map(recipe =>
            <RecipeCard
              key={recipe.id}
              {...recipe}
              onClick={() => this.props.onRecipeClick(recipe.id)}
            />
          )}
          </div>
          <div className="fixed-action-btn" >
            <Link className="btn-floating btn-large red" to="recipe">
              <i className="material-icons">add</i>
            </Link>
          </div>
      </div>
    );
  }
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    chef: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    preparation: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onRecipeClick: PropTypes.func.isRequired
};

export default RecipeList;