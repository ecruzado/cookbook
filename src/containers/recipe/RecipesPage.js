import React from 'react';
import {ListFilter} from './ListFilter';
import {RecipeList} from './RecipeList';

export const RecipesPage = ()=>{
  return(
    <div>
      <ListFilter />
      <RecipeList />
    </div>
  );
};