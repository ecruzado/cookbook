import * as types from '../actions/actionTypes';


export default function recipeReducer(state = {}, action){
    console.log(action);
    switch(action.type){
        case types.LOAD_RECIPE_SUCCESS:
            return action.recipe;
        default:
            return state;
    }
}