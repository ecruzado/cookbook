import * as types from './actionTypes';
import recipeApi from '../api/mockRecipeApi';
import recipeApiClient from '../apiClient/recipeApiClient';

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

export const loadRecipeSuccess = (recipe) => {
    return {type: types.LOAD_RECIPE_SUCCESS, recipe}
};


export const loadRecipes = () => {
    return function(dispatch){
        recipeApiClient.getAllRecipes().end((err, res)=>{
            dispatch(loadRecipesSuccess(res.body));
        }); 
        // return recipeApiClient.getAllRecipes().then(recipes=>{
        //     console.log(recipes);
        //     dispatch(loadRecipesSuccess(recipes));
        // }).catch(error=>{
        //     console.log('error');
        //     throw error;
        // });
    }
};

export const saveRecipe = (recipe) => {
    // return function(dispatch){
    //     return recipeApi.saveRecipe(recipe).then(savedRecipe =>{
    //         recipe.id? dispatch(updateRecipeSuccess(savedRecipe)) :
    //             dispatch(createRecipeSuccess(savedRecipe));
    //     });
    // }
    console.log('saveRecipe action: ');
    console.log(recipe);
    console.log(JSON.stringify(recipe));
    recipeApiClient.postRecipe(recipe);
    
    // return function(dispatch){
    //     recipeApiClient.postRecipe(recipe);
    //     // recipeApiClient.postRecipe(recipe).end((err, res)=>{
    //     //     console.log('postRecipe call completed');
    //     //     //dispatch(loadRecipeSuccess(res.body));
    //     // });
    // }    
};


export const loadRecipe = (id) => {
    return function(dispatch){
        if(id && id != 0){
            recipeApiClient.getRecipe(id).end((err, res)=>{
                console.log('get Recipe call completed');
                dispatch(loadRecipeSuccess(res.body));
            });         
        }else{
            let recipe = {};
            recipe.ingredients = [];
            dispatch(loadRecipeSuccess(recipe));
        }
    }
};
