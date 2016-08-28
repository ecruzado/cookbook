import React from 'react';
import ListFilter from './ListFilter';
import VisibleRecipeList from './VisibleRecipeList';

export const RecipesPage = ()=>{
  return(
    <div>
      <ListFilter />
      <VisibleRecipeList />
    </div>
  );
};