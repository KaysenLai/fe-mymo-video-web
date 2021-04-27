import { Action } from '../../../types';
import {
  REQUEST_GOOGLE_USER_LOGIN,
  REQUEST_USER_LOGIN,
  storeUserIsOAuth,
  storeUserLoginFail,
  storeUserLoginIsLoading,
  storeUserLoginSuccess,
} from '../../actions/userLogin';
import { call, put } from 'redux-saga/effects';
import { axiosUserGoogleLogin, axiosUserLogin } from '../requests/user';

export function* handleUserLogin(action: Action): any {
  switch (action.type) {
    case REQUEST_USER_LOGIN: {
      try {
        yield put(storeUserLoginIsLoading(true));
        const { data } = yield call(axiosUserLogin, action.payload);
        yield put(storeUserLoginSuccess(data));
        sessionStorage.setItem('user', JSON.stringify(data));
      } catch (err) {
        yield put(storeUserLoginFail(err.response.data.message));
      }
      break;
    }
    case REQUEST_GOOGLE_USER_LOGIN: {
      try {
        const { data } = yield call(axiosUserGoogleLogin, action.payload.GoogleLoginInfo);
        const user = { ...data, avatar: action.payload.avatar, token: action.payload.token };
        yield put(storeUserLoginSuccess(user));
        yield put(storeUserIsOAuth(true));
        sessionStorage.setItem('user', JSON.stringify(user));
      } catch (err) {
        yield put(storeUserLoginFail(err.response.data.message));
      }
      break;
    }
    default:
      return;
  }
}
