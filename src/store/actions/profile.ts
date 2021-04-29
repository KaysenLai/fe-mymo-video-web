import { Action, MyProfile } from '../../types';

export const REQUEST_MY_PROFILE = 'REQUEST_MY_PROFILE';
export const STORE_MY_PROFILE = 'STORE_MY_PROFILE';
export const STORE_PROFILE_LOADING = 'STORE_PROFILE_LOADING';
export const REQUEST_ID_PROFILE = 'REQUEST_ID_PROFILE';
export const STORE_ID_PROFILE = 'STORE_ID_PROFILE';

export const requestMyProfile = (): Action => ({
  type: REQUEST_MY_PROFILE,
});

export const requestIdProfile = (userId: string): Action<string> => ({
  type: REQUEST_ID_PROFILE,
  payload: userId,
});

export const storeMyProfile = (myProfile: MyProfile): Action<MyProfile> => ({
  type: STORE_MY_PROFILE,
  payload: myProfile,
});

export const storeIdProfile = (idProfile: MyProfile): Action<MyProfile> => ({
  type: STORE_ID_PROFILE,
  payload: idProfile,
});

export const storeProfileLoading = (isLoading: boolean): Action<boolean> => ({
  type: STORE_PROFILE_LOADING,
  payload: isLoading,
});
