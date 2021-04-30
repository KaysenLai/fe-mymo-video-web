import baseUrl from '../config/apis';

export const apiUserLogin = (): string => `${baseUrl}/user/login`;
export const apiUserGoogleLogin = (): string => `${baseUrl}/user/googlelogin`;
export const apiUserSignUp = (): string => `${baseUrl}/user/signup`;

export const apiMyProfile = (): string => `${baseUrl}/user/myprofile`;
export const apiUpdateUserInfo = (): string => `${baseUrl}/user`;
export const apiGetUserById = (userId: string): string => `${baseUrl}/user/${userId}`;

export const apiFollowUser = (): string => `${baseUrl}/user/follow`;
export const apiUnfollowUser = (): string => `${baseUrl}/user/unfollow`;
