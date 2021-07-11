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
      profileUrl: user.profileUrl,
    })
  );
};

export const instance = axios.create({
  baseURL: "https://social-monks-server.herokuapp.com",
});

export const setupAuthHeaderForServiceCalls = (token) => {
  instance.defaults.headers.common["Authorization"] = token;
};

// export const setupAuthExceptionHandler = (dispatch, logOutUser, navigate) => {
//   const UNAUTHORIZED = 401;
//   axios.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error?.response?.status === UNAUTHORIZED) {
//         toast({
//           position: "bottom-right",
//           title: `Session Expired`,
//           description: "Please login again to continue.",
//           status: "error",
//           duration: 2000,
//           isClosable: true,
//         });
//         dispatch(logOutUser());
//         navigate("signin");
//       }
//       return Promise.reject(error);
//     }
//   );
// };
