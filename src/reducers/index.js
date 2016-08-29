import {combineReducers} from 'redux';
import {categoryFilterReducer as categoryFilter} from './categoryFilterReducer';
import {recipesReducer as recipes} from './recipesReducer';
import {currentRecipeIdReducer as currentRecipeId} from './currentRecipeIdReducer';
import {nameFilterReducer as nameFilter} from './nameFilterReducer';
import {recipeReducer as recipe} from './recipeReducer';

export const rootReducer = combineReducers({
    recipes,
    categoryFilter,
    nameFilter,
    currentRecipeId,
    recipe
});