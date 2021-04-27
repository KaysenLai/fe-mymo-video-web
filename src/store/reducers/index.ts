import { combineReducers } from 'redux';

import { userLoginReducer } from './userLogin';
import { userSignUpReducer } from './userSignUp';

const reducers = combineReducers({
  userLogin: userLoginReducer,
  userSignUp: userSignUpReducer,
});

export default reducers;
