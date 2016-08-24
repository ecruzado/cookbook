import * as types from './actionTypes';
import recipeApi from '../api/mockRecipeApi';

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

export const loadRecipesSuccess = (recipes) => {
    return {type: types.LOAD_RECIPES_SUCCESS, recipes}
};

export const createRecipeSuccess = (recipe) => {
    return {type: types.CREATE_RECIPE_SUCCESS, recipe}
};

export const updateRecipeSuccess = (recipe) => {
    return {type: types.UPDATE_RECIPE_SUCCESS, recipe}
};

export const loadRecipes = () => {
    return function(dispatch){
        return recipeApi.getAllRecipes().then(recipes=>{
            dispatch(loadRecipesSuccess(recipes));
        }).catch(error=>{
            throw error;
        });
    }
};

export const saveRecipe = (recipe) => {
    return function(dispatch){
        return recipeApi.saveRecipe(recipe).then(savedRecipe =>{
            recipe.id? dispatch(updateRecipeSuccess(savedRecipe)) :
                dispatch(createRecipeSuccess(savedRecipe));
        });
    }
};