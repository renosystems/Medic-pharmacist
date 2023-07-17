import apiClient, { api } from "../../utils/apiClient";
import * as userActionTypes from "../actionTypes/userActionTypes";
import axios from "axios";
// import AsyncStorage from '@react-native-community/async-storage';

export const loginRequest = () => ({
  type: userActionTypes.LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: userActionTypes.LOGIN_SUCCESS,
  payload: { user },
});

export const loginFailure = (error) => ({
  type: userActionTypes.LOGIN_FAILURE,
  hasError: true,
  error,
});

export const getUsersFailure = (error) => ({
  type: userActionTypes.GET_USERS_FAILURE,
  hasError: true,
  error,
});

export const getUsersRequest = () => ({
  type: userActionTypes.GET_USERS_LOADING,
});

export const getUsersSuccess = (users) => ({
  type: userActionTypes.GET_USERS_SUCCESS,
  payload: { users },
});

export const addUserRequest = () => ({
  type: userActionTypes.ADD_USER_LOADING,
});

export const addUserSuccess = (user) => ({
  type: userActionTypes.ADD_USER_SUCCESS,
  payload: { user },
});

export const addUserFailure = (error) => ({
  type: userActionTypes.ADD_USER_FAILURE,
  payload: { error },
});

export const logOut = () => ({
  type: userActionTypes.LOGOUT,
});

export const logOutUser = () => {
  return (dispatch) => {
    dispatch(logOut());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
};

export function login(username, password) {
  // return false;
  return (dispatch) => {
    dispatch(loginRequest());
    apiClient
      .login(username, password)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(res.data));
        api.defaults.headers.common["Authorization"] = "Token " + token;

        axios.interceptors.request.use(
          (config) => {
            const token = res.data.token;
            if (token) {
              console.log(token);

              config.headers["Authorization"] = "Token " + token;
              console.log(token);
            }
            return config;
          },
          (error) => {
            console.log(error);
            Promise.reject(error);
          }
        );
        dispatch(loginSuccess(res.data));
        dispatch(getUsers());
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(loginFailure(err.response.data));
        }
      });
  };
}

export function getUsers() {
  return (dispatch) => {
    dispatch(getUsersRequest());
    apiClient
      .getUser()
      .then((res) => {
        dispatch(getUsersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getUsersFailure(err.response.data));
      });
  };
}

export function addUser(user) {
  return (dispatch) => {
    dispatch(addUserRequest());
    apiClient
      .addUser(user)
      .then((res) => {
        dispatch(addUserSuccess(res.data));
        dispatch(getUsers());
      })
      .catch((err) => {
        dispatch(addUserFailure(err.response.data));
      });
  };
}
