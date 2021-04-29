import { Action } from '../../../types';
import { storeUserLoginSuccess } from '../../actions/userLogin';
import { call, fork, put } from 'redux-saga/effects';
import { axiosUserSignUp } from '../../../requests/user';
import {
  REQUEST_USER_SIGNUP,
  storeUserSignUpFail,
  storeUserSignUpIsLoading,
  storeUserSignUpSuccess,
} from '../../actions/userSignUp';
import { handleProfile } from './profile';
import { requestMyProfile } from '../../actions/profile';

export function* handleUserSignUp(action: Action): any {
  switch (action.type) {
    case REQUEST_USER_SIGNUP: {
      try {
        yield put(storeUserSignUpIsLoading(true));
        const { data } = yield call(axiosUserSignUp, action.payload);
        const { token } = data;
        yield put(storeUserLoginSuccess(token));
        yield put(storeUserSignUpSuccess());
        yield fork(handleProfile, requestMyProfile());
      } catch (err) {
        yield put(storeUserSignUpFail(err.response.data.message));
      }
      break;
    }
    default:
      return;
  }
}
