import { AxiosResponse } from 'axios';
import { apiFollowUser, apiGetUserById, apiMyProfile, apiUnfollowUser } from '../api/api';
import { authAxios, userIdAxios } from '../api/axios';

export const axiosRequestMyProfile = async (): Promise<AxiosResponse> => {
  return await authAxios.get(apiMyProfile());
};

export const axiosRequestUseById = async (userId: string): Promise<AxiosResponse> => {
  return await userIdAxios.get(apiGetUserById(userId));
};

export const axiosFollowUser = async (followUserId: string): Promise<AxiosResponse> => {
  return await authAxios.put(apiFollowUser(), { followUserId });
};

export const axiosUnfollowUser = async (unFollowUserId: string): Promise<AxiosResponse> => {
  return await authAxios.put(apiUnfollowUser(), { unFollowUserId });
};
