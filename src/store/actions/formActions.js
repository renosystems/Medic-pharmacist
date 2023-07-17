import apiClient, { api } from "../../utils/apiClient";
import * as formActionTypes from "../actionTypes/formActionTypes";
import axios from "axios";
// import AsyncStorage from '@react-native-community/async-storage';



export const getFormsFailure = (error) => ({
  type: formActionTypes.GET_FORMS_FAILURE,
  hasError: true,
  error,
});

export const getFormsLoading = () => ({
  type: formActionTypes.GET_FORMS_LOADING,
});

export const getFormsSuccess = (payload) => ({
  type: formActionTypes.GET_FORMS_SUCCESS,
  payload,
});


export function getForms() {
  return (dispatch) => {
    dispatch(getFormsLoading());
    apiClient
      .getForms()
      .then((res) => {
        dispatch(getFormsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getFormsFailure(err.response));
      });
  };
}
