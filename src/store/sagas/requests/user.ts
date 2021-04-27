import axios, { AxiosResponse } from 'axios';
import { apiUserGoogleLogin, apiUserLogin, apiUserSignUp } from '../../../api/api';
import { GoogleLoginInfo, LoginInfo, SignUpInfo } from '../../../types';

export const axiosUserLogin = async (loginInfo: LoginInfo): Promise<AxiosResponse> => {
  return await axios.post(apiUserLogin(), loginInfo);
};

export const axiosUserGoogleLogin = async (googleLoginInfo: GoogleLoginInfo): Promise<AxiosResponse> => {
  return await axios.post(apiUserGoogleLogin(), googleLoginInfo);
};

export const axiosUserSignUp = async (signUpInfo: SignUpInfo): Promise<AxiosResponse> => {
  return await axios.post(apiUserSignUp(), signUpInfo);
};
