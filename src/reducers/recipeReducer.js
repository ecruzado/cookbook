import * as types from '../actions/actionTypes';

const initialState = {
    loaded: false,
    isLoading: false,
    recipe: null,
    error: ''
};

export default function recipeReducer(state = {}, action){
    console.log(action);
    switch(action.type){
        case types.LOAD_RECIPE_SUCCESS:
            return action.recipe;
        default:
            return state;
    }
}