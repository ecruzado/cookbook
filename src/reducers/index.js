import {combineReducers} from 'redux';
import categoryFilter from './categoryFilterReducer';
import recipes from './recipesReducer';
import currentRecipeId from './currentRecipeIdReducer';
import nameFilter from './nameFilterReducer';
import recipe from './recipeReducer';


const rootReducer = combineReducers({
    recipes,
    categoryFilter,
    nameFilter,
    currentRecipeId,
    recipe
});

export default rootReducer;


// export const cookBookReducer = (state = {}, action) => {
//   return {
//     categoryFilter: categoryFilterReducer(state.categoryFilter, action),
//     recipes: recipesReducer(state.recipes, action)
//   }
// };