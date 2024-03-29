import axios from 'axios';
import getLocalLogin from '../utils/getLocalLogin';
import store from '../store/store';
import { storeUserLogoutRedirect } from '../store/actions/userLogin';

const authAxios = axios.create();
authAxios.interceptors.request.use((req) => {
  const loginState = getLocalLogin();
  if (!loginState) {
    store.dispatch(storeUserLogoutRedirect());
    return req;
  }
  const token = loginState.token;
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
  const loginState = getLocalLogin();
  if (!loginState) {
    sessionStorage.clear();
    return req;
  }
  const myProfile = JSON.parse(sessionStorage.getItem('myProfile') as string);
  if (!myProfile) return req;
  req.headers['x-userid'] = myProfile._id;
  return req;
});

export { authAxios, userIdAxios };
