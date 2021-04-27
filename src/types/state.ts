import { UserInfo } from './common';

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
}
