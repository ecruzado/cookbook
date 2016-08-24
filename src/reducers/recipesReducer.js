import * as types from '../actions/actionTypes';

export default function recipesReducer(state = [], action){
    switch(action.type){
        case types.CREATE_RECIPE:
            return [...state,
                Object.assign({}, action.recipe)
            ];
        case types.UPDATE_RECIPE:
            return state.map((item, index)=>{
                if(item.id === action.recipe.id){
                    return Object.assign({}, action.recipe);
                }
                return item;
            }); 
        case types.CREATE_RECIPE_SUCCESS:
            return [...state,
                Object.assign({}, action.recipe)
            ];
        case types.UPDATE_RECIPE_SUCCESS:
            return state.map((item, index)=>{
                if(item.id === action.recipe.id){
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