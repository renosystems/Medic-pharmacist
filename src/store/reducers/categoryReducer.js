import * as categoryActionTypes from "../actionTypes/categoryActionTypes";

const initialState = {
  hasError: false,
  isLoading: false,
  error: null,
  categories: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    
    case categoryActionTypes.GET_CATEGORIES_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });

    case categoryActionTypes.GET_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        categories: payload.results,
        isLoading: false,
      });
    case categoryActionTypes.GET_CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        hasError: true,
        error: action.error,
        isLoading: false,
      });

    default:
      return state;
  }
};
