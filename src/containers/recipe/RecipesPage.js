import React from 'react';
import ListFilter from './ListFilter';
import VisibleRecipeList from './VisibleRecipeList';

class RecipesPage extends React.Component{

  render(){
    return(
      <div>
        <ListFilter />
        <VisibleRecipeList />
      </div>
    );
  }

  componentDidMount(){
    $('select').material_select();
  }
}

export default RecipesPage;