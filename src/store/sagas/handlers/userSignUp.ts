import { Action } from '../../../types';
import {
  REQUEST_GOOGLE_USER_LOGIN,
  REQUEST_USER_LOGIN,
  storeUserLoginFail,
  storeUserLoginIsLoading,
  storeUserLoginSuccess,
} from '../../actions/userLogin';
import { call, put } from 'redux-saga/effects';
import { axiosUserGoogleLogin, axiosUserLogin, axiosUserSignUp } from '../requests/user';
import {
  REQUEST_USER_SIGNUP,
  storeUserSignUpFail,
  storeUserSignUpIsLoading,
  storeUserSignUpSuccess,
} from '../../actions/userSignUp';

export function* handleUserSignUp(action: Action): any {
  switch (action.type) {
    case REQUEST_USER_SIGNUP: {
      try {
        yield put(storeUserSignUpIsLoading(true));
        const { data } = yield call(axiosUserSignUp, action.payload);
        yield put(storeUserLoginSuccess(data));
        yield put(storeUserSignUpSuccess());
        localStorage.setItem('user', JSON.stringify(data));
      } catch (err) {
        yield put(storeUserSignUpFail(err.response.data.message));
      }
      break;
    }
    default:
      return;
  }
}
