import * as types from '../actions/actionTypes';


export default function nameFilterReducer(state = '', action){
    switch(action.type){
        case types.SET_NAME_FILTER:
            return action.name;
        default:
            return state;
    }
}