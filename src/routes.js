import React from 'react';
import {Route, IndexRoute } from 'react-router';
import App from './components/App';
//import RecipePage from './components/recipe/RecipePage';
//import AboutPage from './components/about/AboutPage';
//import HomePage from './components/home/HomePage';
//import RecipeForm from './components/recipe/RecipeForm';
//import RecipeList from './components/recipe/RecipeList';
        // <Route path="recipe" component={RecipePage} />
        // <Route path="about" component={AboutPage} />
        // <Route path="newRecipe" component={RecipeForm} />
export default (
    <Route path="/" component={App}>
        <IndexRoute component={App} />
    </Route>
);