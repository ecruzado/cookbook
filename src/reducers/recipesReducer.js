import * as types from '../actions/actionTypes';

export default function recipesReducer(state = [], action){
    // console.log("recipesReducer: ");
    // console.log(action);
    // console.log(state);
    switch(action.type){
        case types.CREATE_RECIPE:
            return [
                Object.assign({}, action.recipe),
                ...state
            ];
        case types.UPDATE_RECIPE:
            return state.map((item, index)=>{
                if(item.id == action.recipe.id){
                    return Object.assign({}, action.recipe);
                }
                return item;
            });             
        case types.LOAD_RECIPES_SUCCESS:
            return action.recipes;                         
        default:
            return state;
    }
}