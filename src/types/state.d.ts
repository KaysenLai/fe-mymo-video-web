import { UserInfo } from './common';
import { MyProfile } from './profile';

export interface State {
  userLogin: {
    isAuthenticated: boolean;
    isLoading: boolean;
    errorMessage: string;
    userInfo: UserInfo;
    isOAuth: boolean;
  };
  userSignUp: {
    isLoading: boolean;
    errorMessage: string;
  };
  profile: {
    myProfile: MyProfile;
  };
}
