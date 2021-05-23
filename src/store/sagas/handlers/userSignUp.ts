import { Action } from '../../../types';
import { call, put } from 'redux-saga/effects';
import { axiosUserSignUp } from '../../../requests/user';

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
        const { message } = data;
        console.log(message);
        yield put(storeUserSignUpSuccess(message));
      } catch (err) {
        yield put(storeUserSignUpFail(err.response.data.message));
      }
      break;
    }
    default:
      return;
  }
}
