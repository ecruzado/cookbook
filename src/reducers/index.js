import {combineReducers} from 'redux';
import categoryFilter from './categoryFilterReducer';
import recipes from './recipesReducer';
import currentRecipeId from './currentRecipeIdReducer';

const rootReducer = combineReducers({
    recipes,
    categoryFilter,
    currentRecipeId
});

export default rootReducer;


// export const cookBookReducer = (state = {}, action) => {
//   return {
//     categoryFilter: categoryFilterReducer(state.categoryFilter, action),
//     recipes: recipesReducer(state.recipes, action)
//   }
// };