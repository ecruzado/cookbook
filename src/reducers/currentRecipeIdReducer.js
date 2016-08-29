import * as types from '../actions/actionTypes';

export const currentRecipeIdReducer = (state = 0, action) =>{
    switch(action.type){
        case types.SET_CURRENT_RECIPEID:
            return action.id;
        default:
            return state;
    }
};