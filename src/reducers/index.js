import {combineReducers} from 'redux';
import categoryFilter from './categoryFilterReducer';
import recipes from './recipesReducer';
import currentRecipeId from './currentRecipeIdReducer';
import nameFilter from './nameFilterReducer';
import recipe from './recipeReducer';

export const rootReducer = combineReducers({
    recipes,
    categoryFilter,
    nameFilter,
    currentRecipeId,
    recipe
});