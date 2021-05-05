import { combineReducers } from 'redux';
import { userLoginReducer } from './userLogin';
import { userSignUpReducer } from './userSignUp';
import { profileReducer } from './profile';
import { starReducer } from './star';

const reducers = combineReducers({
  userLogin: userLoginReducer,
  userSignUp: userSignUpReducer,
  profile: profileReducer,
  star: starReducer,
});

export default reducers;
