import React from 'react';
import { Switch, StaticRouter, Route } from 'react-router-dom';
import Home from 'components/Home';
import App from 'components/App';
import About from 'components/About';

const routes =
  [
    { path: '/',
      exact: true,
      component: Home,
      preload: Home.preload,
    },
    { path: '/about',
      component: About,
    },
  ];

export default routes;
