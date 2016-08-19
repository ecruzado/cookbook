import * as types from '../actions/actionTypes';


const nameFilterReducer = (state = '', action) => {
    switch(action.type){
        case types.SET_NAME_FILTER:
            return action.name;
        default:
            return state;
    }
};

export default nameFilterReducer;