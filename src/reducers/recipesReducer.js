import * as types from '../actions/actionTypes';

const recipesReducer = (state = [], action) => {
    switch(action.type){
        case types.CREATE_RECIPE:
            return [...state,
                Object.assign({}, action.recipe)
            ];
        case types.UPDATE_RECIPE:
            return [
                 ...state.filter(recipe => recipe.id !== action.recipe.id),
                 Object.assign({}, action.recipe)
            ];            
        default:
            return state;
    }
};

export default recipesReducer;