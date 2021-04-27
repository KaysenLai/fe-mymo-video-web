import axios from 'axios';
import getLocalUser from '../utils/getLocalUser';
import store from '../store/store';
import { storeUserLogoutRedirect } from '../store/actions/userLogin';

const authAxios = axios.create();
authAxios.interceptors.request.use((req) => {
  const localUser = getLocalUser();
  if (!localUser) {
    store.dispatch(storeUserLogoutRedirect());
    return req;
  }
  const token = localUser.userInfo.token;
  if (!token) return req;
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

authAxios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    const status = error.response.status;
    if (status === 401 || status === 403) {
      store.dispatch(storeUserLogoutRedirect());
      return Promise.reject(error.response);
    }
  },
);

const userIdAxios = axios.create();
userIdAxios.interceptors.request.use((req) => {
  const localUser = getLocalUser();
  if (!localUser) return req;
  req.headers['x-userid'] = localUser.userInfo._id;
  return req;
});

export { authAxios, userIdAxios };
