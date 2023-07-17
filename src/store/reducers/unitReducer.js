import * as unitActionTypes from "../actionTypes/unitActionTypes";

const initialState = {
  hasError: false,
  isLoading: false,
  error: null,
  units: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    
    case unitActionTypes.GET_UNITS_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });

    case unitActionTypes.GET_UNITS_SUCCESS:
      return Object.assign({}, state, {
        units: payload.results,
        isLoading: false,
      });
    case unitActionTypes.GET_UNITS_FAILURE:
      return Object.assign({}, state, {
        hasError: true,
        error: action.error,
        isLoading: false,
      });

    default:
      return state;
  }
};
