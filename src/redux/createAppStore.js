import {routerReducer, routerMiddleware} from 'react-router-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import reducers from './reducers';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const createAppStore = (history) => {
    const middleware = routerMiddleware(history);
    const enhancer = composeEnhancers(applyMiddleware(routerMiddleware));
    const store = createStore(combineReducers({
        ...reducers,
        router: routerReducer
    }), enhancer)

    return store;
}

export default createAppStore;
