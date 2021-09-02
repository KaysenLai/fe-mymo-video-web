import { Action } from '../../../types';
import { call, fork, put } from 'redux-saga/effects';

import { REQUEST_ALL_STAR, REQUEST_SEARCH_STAR, storeAllStar } from '../../actions/star';
import { axiosGetAllStar, axiosSearchStar } from '../../../requests/star';

export function* handleStar(action: Action): any {
  switch (action.type) {
    case REQUEST_ALL_STAR: {
      try {
        const { data } = yield call(axiosGetAllStar);
        yield put(storeAllStar(data.data));
      } catch (err) {
        console.log(err);
      }
      break;
    }
    case REQUEST_SEARCH_STAR: {
      try {
        const { data } = yield call(axiosSearchStar, action.payload);
        yield put(storeAllStar(data.data));
      } catch (err) {
        console.log(err);
      }
      break;
    }
    default:
      return;
  }
}
