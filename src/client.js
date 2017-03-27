import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {AppContainer} from 'react-hot-loader';
import { Provider } from 'react-redux';
let routes = require('./routes').default;
import renderRoutes from 'src/utils/renderRoutes'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
const rootEl = document.getElementById('root');
import createAppStore from './redux/createAppStore';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();
const appStore = createAppStore(history);



const render = (appRoutes) => {
    return ReactDOM.render(
        <AppContainer>
          <Provider store={ appStore } key="provider">
            <ConnectedRouter history={ history }   >
                 {renderRoutes(appRoutes)}


            </ConnectedRouter>
          </Provider>
        </AppContainer>, rootEl);
}
render(routes);
if (module.hot) {
  module.hot.accept("src/routes", () => {
        routes = require("src/routes").default;
        render(routes);
  });
}
    //module.hot.accept('src/routes', () => render(App));
