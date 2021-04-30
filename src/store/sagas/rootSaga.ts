import { takeLatest } from 'redux-saga/effects';
import { REQUEST_GOOGLE_USER_LOGIN, REQUEST_USER_LOGIN, UPDATE_USER_INFO } from '../actions/userLogin';
import { handleUserLogin } from './handlers/userLogin';
import { REQUEST_USER_SIGNUP } from '../actions/userSignUp';
import { handleUserSignUp } from './handlers/userSignUp';
import { REQUEST_ID_PROFILE, REQUEST_MY_PROFILE, UPDATE_FOLLOW_USER, UPDATE_UNFOLLOW_USER } from '../actions/profile';
import { handleProfile } from './handlers/profile';

export function* watcherSaga() {
  yield takeLatest(REQUEST_USER_LOGIN, handleUserLogin);
  yield takeLatest(REQUEST_GOOGLE_USER_LOGIN, handleUserLogin);
  yield takeLatest(REQUEST_USER_SIGNUP, handleUserSignUp);

  yield takeLatest(UPDATE_USER_INFO, handleProfile);
  yield takeLatest(REQUEST_MY_PROFILE, handleProfile);
  yield takeLatest(REQUEST_ID_PROFILE, handleProfile);
  yield takeLatest(UPDATE_FOLLOW_USER, handleProfile);
  yield takeLatest(UPDATE_UNFOLLOW_USER, handleProfile);
}
