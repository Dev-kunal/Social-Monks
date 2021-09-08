import axios from "axios";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router";

export const PrivateRoute = ({ path, ...props }) => {
  const { token } = useSelector((state) => state.loggedInUserInfo);
  return token ? (
    <Route {...props} />
  ) : (
    <Navigate state={{ from: path }} replace={true} to="/login" />
  );
};

export const saveUserToLocalStorage = (user, token) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      userId: user._id,
      token: token,
      profileUrl: user.profileUrl ? user.profileUrl : "",
    })
  );
};

export const instance = axios.create({
  baseURL: "https://social-monks.herokuapp.com",
});

export const setupAuthHeaderForServiceCalls = (token) => {
  instance.defaults.headers.common["Authorization"] = token;
};

export const setupAuthExceptionHandler = (dispatch, logOutUser, navigate) => {
  const UNAUTHORIZED = 401;
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        dispatch(logOutUser());
        navigate("login");
      }
      return Promise.reject(error);
    }
  );
};
