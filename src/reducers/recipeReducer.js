import * as types from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    isSaving: false,
    recipe: null,
    error: ''
};

export default function recipeReducer(state = initialState, action){
    // console.log("recipeReducer: ");
    // console.log(action);
    // console.log(state);
    switch(action.type){
        case types.LOAD_RECIPE_REQUEST:
            return {
                ...state,
                isLoading: true,
                recipe: null
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
        case types.CREATE_RECIPE_REQUEST:
            return {
                ...state,
                isSaving: true
            };
        case types.CREATE_RECIPE_SUCCESS:
            return {
                ...state,
                isSaving: false
            };
        case types.CREATE_RECIPE_ERROR:
            return {
                ...state,
                isSaving: false,
                error: action.error
            };
        default:
            return state;
    }
}