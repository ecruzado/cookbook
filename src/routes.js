import React from 'react';
import {Route, IndexRoute } from 'react-router';
import App from './components/App';
        // <Route path="about" component={AboutPage} />
export default (
    <Route path="/" component={App}>
        <IndexRoute component={App} />
    </Route>
);