import * as types from './actionTypes';
// let createRecipe = (recipe) => {
//     return {type: 'CREATE_COURSE', recipe};
// };

// export default createRecipe;


export function createRecipe(recipe){
    return {type: types.CREATE_RECIPE, recipe};    
}