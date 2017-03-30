import {routerReducer, routerMiddleware} from 'react-router-redux'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import filter from './reducers';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const createAppStore = (history, initialState = false) => {
    const middleware = routerMiddleware(history);
    const enhancer = composeEnhancers(applyMiddleware(middleware));
    const store = createStore(combineReducers({
        filter,
        router: routerReducer
    }), initialState, enhancer);

    return store;
}

export default createAppStore;
