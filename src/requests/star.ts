import { AxiosResponse } from 'axios';
import { apiGetAllStar, apiSearchStar } from '../api/api';
import axios from 'axios';

export const axiosGetAllStar = async (): Promise<AxiosResponse> => {
  return await axios.get(apiGetAllStar());
};

export const axiosSearchStar = async (searchText: string): Promise<AxiosResponse> => {
  return await axios.get(apiSearchStar(), { params: { searchText } });
};
