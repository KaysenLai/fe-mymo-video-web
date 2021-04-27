import { takeLatest } from 'redux-saga/effects';
import { REQUEST_GOOGLE_USER_LOGIN, REQUEST_USER_LOGIN } from '../actions/userLogin';
import { handleUserLogin } from './handlers/userLogin';
import { REQUEST_USER_SIGNUP } from '../actions/userSignUp';
import { handleUserSignUp } from './handlers/userSignUp';

export function* watcherSaga() {
  yield takeLatest(REQUEST_USER_LOGIN, handleUserLogin);
  yield takeLatest(REQUEST_GOOGLE_USER_LOGIN, handleUserLogin);
  yield takeLatest(REQUEST_USER_SIGNUP, handleUserSignUp);
}
