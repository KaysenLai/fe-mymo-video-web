import { AxiosResponse } from 'axios';
import { apiMyProfile, apiUpdateUserInfo } from '../api/api';
import { authAxios } from '../api/axios';

export const axiosRequestMyProfile = async (): Promise<AxiosResponse> => {
  return await authAxios.get(apiMyProfile());
};
