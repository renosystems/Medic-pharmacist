import * as companyActionTypes from "../actionTypes/companyActionTypes";

const initialState = {
  hasError: false,
  isLoading: false,
  error: null,
  companies: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    
    case companyActionTypes.GET_COMPANIES_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });

    case companyActionTypes.GET_COMPANIES_SUCCESS:
      return Object.assign({}, state, {
        companies: payload.results,
        isLoading: false,
      });
    case companyActionTypes.GET_COMPANIES_FAILURE:
      return Object.assign({}, state, {
        hasError: true,
        error: action.error,
        isLoading: false,
      });

    default:
      return state;
  }
};
