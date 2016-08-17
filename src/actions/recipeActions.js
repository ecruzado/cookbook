import * as types from './actionTypes';
// let createRecipe = (recipe) => {
//     return {type: 'CREATE_COURSE', recipe};
// };

// export default createRecipe;


export function createRecipe(recipe){
    return {type: types.CREATE_RECIPE, recipe};    
}

// export const addRecipe = (name, category, chef, preparation) => {
//     return {type: ADD_RECIPE, name, category, chef, preparation}
// };

export const addRecipe = (name, recipe) => {
    return {type: types.ADD_RECIPE, recipe}
};


export const setCategoryFilter = (category) => {
    return {type: types.SET_CATEGORY_FILTER, category}
};