import { combineReducers } from 'redux';
import { userLoginReducer } from './userLogin';
import { userSignUpReducer } from './userSignUp';
import { profileReducer } from './profile';

const reducers = combineReducers({
  userLogin: userLoginReducer,
  userSignUp: userSignUpReducer,
  profile: profileReducer,
});

export default reducers;
