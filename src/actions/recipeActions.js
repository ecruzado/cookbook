import * as types from './actionTypes';
import recipeApi from '../api/mockRecipeApi';
import recipeApiClient from '../apiClient/recipeApiClient';
import {RatingApiClient} from '../apiClient/ratingApiClient';
import toastr from 'toastr';

let nextRecipeId = 50;

export const createRecipe = (recipe) => ({
    type: types.CREATE_RECIPE, recipe    
});

export const updateRecipes = (recipe) => ({
    type: types.UPDATE_RECIPE, recipe
});

export const deleteRecipes = (id) => ({
    type: types.DELETE_RECIPE, id
});

export const setCategoryFilter = (category) => ({
    type: types.SET_CATEGORY_FILTER, category
});

export const rateRecipe = (id) => ({
    type: types.RATE_RECIPE, id
});

export const setCurrentRecipeId = (id) => ({
    type: types.SET_CURRENT_RECIPEID, id
});

export const setNameFilter = (name) => ({
    type: types.SET_NAME_FILTER, name
});

export const loadRecipesSuccess = (recipes) => ({
    type: types.LOAD_RECIPES_SUCCESS, recipes
});


export const loadRecipeRequest = () => ({
    type: types.LOAD_RECIPE_REQUEST
});
export const loadRecipeSuccess = (recipe) => ({
    type: types.LOAD_RECIPE_SUCCESS, recipe
});
export const loadRecipeError = (error) => ({
    type: types.LOAD_RECIPE_ERROR, error
});

export const createRecipeRequest = () => ({
    type: types.CREATE_RECIPE_REQUEST
});
export const createRecipeSuccess = (recipe) => ({
    type: types.CREATE_RECIPE_SUCCESS, recipe
});
export const createRecipeError = (error) => ({
    type: types.CREATE_RECIPE_ERROR, error
});


export const updatRecipeRequest = () => ({
    type: types.UPDATE_RECIPE_REQUEST
});
export const updateRecipeSuccess = (recipe) => ({
    type: types.UPDATE_RECIPE_SUCCESS, recipe
});
export const updateRecipeError = (error) => ({
    type: types.UPDATE_RECIPE_ERROR, error
});


export const deleteRecipeRequest = () => ({
    type: types.DELETE_RECIPE_REQUEST
});
export const deleteRecipeSuccess = (recipe) => ({
    type: types.DELETE_RECIPE_SUCCESS, recipe
});
export const deleteRecipeError = (error) => ({
    type: types.DELETE_RECIPE_ERROR, error
});


export const loadRecipes = () => {
    return function(dispatch){
        recipeApiClient.getAllRecipes().end((err, res)=>{
            dispatch(loadRecipesSuccess(res.body));
        }); 
    };
};

export const loadRecipe = (id, slug) => {
    return (dispatch) => {
        dispatch(loadRecipeRequest());
        let apiFunc = slug? recipeApiClient.getRecipeBySlug :
            recipeApiClient.getRecipe;
        let param = slug? slug:id;

        if(param){
            apiFunc(param).end((err, res)=>{
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
    return (dispatch) => {
        dispatch(createRecipeRequest());
        
        recipeApiClient.postRecipe(recipe).end((err, res)=>{
            if(!err){
                if(res.statusCode === 200
                    && res.body.message === "success"){
                    toastr.success("Saved!");
                    dispatch(createRecipeSuccess(res.body.data));
                    dispatch(createRecipe(res.body.data));
                }else{
                    toastr.error("Error: "+res.body.error);
                    dispatch(createRecipeError(res.body.error));
                }
            }else{
                if(res.body.error){
                    toastr.error(res.body.error);
                    dispatch(createRecipeError(res.body.error));
                }else{
                    toastr.error(err);
                    dispatch(createRecipeError(err));
                }
            }
        });
    };
};

export const updateRecipe = (recipe) => {
    return (dispatch) => {
        dispatch(updatRecipeRequest());
        
        recipeApiClient.putRecipe(recipe).end((err, res)=>{
            if(!err){
                if(res.statusCode === 200
                    && res.body.message === "success"){
                    toastr.success("Updated!");
                    dispatch(updateRecipeSuccess(res.body.data));
                    dispatch(updateRecipes(res.body.data));
                }else{
                    toastr.error("Error: "+res.body.error);
                    dispatch(updateRecipeError(res.body.error));
                }                
                
            }else{
                if(res.body.error){
                    toastr.error(res.body.error);
                    dispatch(createRecipeError(res.body.error));
                }else{
                    toastr.error(err);
                    dispatch(updateRecipeError(err));
                }                
            }
        });
    };
};

export const deleteRecipe = (id) => {
    return (dispatch) => {
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
    return (dispatch) => {
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
