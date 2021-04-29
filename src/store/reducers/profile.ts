import initialState from '../initialState';
import { Action } from '../../types';
import { STORE_MY_PROFILE } from '../actions/profile';

const profileState = initialState.profile;

export const profileReducer = (state = profileState, action: Action) => {
  switch (action.type) {
    case STORE_MY_PROFILE:
      return { ...state, myProfile: action.payload };
    default:
      return state;
  }
};
