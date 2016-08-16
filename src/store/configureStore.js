import {createStore} from 'redux';
import rootReducer from '../reducers';

let configureStore = (initialState) => {
    return createStore(rootReducer, initialState);
};

export default configureStore;