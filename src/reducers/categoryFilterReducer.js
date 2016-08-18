import * as types from '../actions/actionTypes';

const categoryFilterReducer = (state = types.CategoryFilters.SHOW_ALL, action) => {
    //console.log("cat");
    //console.log(state);
    switch(action.type){
        case types.SET_CATEGORY_FILTER:
            return action.category;
        default:
            return state;
    }
};

export default categoryFilterReducer;