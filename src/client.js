import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {AppContainer} from 'react-hot-loader';
import { Provider } from 'react-redux';
import routes from './routes'; 
import { matchRoutes, renderRoutes } from 'react-router-config'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
const rootEl = document.getElementById('root');
import createAppStore from './redux/createAppStore';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();
const appStore = createAppStore(history);



const render = Component => {
    return ReactDOM.render(
        <AppContainer>
          <Provider store={ appStore } key="provider">
            <ConnectedRouter history={ history }   >
                 {renderRoutes(routes)}


            </ConnectedRouter>
          </Provider>
        </AppContainer>, rootEl);
}
render(App);
if (module.hot)
    module.hot.accept('./components/App', () => render(App));
