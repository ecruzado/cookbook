import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
 import '../static/libs/materialize/materialize.css';
// import './styles/styles.css';
import $ from "jquery";
//import '../static/libs/materialize/materialize';

const store = configureStore();

render(
    <Provider store={store} >
        <Router history={browserHistory} routes={routes} />
    </Provider>, 
    document.getElementById('app')
);