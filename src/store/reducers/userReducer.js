import * as userActionTypes from "../actionTypes/userActionTypes";

const initialState = {
  isLogged: !!localStorage.getItem("user"),
  hasError: false,
  isLoading: false,
  error: null,
  user: JSON.parse(localStorage.getItem("user")) || {},
  users: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case userActionTypes.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case userActionTypes.LOGIN_FAILURE:
      return Object.assign({}, state, {
        hasError: true,
        error: action.error,
        isLoading: false,
      });

    case userActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLogged: true,
        user: payload.user,
        isLoading: false,
        error: null,
        hasError: false,
      });
    case userActionTypes.LOGOUT:
      return Object.assign({}, state, {
        isLogged: false,
        user: null,
        isLoading: false,
      });
    case userActionTypes.GET_USERS_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });

    case userActionTypes.GET_USERS_SUCCESS:
      return Object.assign({}, state, {
        users: payload.users,
        isLoading: false,
      });
    case userActionTypes.GET_USERS_FAILURE:
      return Object.assign({}, state, {
        hasError: true,
        error: action.error,
        isLoading: false,
      });

    case userActionTypes.ADD_USER_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });

    case userActionTypes.ADD_USER_SUCCESS:
      return Object.assign({}, state, {
        users: payload.user,
        isLoading: false,
      });

    case userActionTypes.ADD_USER_FAILURE:
      return Object.assign({}, state, {
        hasError: true,
        error: payload.error,
        isLoading: false,
      });

    default:
      return state;
  }
};
