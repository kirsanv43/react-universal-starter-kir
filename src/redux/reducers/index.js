import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const filter = (state = { }, action) => {
    switch (action.type) {
        case types.INCREASE:
            return { counter : state.counter + 1 };
        default:
            return state;
    }
};
