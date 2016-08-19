import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import '../node_modules/materialize-css/dist/css/materialize.css';
import './styles/styles.css';
import $ from "jquery";
import Materialize from 'materialize-css';

const store = configureStore({
    categoryFilter:'SHOW_ALL',
    recipes: [
        {
            id: 1,
            name: 'lomo saltado',
            chef: 'gaston acurio',
            category: 'MEAT',
            preparation: "lomo saltado's preparation"
        },
        {
            id: 2,
            name: 'cebiche',
            chef: 'gaston acurio',
            category: 'MEAT',
            preparation: "cebiche's preparation"
        },
        {
            id: 3,
            name: 'tallarin rojo',
            chef: 'gaston acurio',
            category: 'PASTAS',
            preparation: "tallarin's preparation"
        },
        {
            id: 4,
            name: 'Dish4',
            chef: 'gaston acurio',
            category: 'PASTAS',
            preparation: "tallarin's preparation"
        },
        {
            id: 5,
            name: 'Dish5',
            chef: 'gaston acurio',
            category: 'PASTAS',
            preparation: "tallarin's preparation"
        },
        {
            id: 6,
            name: 'Dish6',
            chef: 'gaston acurio',
            category: 'PASTAS',
            preparation: "tallarin's preparation"
        },
        {
            id: 7,
            name: 'Dish7',
            chef: 'gaston acurio',
            category: 'SALADS',
            preparation: "tallarin's preparation"
        },
        {
            id: 8,
            name: 'Dish8',
            chef: 'gaston acurio',
            category: 'PASTAS',
            preparation: "tallarin's preparation"
        },
        {
            id: 9,
            name: 'Dish9',
            chef: 'gaston acurio',
            category: 'DESSERTS',
            preparation: "suspiros's preparation"
        }
    ]
});

render(
    <Provider store={store} >
        <Router history={browserHistory} routes={routes} />
    </Provider>, 
    document.getElementById('app')
);