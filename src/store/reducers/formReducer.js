import * as formActionTypes from "../actionTypes/formActionTypes";

const initialState = {
  hasError: false,
  isLoading: false,
  error: null,
  units: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    
    case formActionTypes.GET_FORMS_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });

    case formActionTypes.GET_FORMS_SUCCESS:
      return Object.assign({}, state, {
        forms: payload.results,
        isLoading: false,
      });
    case formActionTypes.GET_FORMS_FAILURE:
      return Object.assign({}, state, {
        hasError: true,
        error: action.error,
        isLoading: false,
      });

    default:
      return state;
  }
};
