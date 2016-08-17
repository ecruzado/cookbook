import {combineReducers} from 'redux';
import categoryFilter from './categoryFilterReducer';
import recipes from './recipesReducer';

const rootReducer = combineReducers({
    recipes,
    categoryFilter
});

export default rootReducer;


// export const cookBookReducer = (state = {}, action) => {
//   return {
//     categoryFilter: categoryFilterReducer(state.categoryFilter, action),
//     recipes: recipesReducer(state.recipes, action)
//   }
// };