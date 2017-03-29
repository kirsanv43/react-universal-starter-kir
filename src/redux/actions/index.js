import * as types from './types';

export const suceessLoad = (data) => {
  return {type: types.USER_LOAD_SUCCESS, data}
}
