import axios, { AxiosResponse } from 'axios';
import { apiUpdateUserInfo, apiUserGoogleLogin, apiUserLogin, apiUserSignUp } from '../api/api';
import { GoogleLogin, LoginInfo, SignUpInfo } from '../types';
import { authAxios } from '../api/axios';

export const axiosUserLogin = async (loginInfo: LoginInfo): Promise<AxiosResponse> => {
  return await axios.post(apiUserLogin(), loginInfo);
};

export const axiosUserGoogleLogin = async (googleLogin: GoogleLogin): Promise<AxiosResponse> => {
  return await axios.post(apiUserGoogleLogin(), googleLogin);
};

export const axiosUserSignUp = async (signUpInfo: SignUpInfo): Promise<AxiosResponse> => {
  return await axios.post(apiUserSignUp(), signUpInfo);
};

export const axiosUpdateUserInfo = async (formData: FormData): Promise<AxiosResponse> => {
  return await authAxios.put(apiUpdateUserInfo(), formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
