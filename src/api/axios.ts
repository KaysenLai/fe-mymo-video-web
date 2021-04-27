import axios from 'axios';
import baseUrl from '../config/apis';
import getLocalUser from '../utils/getLocalUser';
import { useHistory } from 'react-router-dom';

const authAxios = axios.create({ baseURL: baseUrl });

authAxios.interceptors.request.use((req) => {
  const localUser = getLocalUser();
  const history = useHistory();
  if (!localUser) {
    history.push('/signin');
    return req;
  }
  const token = localUser.userInfo.token;
  if (!token) return req;
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

const userIdAxios = axios.create({ baseURL: baseUrl });
userIdAxios.interceptors.request.use((req) => {
  const localUser = getLocalUser();
  if (!localUser) return req;
  req.headers['X-userId'] = localUser.userInfo._id;
  return req;
});

export { authAxios, userIdAxios };
