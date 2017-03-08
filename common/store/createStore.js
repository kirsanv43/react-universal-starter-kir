import { createStore } from 'redux';


function createAppStore(reducers) {
    let store = createStore(reducers, window.STATE_FROM_SERVER)
}