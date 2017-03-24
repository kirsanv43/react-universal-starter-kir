import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const filter = (state = '', action) => {
    switch (action.type) {
        case types.SOME_ACTION:
            return {val: Math.random()};
        default:
            return state;
    }
};
