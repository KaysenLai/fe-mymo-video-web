import { takeLatest } from 'redux-saga/effects';
import { REQUEST_GOOGLE_USER_LOGIN, REQUEST_USER_LOGIN, UPDATE_USER_INFO } from '../actions/userLogin';
import { handleUserAccount } from './handlers/userAccount';
import { REQUEST_USER_SIGNUP } from '../actions/userSignUp';
import { REQUEST_ID_PROFILE, REQUEST_MY_PROFILE, UPDATE_FOLLOW_USER, UPDATE_UNFOLLOW_USER } from '../actions/profile';
import { handleProfile } from './handlers/profile';
import { handleStar } from './handlers/star';
import { REQUEST_ALL_STAR, REQUEST_SEARCH_STAR } from '../actions/star';

export function* watcherSaga() {
  yield takeLatest(REQUEST_USER_LOGIN, handleUserAccount);
  yield takeLatest(REQUEST_GOOGLE_USER_LOGIN, handleUserAccount);
  yield takeLatest(REQUEST_USER_SIGNUP, handleUserAccount);

  yield takeLatest(UPDATE_USER_INFO, handleProfile);
  yield takeLatest(REQUEST_MY_PROFILE, handleProfile);
  yield takeLatest(REQUEST_ID_PROFILE, handleProfile);
  yield takeLatest(UPDATE_FOLLOW_USER, handleProfile);
  yield takeLatest(UPDATE_UNFOLLOW_USER, handleProfile);

  yield takeLatest(REQUEST_ALL_STAR, handleStar);
  yield takeLatest(REQUEST_SEARCH_STAR, handleStar);
}
