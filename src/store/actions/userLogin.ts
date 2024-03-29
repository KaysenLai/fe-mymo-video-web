import { Action, GoogleLogin, LoginInfo } from '../../types';

export const REQUEST_USER_LOGIN = 'USER_LOGIN_REQUEST';
export const REQUEST_GOOGLE_USER_LOGIN = 'REQUEST_GOOGLE_USER_LOGIN';
export const STORE_USER_LOGIN_IS_LOADING = 'STORE_USER_LOGIN_IS_LOADING';
export const STORE_IS_OAUTH = 'STORE_IS_OAUTH';
export const STORE_USER_LOGIN_SUCCESS = 'STORE_USER_LOGIN_SUCCESS';
export const STORE_USER_LOGIN_FAIL = 'STORE_USER_LOGIN_FAIL';
export const STORE_USER_LOGOUT = 'STORE_USER_LOGOUT';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const STORE_USER_LOGOUT_REDIRECT = 'STORE_USER_LOGOUT_REDIRECT';

export const requestUserLogin = (loginInfo: LoginInfo): Action<LoginInfo> => ({
  type: REQUEST_USER_LOGIN,
  payload: loginInfo,
});

export const requestGoogleUserLogin = (googleLogin: GoogleLogin): Action<GoogleLogin> => ({
  type: REQUEST_GOOGLE_USER_LOGIN,
  payload: googleLogin,
});

export const storeUserLoginIsLoading = (isLoading: boolean): Action<boolean> => ({
  type: STORE_USER_LOGIN_IS_LOADING,
  payload: isLoading,
});

export const storeUserIsOAuth = (isOAuth: boolean): Action<boolean> => ({
  type: STORE_IS_OAUTH,
  payload: isOAuth,
});

export const storeUserLoginSuccess = (token: string): Action<string> => ({
  type: STORE_USER_LOGIN_SUCCESS,
  payload: token,
});

export const storeUserLoginFail = (errorMsg: string): Action<string> => ({
  type: STORE_USER_LOGIN_FAIL,
  payload: errorMsg,
});

export const storeUserLogout = (): Action => ({
  type: STORE_USER_LOGOUT,
});

export const storeUserLogoutRedirect = (): Action<string> => ({
  type: STORE_USER_LOGOUT_REDIRECT,
});

export const updateUserInfo = (userInfo: FormData): Action<FormData> => ({
  type: UPDATE_USER_INFO,
  payload: userInfo,
});
