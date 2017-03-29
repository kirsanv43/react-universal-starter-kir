import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
console.log("types.USER_LOAD_SUCCESS:", types.USER_LOAD_SUCCESS);
 const filter = (state = { }, action) => {
  console.log(action.type);
    switch (action.type) {
        case types.INCREASE:
            return { counter : state.counter + 1 };
        case types.USER_LOAD_SUCCESS: {
            console.log(action.data);
          return { ...state, data: action.data};
        }
        default:
            return state;
    }
};
export default filter;
