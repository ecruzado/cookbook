import * as types from './actionTypes';

let nextRecipeId = 50;
export const createRecipe = (recipe) => {
    Object.assign(recipe, {id: nextRecipeId++});
    return {type: types.CREATE_RECIPE, recipe};    
};

export const updateRecipe = (recipe) => {
    return {type: types.UPDATE_RECIPE, recipe};
};


export const setCategoryFilter = (category) => {
    return {type: types.SET_CATEGORY_FILTER, category}
};

export const rateRecipe = (id) => {
    return {type: types.RATE_RECIPE, id}
};

export const setCurrentRecipeId = (id) => {
    return {type: types.SET_CURRENT_RECIPEID, id}
};

export const setNameFilter = (name) => {
    return {type: types.SET_NAME_FILTER, name}
};