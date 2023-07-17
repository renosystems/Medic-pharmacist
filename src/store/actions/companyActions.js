import apiClient, { api } from "../../utils/apiClient";
import * as companiesActionTypes from "../actionTypes/companyActionTypes";
import axios from "axios";
// import AsyncStorage from '@react-native-community/async-storage';



export const getCompaniesFailure = (error) => ({
  type: companiesActionTypes.GET_COMPANIES_FAILURE,
  hasError: true,
  error,
});

export const getCompaniesLoading = () => ({
  type: companiesActionTypes.GET_COMPANIES_LOADING,
});

export const getCompaniesSuccess = (payload) => ({
  type: companiesActionTypes.GET_COMPANIES_SUCCESS,
  payload,
});


export function getCompanies() {
  return (dispatch) => {
    dispatch(getCompaniesLoading());
    apiClient
      .getCompanies()
      .then((res) => {
        dispatch(getCompaniesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getCompaniesFailure(err.response.data));
      });
  };
}
