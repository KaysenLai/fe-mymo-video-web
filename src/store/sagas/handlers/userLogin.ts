import { Action } from '../../../types';
import {
  REQUEST_GOOGLE_USER_LOGIN,
  REQUEST_USER_LOGIN,
  storeUserInfo,
  storeUserIsOAuth,
  storeUserLoginFail,
  storeUserLoginIsLoading,
  storeUserLoginSuccess,
  UPDATE_USER_INFO,
} from '../../actions/userLogin';
import { call, put } from 'redux-saga/effects';
import { axiosUpdateUserInfo, axiosUserGoogleLogin, axiosUserLogin } from '../../../requests/user';

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
        const user = { ...data, token: action.payload.token };
        yield put(storeUserLoginSuccess(user));
        yield put(storeUserIsOAuth(true));
        sessionStorage.setItem('user', JSON.stringify(user));
      } catch (err) {
        yield put(storeUserLoginFail(err.response.data.message));
      }
      break;
    }
    case UPDATE_USER_INFO: {
      try {
        const formData = new FormData();
        formData.append('avatar', action.payload);
        const res = yield call(axiosUpdateUserInfo, formData);
        const userInfo = res.data;
        yield put(storeUserInfo(userInfo));
      } catch (err) {
        yield put(storeUserLoginFail(err.response.data.message));
      }
      break;
    }
    default:
      return;
  }
}
