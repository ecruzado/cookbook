import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import '../node_modules/materialize-css/dist/css/materialize.css';
import '../node_modules/toastr/build/toastr.min.css';
import './styles/styles.css';
import $ from "jquery";
import {loadRecipes} from  './actions/recipeActions';

const store = configureStore();
store.dispatch(loadRecipes());

render(
    <Provider store={store} >
        <Router history={browserHistory} routes={routes} />
    </Provider>, 
    document.getElementById('app')
);