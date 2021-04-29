import { Action } from '../../../types';
import {
  REQUEST_GOOGLE_USER_LOGIN,
  REQUEST_USER_LOGIN,
  storeUserIsOAuth,
  storeUserLoginFail,
  storeUserLoginIsLoading,
  storeUserLoginSuccess,
} from '../../actions/userLogin';
import { call, put, fork } from 'redux-saga/effects';
import { axiosUserGoogleLogin, axiosUserLogin } from '../../../requests/user';
import { requestMyProfile } from '../../actions/profile';
import { handleProfile } from './profile';

export function* handleUserLogin(action: Action): any {
  switch (action.type) {
    case REQUEST_USER_LOGIN: {
      try {
        yield put(storeUserLoginIsLoading(true));
        const { data } = yield call(axiosUserLogin, action.payload);
        const { token } = data;
        yield put(storeUserLoginSuccess(token));
        yield fork(handleProfile, requestMyProfile());
      } catch (err) {
        yield put(storeUserLoginFail(err.response.data.message));
      }
      break;
    }
    case REQUEST_GOOGLE_USER_LOGIN: {
      try {
        const { data } = yield call(axiosUserGoogleLogin, action.payload);
        const { token } = data;
        yield put(storeUserLoginSuccess(token));
        yield put(storeUserIsOAuth(true));
      } catch (err) {
        yield put(storeUserLoginFail(err.response.data.message));
      }
      break;
    }

    default:
      return;
  }
}
