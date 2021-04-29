import { Action } from '../../../types';
import { REQUEST_MY_PROFILE, storeMyProfile } from '../../actions/profile';
import { call, put } from 'redux-saga/effects';
import { axiosRequestMyProfile } from '../../../requests/profile';

export function* handleProfile(action: Action): any {
  switch (action.type) {
    case REQUEST_MY_PROFILE: {
      try {
        const { data } = yield call(axiosRequestMyProfile);
        console.log(data);
        yield put(storeMyProfile(data));
      } catch (err) {
        console.log(err);
      }
      break;
    }
    default:
      return;
  }
}
