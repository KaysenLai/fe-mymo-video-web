import initialState from '../initialState';
import { Action } from '../../types';
import { STORE_ALL_STAR } from '../actions/star';

const starState = initialState.star;

export const starReducer = (state = starState, action: Action) => {
  switch (action.type) {
    case STORE_ALL_STAR:
      return [...action.payload];
    default:
      return state;
  }
};
