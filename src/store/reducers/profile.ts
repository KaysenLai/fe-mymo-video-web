import initialState from '../initialState';
import { Action } from '../../types';
import { STORE_MY_PROFILE, STORE_PROFILE_LOADING } from '../actions/profile';

const myProfile = JSON.parse(sessionStorage.getItem('myProfile') as string);
const profileState = myProfile ? { ...initialState.profile, myProfile } : initialState.profile;

export const profileReducer = (state = profileState, action: Action) => {
  switch (action.type) {
    case STORE_MY_PROFILE:
      sessionStorage.setItem('myProfile', JSON.stringify(action.payload));
      return { ...state, myProfile: action.payload };
    case STORE_PROFILE_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
