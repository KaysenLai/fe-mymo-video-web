import { Action } from '../../../types';
import {
  REQUEST_ID_PROFILE,
  REQUEST_MY_PROFILE,
  requestMyProfile,
  storeIdProfile,
  storeMyProfile,
  storeProfileLoading,
} from '../../actions/profile';
import { call, fork, put } from 'redux-saga/effects';
import { axiosRequestMyProfile, axiosRequestUseById } from '../../../requests/profile';
import { storeUserLoginFail, UPDATE_USER_INFO } from '../../actions/userLogin';
import { axiosUpdateUserInfo } from '../../../requests/user';

export function* handleProfile(action: Action): any {
  switch (action.type) {
    case REQUEST_MY_PROFILE: {
      try {
        const { data } = yield call(axiosRequestMyProfile);
        yield put(storeMyProfile(data));
      } catch (err) {
        console.log(err);
      }
      break;
    }
    case REQUEST_ID_PROFILE: {
      try {
        const { data } = yield call(axiosRequestUseById, action.payload);
        console.log(data);
        yield put(storeIdProfile(data));
      } catch (err) {
        console.log(err);
      }
      break;
    }
    case UPDATE_USER_INFO: {
      try {
        yield put(storeProfileLoading(true));
        yield call(axiosUpdateUserInfo, action.payload);
        yield fork(handleProfile, requestMyProfile());
        yield put(storeProfileLoading(false));
      } catch (err) {
        yield put(storeUserLoginFail(err.response.data.message));
      }
      break;
    }
    default:
      return;
  }
}
