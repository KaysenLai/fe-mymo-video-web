import initialState from '../initialState';
import { Action } from '../../types';
import { STORE_USER_SIGNUP_FAIL, STORE_USER_SIGNUP_IS_LOADING, STORE_USER_SIGNUP_SUCCESS } from '../actions/userSignUp';

const userSignUpState = initialState.userSignUp;

export const userSignUpReducer = (state = userSignUpState, action: Action) => {
  switch (action.type) {
    case STORE_USER_SIGNUP_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case STORE_USER_SIGNUP_SUCCESS:
      return { isLoading: false, errorMessage: '' };
    case STORE_USER_SIGNUP_FAIL:
      return { isLoading: false, errorMessage: action.payload };
    default:
      return state;
  }
};
