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
  recipes: PropTypes.array.isRequired,
  onRecipeClick: PropTypes.func.isRequired
};

export default RecipeList;