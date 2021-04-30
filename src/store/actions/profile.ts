import { Action, IdProfile, MyProfile } from '../../types';

export const REQUEST_MY_PROFILE = 'REQUEST_MY_PROFILE';
export const STORE_MY_PROFILE = 'STORE_MY_PROFILE';
export const STORE_PROFILE_LOADING = 'STORE_PROFILE_LOADING';
export const REQUEST_ID_PROFILE = 'REQUEST_ID_PROFILE';
export const STORE_ID_PROFILE = 'STORE_ID_PROFILE';
export const UPDATE_FOLLOW_USER = 'UPDATE_FOLLOW_USER';
export const UPDATE_UNFOLLOW_USER = 'UPDATE_UNFOLLOW_USER';

export const requestMyProfile = (): Action => ({
  type: REQUEST_MY_PROFILE,
});

export const requestIdProfile = (userId: string): Action<string> => ({
  type: REQUEST_ID_PROFILE,
  payload: userId,
});

export const updateFollowUser = (followUserId: string): Action<string> => ({
  type: UPDATE_FOLLOW_USER,
  payload: followUserId,
});

export const updateUnfollowUser = (unFollowUserId: string): Action<string> => ({
  type: UPDATE_UNFOLLOW_USER,
  payload: unFollowUserId,
});

export const storeMyProfile = (myProfile: MyProfile): Action<MyProfile> => ({
  type: STORE_MY_PROFILE,
  payload: myProfile,
});

export const storeIdProfile = (idProfile: IdProfile): Action<IdProfile> => ({
  type: STORE_ID_PROFILE,
  payload: idProfile,
});

export const storeProfileLoading = (isLoading: boolean): Action<boolean> => ({
  type: STORE_PROFILE_LOADING,
  payload: isLoading,
});
