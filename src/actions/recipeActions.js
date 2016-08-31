import * as types from './actionTypes';
import recipeApi from '../api/mockRecipeApi';
import recipeApiClient from '../apiClient/recipeApiClient';
import {RatingApiClient} from '../apiClient/ratingApiClient';
import toastr from 'toastr';

let nextRecipeId = 50;

export const createRecipe = (recipe) => {
    return {type: types.CREATE_RECIPE, recipe};    
};

export const updateRecipes = (recipe) => {
    return {type: types.UPDATE_RECIPE, recipe};
};

export const deleteRecipes = (id) => {
    return {type: types.DELETE_RECIPE, id};
};

export const setCategoryFilter = (category) => {
    return {type: types.SET_CATEGORY_FILTER, category};
};

export const rateRecipe = (id) => {
    return {type: types.RATE_RECIPE, id};
};

export const setCurrentRecipeId = (id) => {
    return {type: types.SET_CURRENT_RECIPEID, id};
};

export const setNameFilter = (name) => {
    return {type: types.SET_NAME_FILTER, name};
};

export const loadRecipesSuccess = (recipes) => {
    return {type: types.LOAD_RECIPES_SUCCESS, recipes};
};


export const loadRecipeRequest = () => {
    return {type: types.LOAD_RECIPE_REQUEST};
};
export const loadRecipeSuccess = (recipe) => {
    return {type: types.LOAD_RECIPE_SUCCESS, recipe};
};
export const loadRecipeError = (error) => {
    return {type: types.LOAD_RECIPE_ERROR, error};
};

export const createRecipeRequest = () => {
    return {type: types.CREATE_RECIPE_REQUEST};
};
export const createRecipeSuccess = (recipe) => {
    return {type: types.CREATE_RECIPE_SUCCESS, recipe};
};
export const createRecipeError = (error) => {
    return {type: types.CREATE_RECIPE_ERROR, error};
};


export const updatRecipeRequest = () => {
    return {type: types.UPDATE_RECIPE_REQUEST};
};
export const updateRecipeSuccess = (recipe) => {
    return {type: types.UPDATE_RECIPE_SUCCESS, recipe};
};
export const updateRecipeError = (error) => {
    return {type: types.UPDATE_RECIPE_ERROR, error};
};


export const deleteRecipeRequest = () => {
    return {type: types.DELETE_RECIPE_REQUEST};
};
export const deleteRecipeSuccess = (recipe) => {
    return {type: types.DELETE_RECIPE_SUCCESS, recipe};
};
export const deleteRecipeError = (error) => {
    return {type: types.DELETE_RECIPE_ERROR, error};
};


export const loadRecipes = () => {
    return function(dispatch){
        recipeApiClient.getAllRecipes().end((err, res)=>{
            dispatch(loadRecipesSuccess(res.body));
        }); 
    };
};

export const loadRecipe = (id) => {
    return function(dispatch){
        dispatch(loadRecipeRequest());
        if(id && id != 0){
            recipeApiClient.getRecipe(id).end((err, res)=>{
                if(!err){
                    dispatch(loadRecipeSuccess(res.body));
                }else{
                    toastr.error(err);
                    dispatch(loadRecipeError(err));
                }
            });         
        }else{
            let recipe = {
                name:'',
                chef:'',
                category:'',
                preparation:''
            };
            recipe.ingredients = [];
            dispatch(loadRecipeSuccess(recipe));
        }
    };
};

export const saveRecipe = (recipe) => {
    return function(dispatch){
        dispatch(createRecipeRequest());
        
        recipeApiClient.postRecipe(recipe).end((err, res)=>{
            if(!err){
                if(res.statusCode === 200
                    && res.body.message === "success"){
                    toastr.success("Saved!");
                    dispatch(createRecipeSuccess(res.body.data));
                    dispatch(createRecipe(res.body.data));
                }else{
                    toastr.error("Error: "+res.body.message);
                }
            }else{
                toastr.error(err);
                dispatch(createRecipeError(err));
            }
        });
    };
};

export const updateRecipe = (recipe) => {
    return function(dispatch){
        dispatch(updatRecipeRequest());
        
        recipeApiClient.putRecipe(recipe).end((err, res)=>{
            if(!err){
                if(res.statusCode === 200
                    && res.body.message === "success"){
                    toastr.success("Updated!");
                    dispatch(updateRecipeSuccess(res.body.data));
                    dispatch(updateRecipes(res.body.data));
                }else{
                    toastr.error("Error: "+res.body.message);
                }                
                
            }else{
                toastr.error(err);
                dispatch(updateRecipeError(err));
            }
        });
    };
};

export const deleteRecipe = (id) => {
    return function(dispatch){
        dispatch(deleteRecipeRequest());
        
        recipeApiClient.deleteRecipe(id).end((err, res)=>{
            if(!err){
                dispatch(deleteRecipeSuccess(res.body));
                dispatch(deleteRecipes(id));
                toastr.success("Deleted!");
            }else{
                toastr.error(err);
                dispatch(deleteRecipeError(err));
            }
        });
    };
};

export const saveRating = (rating) => {
    return function(dispatch){
        RatingApiClient.postRating(rating).end((err, res)=>{
            if(!err){
                if(res.statusCode === 200
                    && res.body.message === "success"){
                    toastr.success("Rated!");
                    dispatch(loadRecipe(rating.recipeid));
                }else{
                    toastr.error("Error: "+res.body.message);
                }
            }else{
                toastr.error(err);
                dispatch(loadRecipe(rating.recipeid));
            }
        });
    };
};
