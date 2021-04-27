import { Action, SignUpInfo } from '../../types';

export const REQUEST_USER_SIGNUP = 'REQUEST_USER_SIGNUP';
export const STORE_USER_SIGNUP_IS_LOADING = 'STORE_USER_SIGNUP_IS_LOADING';
export const STORE_USER_SIGNUP_SUCCESS = 'STORE_USER_SIGNUP_SUCCESS';
export const STORE_USER_SIGNUP_FAIL = 'STORE_USER_SIGNUP_FAIL';

export const requestUserSignUp = (signUpInfo: SignUpInfo): Action<SignUpInfo> => ({
  type: REQUEST_USER_SIGNUP,
  payload: signUpInfo,
});

export const storeUserSignUpIsLoading = (isLoading: boolean): Action<boolean> => ({
  type: STORE_USER_SIGNUP_IS_LOADING,
  payload: isLoading,
});

export const storeUserSignUpSuccess = (): Action => ({
  type: STORE_USER_SIGNUP_SUCCESS,
});

export const storeUserSignUpFail = (errorMsg: string): Action<string> => ({
  type: STORE_USER_SIGNUP_FAIL,
  payload: errorMsg,
});
