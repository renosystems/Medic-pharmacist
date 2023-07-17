import apiClient, { api } from "../../utils/apiClient";
import * as categoryActionTypes from "../actionTypes/categoryActionTypes";
import axios from "axios";
// import AsyncStorage from '@react-native-community/async-storage';



export const getCategoriesFailure = (error) => ({
  type: categoryActionTypes.GET_CATEGORIES_FAILURE,
  hasError: true,
  error,
});

export const getCategoriesLoading = () => ({
  type: categoryActionTypes.GET_CATEGORIES_LOADING,
});

export const getCategoriesSuccess = (payload) => ({
  type: categoryActionTypes.GET_CATEGORIES_SUCCESS,
  payload,
});


export function getCategories() {
  return (dispatch) => {
    dispatch(getCategoriesLoading());
    apiClient
      .getCategories()
      .then((res) => {
        dispatch(getCategoriesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getCategoriesFailure(err.response.data));
      });
  };
}
