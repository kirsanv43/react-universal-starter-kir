import React from 'react';
import {Switch, StaticRouter, Route} from 'react-router-dom';
import Home from 'components/Home';
import About from 'components/About';

const routes = (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </Switch>
);

export default routes;
