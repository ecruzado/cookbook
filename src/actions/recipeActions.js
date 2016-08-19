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

let nextRecipeId = 50;
export const addRecipe = (recipe) => {
    Object.assign(recipe, {id: nextRecipeId++});
    return {type: types.ADD_RECIPE, recipe};
};


export const setCategoryFilter = (category) => {
    return {type: types.SET_CATEGORY_FILTER, category}
};

export const rateRecipe = (id) => {
    return {type: types.RATE_RECIPE, id}
};
