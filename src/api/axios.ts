import axios from "axios";
import getLocalUser from "../utils/getLocalUser";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeUserLogout } from "../store/actions/userLogin";

const authAxios = axios.create();
authAxios.interceptors.request.use((req) => {
  const localUser = getLocalUser();
  const history = useHistory();
  if (!localUser) {
    history.push("/signin");
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
    const history = useHistory();
    const dispatch = useDispatch();

    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          history.push("/login");
          break;
        case 403:
          sessionStorage.removeItem("user");
          dispatch(storeUserLogout());
          history.push("/login");
          break;
        default:
      }
      return Promise.reject(error.response);
    }
  }
);

const userIdAxios = axios.create();
userIdAxios.interceptors.request.use((req) => {
  const localUser = getLocalUser();
  if (!localUser) return req;
  req.headers["x-userid"] = localUser.userInfo._id;
  return req;
});

export { authAxios, userIdAxios };
