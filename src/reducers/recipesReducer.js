import * as types from '../actions/actionTypes';

const recipesReducer = (state = [], action) => {
    switch(action.type){
        case types.CREATE_RECIPE:
            return [...state,
                Object.assign({}, action.recipe)
            ];
        case types.ADD_RECIPE:
            return [...state,
                Object.assign({}, action.recipe)
            ];
        default:
            return state;
    }
};

export default recipesReducer;