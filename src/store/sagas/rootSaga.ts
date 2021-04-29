import { takeLatest } from 'redux-saga/effects';
import { REQUEST_GOOGLE_USER_LOGIN, REQUEST_USER_LOGIN, UPDATE_USER_INFO } from '../actions/userLogin';
import { handleUserLogin } from './handlers/userLogin';
import { REQUEST_USER_SIGNUP } from '../actions/userSignUp';
import { handleUserSignUp } from './handlers/userSignUp';
import { REQUEST_MY_PROFILE } from '../actions/profile';
import { handleProfile } from './handlers/profile';

export function* watcherSaga() {
  yield takeLatest(REQUEST_USER_LOGIN, handleUserLogin);
  yield takeLatest(REQUEST_GOOGLE_USER_LOGIN, handleUserLogin);
  yield takeLatest(UPDATE_USER_INFO, handleUserLogin);
  yield takeLatest(REQUEST_USER_SIGNUP, handleUserSignUp);

  yield takeLatest(REQUEST_MY_PROFILE, handleProfile);
}
