import { UserInfo } from './common';
import { MyProfile } from './profile';

export interface State {
  userLogin: {
    isAuthenticated: boolean;
    isLoading: boolean;
    errorMessage: string;
    token: string;
    isOAuth: boolean;
  };
  userSignUp: {
    isLoading: boolean;
    errorMessage: string;
  };
  profile: {
    isLoading: boolean;
    myProfile: MyProfile;
  };
}
