import * as types from '../actions/actionTypes';

export const categoryFilterReducer = (state = types.CategoryFilters.SHOW_ALL, action)=>{
    switch(action.type){
        case types.SET_CATEGORY_FILTER:
            return action.category;
        default:
            return state;
    }
};