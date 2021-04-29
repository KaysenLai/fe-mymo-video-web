import { Action } from '../../../types';
import { REQUEST_MY_PROFILE, requestMyProfile, storeMyProfile, storeProfileLoading } from '../../actions/profile';
import { call, fork, put } from 'redux-saga/effects';
import { axiosRequestMyProfile } from '../../../requests/profile';
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
