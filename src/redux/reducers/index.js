import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

 const filter = (state = { }, action) => {
    switch (action.type) {
        case types.INCREASE:
            return { counter : state.counter + 1 };
        case types.USER_LOAD_SUCCESS: {
          return { ...state, data: action.data};
        }
        default:
            return state;
    }
};
export default filter;
