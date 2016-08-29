import * as types from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    isSaving: false,
    recipe: {
        name:'',
        chef:'',
        category:'',
        preparation:''
    },
    error: ''
};

export const recipeReducer = (state = initialState, action) => {
    switch(action.type){
        case types.LOAD_RECIPE_REQUEST:
            return {
                ...state,
                isLoading: true,
                recipe: {
                    name:'',
                    chef:'',
                    category:'',
                    preparation:''
                }
            };
        case types.LOAD_RECIPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                recipe: action.recipe
            };
        case types.LOAD_RECIPE_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case types.UPDATE_RECIPE_REQUEST:
        case types.CREATE_RECIPE_REQUEST:
            return {
                ...state,
                isSaving: true
            };
        case types.UPDATE_RECIPE_SUCCESS:
        case types.CREATE_RECIPE_SUCCESS:
            return {
                ...state,
                isSaving: false,
                recipe: action.recipe
            };
        case types.UPDATE_RECIPE_ERROR:
        case types.CREATE_RECIPE_ERROR:
            return {
                ...state,
                isSaving: false,
                error: action.error
            };
        default:
            return state;
    }
};