import { Action } from '../../types';
import {
  STORE_IS_OAUTH,
  STORE_USER_LOGIN_FAIL,
  STORE_USER_LOGIN_IS_LOADING,
  STORE_USER_LOGIN_SUCCESS,
  STORE_USER_LOGOUT,
} from '../actions/userLogin';
import initialState from '../initialState';
import getLocalUser from '../../utils/getLocalUser';

const userLoginState = getLocalUser() ? getLocalUser() : initialState.userLogin;

export const userLoginReducer = (state = userLoginState, action: Action) => {
  switch (action.type) {
    case STORE_USER_LOGIN_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case STORE_USER_LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, isLoading: false, userInfo: action.payload, errorMessage: '' };
    case STORE_USER_LOGIN_FAIL:
      return { ...state, isLoading: false, errorMessage: action.payload };
    case STORE_USER_LOGOUT:
      return { ...state, isAuthenticated: false, userInfo: null };
    case STORE_IS_OAUTH:
      return { ...state, isOAuth: action.payload };
    default:
      return state;
  }
};
