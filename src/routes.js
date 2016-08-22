import React from 'react';
import {Route, IndexRoute } from 'react-router';
import App from './containers/App';
import AboutPage from './containers/about/AboutPage';
import RecipesPage from './containers/recipe/RecipesPage';
import RecipePage from './containers/recipe/RecipePage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={RecipesPage} />
        <Route path="about" component={AboutPage} />
        <Route path="recipe" component={RecipePage} />
        <Route path="recipe/:id" component={RecipePage} />
    </Route>
);