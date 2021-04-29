import { Action, MyProfile } from '../../types';

export const REQUEST_MY_PROFILE = 'REQUEST_MY_PROFILE';
export const STORE_MY_PROFILE = 'STORE_MY_PROFILE';

export const requestMyProfile = (): Action => ({
  type: REQUEST_MY_PROFILE,
});

export const storeMyProfile = (myProfile: MyProfile): Action => ({
  type: STORE_MY_PROFILE,
  payload: myProfile,
});
