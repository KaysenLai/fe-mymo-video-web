import { AxiosResponse } from 'axios';
import { apiGetUserById, apiMyProfile } from '../api/api';
import { authAxios, userIdAxios } from '../api/axios';

export const axiosRequestMyProfile = async (): Promise<AxiosResponse> => {
  return await authAxios.get(apiMyProfile());
};

export const axiosRequestUseById = async (userId: string): Promise<AxiosResponse> => {
  return await userIdAxios.get(apiGetUserById(userId));
};
