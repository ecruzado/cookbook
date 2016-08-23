import * as types from '../actions/actionTypes';

export default function recipesReducer(state = [], action){
    console.log(action);
    switch(action.type){
        case types.CREATE_RECIPE:
            return [...state,
                Object.assign({}, action.recipe)
            ];
        // case types.UPDATE_RECIPE:
        //     return [
        //          ...state.filter(recipe => recipe.id !== action.recipe.id),
        //          Object.assign({}, action.recipe)
        //     ];
        case types.UPDATE_RECIPE:
            return state.map((item, index)=>{
                if(item.id === action.recipe.id){
                    return Object.assign({}, action.recipe);
                }
                return item;
            });                          
        default:
            return state;
    }
}