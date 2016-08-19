import * as types from '../actions/actionTypes';

const currentRecipeIdReducer = (state = 0, action) => {
    //console.log("currentRecipeIdReducer");
    //console.log(state);
    switch(action.type){
        case types.SET_CURRENT_RECIPEID:
            return action.id;
        default:
            return state;
    }
};

export default currentRecipeIdReducer;