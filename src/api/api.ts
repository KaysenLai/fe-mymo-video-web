import baseUrl from '../config/apis';

export const apiUserLogin = (): string => `${baseUrl}/user/login`;
export const apiUserGoogleLogin = (): string => `${baseUrl}/user/googlelogin`;
export const apiUserSignUp = (): string => `${baseUrl}/user/signup`;
