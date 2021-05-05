import { Action } from '../../types';

export const REQUEST_ALL_STAR = 'REQUEST_ALL_STAR';
export const STORE_ALL_STAR = 'STORE_ALL_STAR';
export const REQUEST_SEARCH_STAR = 'REQUEST_SEARCH_STAR';

export const requestAllStar = (): Action => ({
  type: REQUEST_ALL_STAR,
});

export const storeAllStar = (userList: any): Action => ({
  type: STORE_ALL_STAR,
  payload: userList,
});

export const requestSearchStar = (searchText: string): Action<string> => ({
  type: REQUEST_SEARCH_STAR,
  payload: searchText,
});
